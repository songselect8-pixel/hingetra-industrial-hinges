# HINGETRA 询盘接收与存储配置

2026-09-20 正式收件路由：用户确认新版邮件满意后，要求将询盘通知收件人从临时测试邮箱 `sales@hingetra.com` 恢复为 **`cindy@hingetra.com`**。服务器固定收件人与网站公开联系邮箱现均为 Cindy，不允许访客指定收件人。

用户于 2026-09-19 同意接通真实询盘邮件，并提出保存询盘数据。2026-09-20，用户确认 Contact 测试通知已在 `sales@hingetra.com` 收到，上传图片也已保存在私有 R2；随后要求邮件直接附上客户文件、R2 继续保留一份，并精简邮件正文。新版上线后用户确认满意，并要求恢复 Cindy 收件与简化页面结果提示。后续用户批准 SEO 发布，并确认 Cindy 收件、附件、直接回复均正常；正式搜索开关按 `docs/pre-launch-checklist.md` 在 Production 开启，预览继续关闭。

## 第一版如何工作

网站表单 → Cloudflare Pages Function `/api/inquiries` → 服务器校验和 Turnstile → 私有 R2 附件 → D1 询盘记录 → Resend 通知 `cindy@hingetra.com`。

- 首页、产品及其他共用 RFQ 与 Contact 表单都接入，保留原布局、产品选择与校验。两个公开构建变量缺一时，仍显示未发送状态。
- 这里只保存网站表单收到的询盘。直接发送到邮箱的邮件、WhatsApp 聊天不会自动同步；如需统一客户管理，应另行设计邮件/聊天授权及 CRM 接入。
- 只有附件和记录已保存且回执有效，浏览器才显示绿色对勾与 `Sent successfully`；失败显示红色叉号与 `Send failed`。按用户要求不再显示编号、长说明或重复的发送错误段落。编号仍保留在 API 回执、数据库和通知邮件中。邮件通知异步发送；页面成功表示提交已被服务器接收，`accepted` 仅表示 Resend 接受，不等于进收件箱。
- 通知失败不删除记录或图纸；状态是 `failed`。发送中断的记录可能停在 `pending`。第一版没有定时自动重发或完整 CRM，负责人必须每天检查未通知记录，按保存的客户邮箱手动跟进。以后可加认证管理页和重试任务。
- 按用户 2026-09-20 的选择，邮件直接附上已验证、已存入 R2 的原文件；私有 R2 同时保留一份。通过 Resend 的 Base64 附件字段发送，不生成公开文件链接。请不要把桶设为公共，也不要开启 `r2.dev` 或为桶绑定公开域名。
- 邮件按客户信息、需求、产品资料和附件整理，仅列出有内容的字段，产品使用目录名称。省略内部字段、数据库说明和长存储路径；保留询盘编号和直接回复客户的功能。表单隐私说明同步披露邮件中的文件副本，删除请求须覆盖邮箱附件。
- 网站 API 只接受生产域名下的同源 POST，固定收件人，要求真实 Turnstile 验证；不接受访客指定收件人。文本及文件均在服务器再次校验。
- 每个文件最多 10 MiB，请求总量最多 21 MiB；原支持的 CAD/图片格式保持不变。格式签名检查不等于杀毒；不要直接运行/信任客户文件。
- 防滥用初始上限：每 IP 每小时 10 次、每邮箱每小时 5 次、全站每天 50 次有效新提交。重复同一请求编号不会重复保存/通知。限额为保护存储及通知额度而设，不代表服务商计划额度。

## 1. 建立 D1 数据库

1. 在 Cloudflare 账户级菜单进入 **存储和数据库（Storage & databases）→ D1**。
2. 创建专用数据库 `hingetra-inquiries`。不要选择另一网站的数据库。
3. 打开数据库的 Console，运行仓库文件 `migrations/0001_inquiries.sql` 中的 SQL。它创建询盘表、状态字段、索引和短期滥用计数表。
4. 在 **Workers 和 Pages → hingetra-industrial-hinges → 设置 → 绑定（Bindings）** 添加 D1 绑定：变量名 **`INQUIRY_DB`**，数据库选择刚创建的 `hingetra-inquiries`。

首次保存字段包括：客户姓名、公司、邮箱、国家、产品、来源路径、全部需求字段、附件清单、提交时间、跟进状态和通知状态。来源只记录页面路径，不记录地址栏查询参数或原始 IP。

## 2. 创建私有 R2 附件桶

1. 进入 **存储和数据库 → R2**。开通 R2 需要经过订阅/结算流程；先确认账户展示的条款和支付要求，不要为了本项目升级其他计划。
2. 如接受其按量计费规则，创建 Standard 桶 `hingetra-inquiry-files`，保持 **Public access disabled**。
3. 在同一 Pages 项目的 Production 绑定里添加 R2：变量名 **`INQUIRY_FILES`**，选择该桶。
4. 如果不愿开通 R2，保持接收关闭，先用企业邮箱接收需求；不要把图纸存在 GitHub/public，也不要在接口里忽略上传文件。

## 3. 配置防垃圾提交

1. 在 Cloudflare Turnstile 新建 widget，允许 `hingetra.com` 和 `www.hingetra.com`，模式 Managed。
2. Site key 是公开值，作为 Pages **Production 构建环境变量** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`。
3. Secret key 只作为 Pages **Production 加密 Secret** `TURNSTILE_SECRET_KEY`，不得带 `NEXT_PUBLIC_`，不得放 GitHub 或聊天。
4. 在本机密码管理器生成至少 32 个随机字符，作为加密 Secret **`RFQ_RATE_LIMIT_SECRET`**。它用于不可逆处理短期滥用计数标识。

## 4. 配置邮件通知，保留阿里邮箱

1. 注册 Resend 免费账户，添加发信子域 **`forms.hingetra.com`**。
2. 在 Cloudflare DNS 中逐条添加 Resend 页面提供的验证记录，主机名和值必须以该账户显示的为准。
3. **保留根域 `hingetra.com` 的阿里云三条 MX 和 SPF。** 不开 Resend inbound 接收，不用 Cloudflare Email Routing 替换它们，不在同一主机名新增第二条 SPF。
4. 验证通过后，使用 `inquiry@forms.hingetra.com` 发系统通知；不用另买这个邮箱。你继续使用阿里邮箱 `cindy@hingetra.com` 收信/回复。
5. 创建仅有发信权限、限定该域的 Resend key，保存到 Pages Production 加密 Secret **`RESEND_API_KEY`**。
6. 添加服务器变量 **`RFQ_FROM_EMAIL=inquiry@forms.hingetra.com`**。收件人在服务端固定为 Cindy，访客邮箱只作为 Reply-To。

## 5. 激活前最后配置

| Pages Production 变量/绑定 | 内容 |
| --- | --- |
| `INQUIRY_DB` | D1 绑定，非普通文本变量 |
| `INQUIRY_FILES` | R2 绑定，非普通文本变量 |
| `TURNSTILE_SECRET_KEY` | 加密 Secret |
| `RFQ_RATE_LIMIT_SECRET` | 随机值，加密 Secret，至少 32 字符 |
| `RESEND_API_KEY` | 加密 Secret |
| `RFQ_FROM_EMAIL` | `inquiry@forms.hingetra.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile 公开 Site key |
| `NEXT_PUBLIC_RFQ_ENDPOINT` | `/api/inquiries` |
| `RFQ_ENABLED` | 配置与隐私检查完成后设置 `true` |

保留已有 `STATIC_EXPORT=true`、`SITE_URL=https://hingetra.com`；`SEARCH_INDEXING_ENABLED` 按上线清单仅在已准备好的 Production 设置为 `true`，预览为 `false`。静态导出仍为 `out`；Functions 位于仓库根目录 `functions/`，由 Pages Git 集成编译。不要把 Functions 拷进 public，不要添加 Next.js 动态 API 路由。

改完绑定/变量需重新部署；公开变量在构建时写入 JS。只给 Production 配置，不把真实数据库、文件桶及发信密钥提供给不受信任的分支预览。GitHub Pages 继续作为不发送的静态预览。

**生产验收：** 用户已确认 Cindy 收件、附件和直接回复均正常。两种表单及恢复/大文件专项的实际远端结果未分别记录，不把现有模拟测试视为这部分验收。测试接近 10 MiB 的允许文件；免费 Functions 的 CPU 限制可能影响大文件，若超限，先评估限制/实现调整，不能未经授权升级付费计划。API 回执、单元测试或部署绿勾都不替代实际收件。测试记录和附件按用户的永久保留决定保留；若需清理，先明确记录范围并取得删除授权。

## 查询、跟进、导出及恢复

在 D1 Console 查看最新记录：

```sql
SELECT id, created_at, name, company, email, country, product,
       follow_up_status, notification_status
FROM inquiries ORDER BY created_at DESC LIMIT 100;
```

每天检查通知未被接受的询盘，联系客户：

```sql
SELECT id, created_at, email, fields_json, attachments_json, notification_error
FROM inquiries WHERE notification_status IN ('pending', 'failed')
ORDER BY created_at DESC LIMIT 100;
```

跟进状态默认 `new`，可改 `contacted`、`quoted`、`closed`。更新时必须用精确询盘 ID；不要全表修改。完整需求在 `fields_json`，附件位置在 `attachments_json`。记录跟进不代表通知已发，不应手动把失败通知伪装成 `accepted`。

D1 可通过已登录的 Wrangler 导出 SQL 备份：`npx wrangler d1 export hingetra-inquiries --remote --output=tmp/inquiries-backup.sql`。SQL 是数据库备份，不是 Excel。需要 Excel 时再导出选定字段为 CSV，并处理公式注入；不要把真实客户数据提交 GitHub。D1 备份不包含 R2 文件，二者应分别备份。

数据库写入超时可能已完成提交，因此接口不会贸然删除图纸。未关联附件可能残留：按请求编号、`attachments_json` 和创建时间人工核对后再清理；不要给所有附件加一个会误删正在跟进图纸的短期生命周期规则。

## 隐私与运维边界

- 表单展开说明披露 Cloudflare、Resend、阿里邮箱、用途和删除请求渠道；不将此文案当作法律合规认证。经营主体为用户确认的铰拓五金有限公司；记录和图纸不自动过期，展开说明已同步主体、用途、处理方、邮件副本和删除渠道。
- 第一版不承诺自动过期删除。用户已于 2026-09-20 确认询盘和客户图纸永久保留，因此不设置自动过期规则；删除请求应覆盖 D1、R2、邮箱通知和适用的备份策略。不要仅删数据库后留下附件。
- 同日用户提供桶内启用的 `Default Multipart Abort Rule`，操作为“7 天后中止上传”。这是清理未完成分段上传的默认规则，不会在七天后删除已上传成功的文件，可保留。该判断基于用户提供的规则文本，未通过认证 API 审查账户其他设置。[Cloudflare 对象生命周期说明](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)
- 云账户开启 MFA，限制可读客户数据的成员权限。此版不公开查询/下载端点，没有无密码管理页。
- 通知状态为 accepted 的邮件仍可能退信/进垃圾箱：检查 Resend 控制台及实际收件箱。
- 运行日志仅保留故障分类及随机询盘编号，不输出正文、原始 IP、文件或 API 密钥。

## 官方资料（2026-09-19 核对）

- [D1 免费额度](https://developers.cloudflare.com/d1/platform/pricing/)：总存储 5 GB、每天 500 万行读取/10 万行写入，另受每库限制约束；额度不是承诺无限保存。
- [R2 费用](https://developers.cloudflare.com/r2/pricing/)：Standard 免费 10 GB-month/月、100 万次 A 类/1000 万次 B 类操作；超额按量收费，不是免费的硬上限。[开通流程](https://developers.cloudflare.com/r2/get-started/)
- [Pages 绑定](https://developers.cloudflare.com/pages/functions/bindings/)、[Function 路由](https://developers.cloudflare.com/pages/functions/routing/)：仅询盘接口走 Functions，页面仍静态托管。
- [Resend 额度](https://resend.com/pricing)：免费每月 3000 封、每天 100 封。[子域隔离](https://resend.com/docs/dashboard/domains/introduction)
- [Turnstile 服务端验证](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)：必须验证 token、hostname、action，过期/重复 token 需更新。

## 本地验证记录

- 2026-09-19：91 项测试通过，其中 12 项覆盖接收流程、存储/通知故障、并发幂等、两种表单、附件检查、限流、源站/挑战校验及禁止假成功。
- 使用临时 SQLite 数据库和模拟邮件/验证服务；未发送真实邮件，未创建远端数据库或桶。
- 已分别构建未配置状态及使用虚拟公开配置的启用状态；TypeScript、28 个静态 HTML 的资源/链接检查及 25 个内容页面的 SEO 检查通过，仍为 noindex。
- Wrangler 4.135.0 成功生成 Pages Functions Worker；145 项已有锁文件哈希一致。未增加依赖，未做用户已免除的截图巡检。
- 2026-09-20：用户已确认 Contact 通知实际收件、PNG 的 R2 保存，并在新版随信附件及精简通知上线后确认满意。随后用户确认恢复 Cindy 后的收件、附件和直接回复均正常；产品表单与大文件等专项远端验收仍需分别记录。
- 2026-09-20 新版通知：96 项自动测试通过，覆盖空项省略、两种表单、中文文件名、双附件及两份 10 MiB 文件的原字节一致性；TypeScript、静态构建、28 页链接检查、SEO 检查及 Pages Functions 编译通过。测试使用模拟发信服务，没有替代实际随信附件收件验收。
- 2026-09-20 收尾调整：通知收件人恢复 Cindy，成功/失败提示简化为图标加一行文字。96 项测试、TypeScript、静态构建、链接/SEO 检查和 Functions 编译通过；用本地模拟回执检查 Contact 与共用 RFQ 的成功、失败、保留输入及 1440/1024/768/390px 显示，未发送真实邮件。
