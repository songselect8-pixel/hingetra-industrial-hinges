# HINGETRA 独立站 SEO / AI 搜索运营手册

研究与代码审查日期：2026-09-18。适用对象：工业铰链 B2B 询盘网站。区分已经落地的修改、待上线事项和运营建议，不承诺排名、收录或 AI 引用。

## 优先级

目前最主要的限制不是页面数量或视觉设计，而是**正式域名尚未连接、网站仍处于 noindex 预览状态、RFQ 尚未真正投递**。这些条件完成前，不投放获客广告、不提交预览站给搜索引擎、不统计虚假的成功询盘。已批准的设计、六篇文章、产品尺寸和图片来源保持不变。

| 优先级 | 工作 | 完成标准 / 当前状态 |
| --- | --- | --- |
| P0 | 确认域名、品牌与法律主体 | HINGETRA 为已确认品牌；hingetra.com 仍是拟用域名；原始目录主体不因换品牌自动改变 |
| P0 | 真实 RFQ 接收与文件处理 | 仍未实施，遵守暂不连接邮件服务的要求；上线前必须真实收件、测试失败处理及附件 |
| P0 | 隐私与安全接收 | 收集个人信息、工程图前确认用途、保留期限、访问权限及服务端校验，不把客户图纸发给统计工具 |
| P1 | 可发现性与 URL 一致性 | 已补齐 25 个已发布内容路由的 sitemap，统一 canonical / JSON-LD / RSS 的尾斜杠和部署前缀 |
| P1 | 搜索与品牌配置 | 已增加默认关闭的收录开关、站长平台验证配置、共享品牌实体；未连接外部账号 |
| P1 | 询盘路径 | 已修正 Resources 的联系页表单锚点，自动检查跨页片段链接 |
| P2 | 有依据的内容与真实证据 | 上线后根据实际查询、买家问题和合格询盘改进，不批量生成薄内容 |

## 本轮实际修改

- Sitemap 从 Resources 的 7 个 URL 扩展为全部 25 个内容 URL。产品取自已发布注册表，文章仍使用原有 draft/noindex 过滤，不维护另一套规格。
- HTML canonical、面包屑、文章实体、RSS、sitemap 使用一致的部署前缀和尾斜杠；图片、XML 文件不添加尾斜杠。
- 所有页面输出一致的 Organization / WebSite 标识，About 和 Contact 连接同一品牌实体。没有添加未经确认的法律名称、地址、认证、社交账号或个人资历。
- 六篇文章的 BlogPosting 补充自身 URL、稳定 ID、语言和所属网站，publisher 指向同一品牌。正文与技术值不变。
- Products 使用真实产品数据生成 CollectionPage / ItemList；没有为了零售富结果伪造价格、库存或评分。
- Contact 补齐真实产品分享图；Resources 的 RFQ 链接改为存在的 `contact-rfq` 位置。
- 首页主图明确高加载优先级，产品卡片可访问名称包含可见文字；图片、排版、颜色和尺寸不变。
- 发布流程增加 `verify:seo`，检查唯一标题/描述、一个 H1、canonical / OG / JSON-LD、图片 ALT、sitemap/RSS 覆盖、收录策略和片段链接。
- GitHub Pages 的 `SITE_URL` 改读真实配置的 `base_url`，为未来连接已确认域名保留正确配置来源。

## SEO 与 GEO 的研究结论

Google 说明，AI Overviews / AI Mode 仍依赖基础 SEO，页面需要满足收录和摘要展示条件，没有额外的 AI 专用文件或特殊 schema 要求。清晰可见的内容、可靠依据、内部链接和正确结构化数据是共同基础；合规也不保证展示。本轮优先修复真实缺口，不添加隐藏关键词或所谓 AI 排名代码。[Google 官方指南](https://developers.google.com/search/docs/appearance/ai-features)

ChatGPT 的 OAI-SearchBot 面向搜索发现，GPTBot 面向训练，控制独立。上线时可以分别决定搜索可见性和训练抓取政策，不能把允许训练说成获得搜索推荐的必要条件。本轮没有擅自开放预览站。[OpenAI 爬虫说明](https://developers.openai.com/api/docs/bots)

Perplexity 也区分搜索爬虫和用户触发访问。上线后检查抓取是否被主机或防火墙误拦；不能只凭 User-Agent 字符串信任访问者身份。[Perplexity 官方说明](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

Bing Webmaster Tools 的 AI Performance 可观察引用次数、被引用页面和部分关联查询，不等于排名或权威性评分。先取得站点验证及实际数据，不能凭模拟问题的一次结果宣称 GEO 成功。[Bing 官方说明](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

`llms.txt` 是一种提案，本轮不把它当成收录保证或优先工作。现有 HTML、表格、结构化发布数据和 RSS 已可机器读取。[提案原文](https://llmstxt.org/)

## GitHub 上适合本站的工具

| 项目 | 用途 | 本站决定 |
| --- | --- | --- |
| [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) | 性能、可访问性、基础 SEO 实验室诊断 | 已运行移动端基线；不添加运行时依赖 |
| [GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) | 持续发布中的性能比较 | 稳定测量环境建立后再考虑，不为分数添加整套服务 |
| [lycheeverse/lychee](https://github.com/lycheeverse/lychee) | HTML / Markdown 批量链接检查 | 当前复用静态检查并补齐片段检查，外链增多后再考虑 |
| [actions/configure-pages](https://github.com/actions/configure-pages) | 从 Pages 设置取得地址和前缀 | 已使用 `base_url`，避免接域名后 canonical 留在旧地址 |

没有安装批量发文章、买外链或宣称保证 AI 推荐的项目；没有新增生产依赖。

## 关键词与页面职责

下面是与业务对应的**意图规划**，不是搜索量、竞争度或排名调查结果。上线后按 Search Console 实际查询调整。一个主要意图优先由一个页面承接，避免复制近似页面。

| 买家意图 / 英文词组 | 主承接页面 | 内容作用 |
| --- | --- | --- |
| industrial weld-on hinge manufacturer | `/` | 说明品牌、范围、真实依据和询盘入口 |
| weld-on hinge types / industrial hinge catalog | `/products/` | 类型、结构及真实尺寸筛选 |
| bearing / pin / grease nipple / round weld-on hinges | 对应 `/products/[slug]/` | 原始规格、真实产品图和图纸 |
| adjustable / square / flag hinges | 对应产品详情 | 保持目录命名和结构差异，不泛化用途 |
| hinges for gates / trailer doors / cabinets | `/applications/` 和对应指南 | 说明相关产品族，不保证承载或最佳适配 |
| custom weld-on hinge manufacturer | `/custom-hinges/` | 收集图纸、规格、数量、安装要求，不虚构打样承诺 |
| weld-on hinge diameter and length | `/resources/weld-on-hinge-sizes/` | 解释尺寸阅读，不补推缺失单位 |
| hinge drawing / dimension request for quotation | `/resources/prepare-hinge-drawing-dimension-request/` | 帮买家准备可审核的信息 |
| HINGETRA company / manufacturing / quality | `/about-us/`、`/manufacturing/`、`/quality/` | 一致、可核实的企业与能力信息 |

保留六篇批准文章。未来先找真实买家问题和资料，再决定是否新增。不建立只有城市、国家或近义词不同的几十个页面。没有实际多语言内容时，不添加虚假 hreflang。

## AI 搜索内容与信任

让一段内容准确回答一个采购问题，并能找到依据：问题明确、回答简洁、边界清楚、产品链接可用。技术表格继续读取既有结构化数据，不在文章中手抄第二份参数。

最值得后续核实补充的是：实际工厂外景、真实加工与测量视频、产品结构特写、经许可公开的应用案例、明确的法律主体和品牌关系。AI 场景继续标为示意，不能当成实际员工、设备或客户证据。未验证的载荷、材料牌号、寿命、容差、认证和交期保持不显示。

可用以下固定英文问题人工观察 AI 回答：

1. What information is needed to request a custom weld-on hinge quotation?
2. How do I read diameter and length in a weld-on hinge catalog?
3. What should I confirm before selecting hinges for a trailer door?
4. Which published HINGETRA hinge families support customization?
5. Where can I find the original drawing for a bearing weld-on hinge?

记录日期、平台、地区/语言、完整问题、品牌提及、正确 URL 引用及参数错误。不要把个性化回答的波动当成稳定排名，也不要把这些例子当成真实搜索量。本轮未创建自动监控或付费 API。

## 测量与询盘运营

上线后先验证 Search Console 和 Bing Webmaster Tools，配置已预留但账号尚未绑定。统计实施需与隐私方案一起确认，本轮没有植入 GA、录屏、Cookie 或第三方跟踪脚本。

| 指标 | 口径 |
| --- | --- |
| 搜索可见性 | 实际收录；品牌/非品牌展示、点击、CTR；按国家、设备、落地页分析 |
| 选型行为 | 产品访问、规格/图纸查看、开始 RFQ；只算意向，不算询盘送达 |
| 真实转化 | 服务端确认接收且投递的 RFQ，去重并排除测试与垃圾信息 |
| 询盘质量 | 公司与联系方式可用、需求可识别、尺寸或图纸及数量足以沟通；资格标准由销售确认 |
| 商业结果 | 合格 RFQ → 报价 → 成交，记录不能报价或流失原因 |
| AI 可见性 | 可用平台引用报告、可识别的 AI 来源访问、最终合格 RFQ，三者分别统计 |

建议事件名：`view_product`、`view_drawing`、`rfq_start`、`rfq_validation_error`、`rfq_delivered`。最后一项仅在真实投递后触发，当前 “Request checked, not sent.” 不得算成功。事件不包含姓名、邮箱、消息正文或图纸。外部推广使用一致 UTM，站内链接不加 UTM 干扰来源归因。

## 性能基线与限制

2026-09-18 14:09 UTC，Lighthouse 13.4.1 对当时在线首页进行一次移动端模拟测试（412 × 823、模拟节流）：Performance 97、Accessibility 100、Best Practices 100、SEO 66；LCP 2.4 秒、FCP 1.5 秒、TBT 50 毫秒、CLS 0。SEO 阻断项是预览 noindex，这不是搜索排名。

报告提示主图优先级、产品卡片可访问名称及部分缓存/图片机会。本轮修正前两项，保留响应式 WebP。GitHub Pages 缓存不通过无效的 Next 服务端配置修改，应在最终主机配置时确认。

这不是 CrUX 或真实用户 Core Web Vitals；TBT 不是 INP，不证明所有国家和设备同样快。CLI 生成 JSON 后清理 Windows 临时浏览器目录时返回 EPERM；报告无 runtimeError，但整条 CLI 命令不是零错误完成。本轮没有截图或四宽度视觉复审。

本地报告：`output/seo/lighthouse-home-mobile.json`；导出基线：`output/seo/baseline.json`。临时诊断不入仓库。

## 正式上线操作

1. 确认域名所有权、HTTPS、最终主机和法律主体。设置 `SITE_URL` 不代表域名已启用。
2. 取得后端接入授权后，完成所有 RFQ 入口的实际投递、附件、失败处理及隐私/安全工作；未完成不得获客上线。
3. 保持品牌、联系人、公开邮箱、结构化实体一致，不补写未核实资料。
4. 完成 `docs/pre-launch-checklist.md` 后，才设 `SEARCH_INDEXING_ENABLED=true` 并重新构建。GitHub Actions 读取同名仓库变量，未设置时为 false。
5. 若使用 meta 验证，将本人站长账号提供的公开值放到 `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`，不要填 API 密钥。
6. 最终地址复核 25 个内容页、sitemap、canonical、JSON-LD、根目录 robots 和真实 RFQ，再向站长平台提交正式地图。
7. 迁移时规划旧地址到对应新路径的永久重定向；改 canonical 或 GitHub 仓库名并不会自动重定向旧网站。

**robots 位置：**当前 Pages 位于 `/hingetra-industrial-hinges/`，子目录 robots.txt 不是主机根规则。每页 noindex 是当前重要控制，但不等于保密。域名上线须检查 `https://最终域名/robots.txt`；不能长期阻止抓取又期待爬虫读到新 noindex。私密资料须用访问控制。[Google robots 指南](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)

## 上线后 30 / 60 / 90 天

| 阶段 | 行动 | 交付与依据 |
| --- | --- | --- |
| 前 30 天 | 完成域名与接收链路，验证站长平台、提交正式地图、建立来源和询盘基线 | 收录状态、投递测试、真实询盘台账；不承诺排名或数量 |
| 31–60 天 | 结合真实查询和买家问法改进重点页，补真实照片/视频/授权案例 | 每项内容有来源，比较同期表现，不盲目扩页 |
| 61–90 天 | 比较产品族、查询和地区的合格 RFQ 与报价质量，调整内容及渠道 | 看对成交的帮助，不只看访问量；做有价值的行业合作，不买垃圾外链 |

这是运营建议，不是自动化计划、交期或增长承诺。以后继续复用设计和产品数据，运行测试、构建、静态及 SEO 检查；新内容先保持草稿。
