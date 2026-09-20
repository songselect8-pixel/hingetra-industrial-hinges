# HINGETRA 2026-09-20 内容与上线整理

授权：用户要求全部开始执行 SEO / 内容研究计划。用户另确认法定经营主体为 **铰拓五金有限公司**，询盘和客户图纸永久保留，面向全球英语采购客户，以及 Cindy 收件、附件、直接回复三项正常。

## 本次交付

- 六篇原文章已改写：保留原网址、2026-09-02 发布日期，真实更新日期为 2026-09-20；用具体采购检查、尺寸对照和图纸清单替换重复审核措辞。
- 新增四篇指南：Bullet / Barrel 名称、Bearing / Pin / Washer 对照、Grease Fitting 接近空间、Alignment / Removal Clearance。
- 八篇英文初稿和资料缺口在 [草稿目录](content-drafts/README.md)，未加入公开注册表。
- 188 个候选关键词 / 21 组在 [关键词 CSV](research/2026-09-20-hingetra-keywords.csv)，市场已按用户确认统一为全球英语采购客户；没有伪造搜索量、难度或排名。
- 四个 GitHub 编辑/SEO 技能已安装并读取使用；[工作流](content-editorial-workflow.md) 和 `.agents/product-marketing.md` 记录用法、事实与禁止推断项。
- 修正十个产品详情里的旧上传 FAQ；Resources 列表显示真实更新日期，新文优先排列，去除内部发布说明。
- Organization 增加用户确认的法律名称，表单隐私文字明确主体、不自动过期保留、服务商和邮件副本、访问/更正/删除联系渠道。
- Cloudflare 静态响应头加入 CSP、framing、nosniff、Referrer/Permissions Policy，主域短期 HSTS；pages.dev 别名带 noindex。GitHub Pages 仍为单独预览。
- 已锁定的布局、CSS、产品数据、图纸及源目录没有重新设计或重写。

## 本地验证

- 97 项自动测试通过；TypeScript 通过。
- 开启搜索的静态生产构建通过，32 个 HTML 无坏链接/资源/开发地址；SEO 检查通过：29 内容页、10 文章、1,053 锚点链接。
- 四宽度浏览器检查：1440、1024、768、390px，Resources 列表、全部十篇文章、两个共享/独立 FAQ 产品页，共 52 组合；状态 200、单 H1、无页面横向溢出、缺失本页锚点或已加载坏图片。
- 证据：`output/playwright/seo-review.json` 和 `seo-*.png`。这些是本地忽略的 QA 输出，不是新增公开页面。
- 本地浏览器限制：Next 16.3.3 在 Windows 导出部分 RSC 预加载文件时保留了 OS 路径分隔符，临时 review server 针对该路径映射；已独立确认 Linux 构建的生产同一请求为 200，没有修改网站框架来绕过本地问题。本地诊断使用的公开密钥及主机名配置不是正式验证码验收；生产收件、附件和回复仍以用户的实际验收为依据。
- 临时服务修正 Windows 预加载路径后，桌面/手机目录点击、技术表格滚动及资源加载复查通过，无本地请求错误或页面异常；手机表格在容器内滚动，页面本身不溢出。收尾时全部 153 个锁文件条目已复核，纠正一条早已过期的目录数据哈希，目录数据本身没有修改。
- 没有发送测试邮件；邮件、附件和回复结果来自用户的真实验收。API 保存回执依然不等同邮箱送达。

## 部署与账号事项

内容提交 `b4f89cb` 已推送 main；GitHub build/deploy 与 Cloudflare Pages 均成功。线上 29 内容页均为 200、标题和描述独立、canonical/H1 正确；四篇新文、修正后的十个产品 FAQ、主体与保留文字、安全响应头均已发布。生产与部署 pages.dev 别名均有响应头 noindex。证据：`output/playwright/live-content-release.json`。

用户随后确认已将 Cloudflare Production 的 `SEARCH_INDEXING_ENABLED` 改为 `true` 并重新部署。提交 `6bb2071` 的 GitHub 与 Cloudflare 部署成功后，线上重新核验：29 个内容页均为 `index, follow`，`robots.txt` 为 `Allow: /` 并声明正式地图，所有 pages.dev 别名仍为响应头 noindex。抓取入口已开放；这不表示搜索引擎已收录或获得排名。

收尾提交 `a96cba3` 的 GitHub build/deploy 与 Cloudflare Pages 均成功；CI 97 项测试通过，独立 GitHub 预览仍禁止索引。本地生产构建、TypeScript、32 HTML 静态检查及 29 页 SEO 检查再次通过。首页与 Contact 的线上 Google 标记和用户提供的值完全一致，生产返回 index/follow，部署别名保持响应头 noindex。

线上浏览器回归：Cloudflare Web Analytics 脚本返回 200，Turnstile API 返回 200 且挑战 frame 已加载；首页和 Contact 无捕获到的 CSP 拦截或本站控制台错误。主动切页产生的四条 ERR_ABORTED 预加载请求单独记录，未把挑战资源加载称为验证码通过，也未发送真实邮件。证据：`output/playwright/live-verification-qa.txt`。

Google：用户于 2026-09-20 确认所有权验证成功，网站地图提交成功。使用其最终提供的 HTML 标记作为生产域名默认 metadata 验证值，保留环境覆盖；没有发布先前提供的 HTML 验证文件。Bing：用户同日确认从 Google Search Console 导入成功，网站地图也已存在。两项账号状态来自用户的实际操作确认；公开页面检测本身不能证明后台账号状态。

本机 Wrangler 未登录，用户浏览器标签连接不可用，账号操作由用户完成。用户随后提供 R2 的 `Default Multipart Abort Rule`：7 天后中止上传，已启用。该规则只清理未完成的分段上传，没有对已完成对象执行到期删除；保持该规则即可，与应用不自动过期保存询盘/图纸的决定一致。此项依据用户提供的规则内容，未声称已通过认证 API 审查整个云账户。

具体操作见 [上线清单](pre-launch-checklist.md)。正式地图为 `https://hingetra.com/sitemap.xml`。代码和文件保留策略不代表已建立自动备份或故障告警，日常检查查询见 [询盘存储说明](inquiry-storage-setup.md)。

## 资料依据

产品技术参数来自仓库已审核的原始目录和结构化数据。新文的通用术语/安装讨论参考 [Guden bullet hinge listing](https://www.guden.com/catsearch/123/weld-on-bullet-hinges/1)、[Guden selection guide](https://www.guden.com/selection-guides/weld-on-hinges)、[Guden removable guide](https://www.guden.com/selection-guides/removable-hinges)、[PINET weld-on range](https://www.pinet-industrie.com/en/products/24875-weld-on-hinges-and-others)。正文已就具体引用设置链接，未移植同行的材料、库存、承重、定制范围或交期。

响应头参考 [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/)、[Turnstile CSP](https://developers.cloudflare.com/turnstile/reference/content-security-policy/) 与 [Cloudflare Web Analytics CSP](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/)。线上浏览器发现 Cloudflare 已注入访问统计脚本，因此 CSP 允许其脚本和采集端点；没有新增 GA 或其他分析工具。静态 CSP 保留 Next 必需的 inline 许可，不作“彻底防止 XSS”的声明。
