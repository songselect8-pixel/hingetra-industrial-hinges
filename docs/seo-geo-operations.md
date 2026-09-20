# HINGETRA 独立站 SEO / AI 搜索运营手册

更新：2026-09-20。对象为全球英语采购客户，不限定国家。下面区分已确认事实、代码完成项和仍需账号操作的事项。

## 当前状态

| 项目 | 状态 |
| --- | --- |
| 主域 | https://hingetra.com，www/HTTP 统一到 HTTPS 主域 |
| 品牌与主体 | HINGETRA；经营主体为用户确认的铰拓五金有限公司 |
| 询盘与回复 | 已接通 D1、私有 R2、Turnstile、Resend；用户确认 Cindy 收件、附件和直接回复正常 |
| 保留政策 | 询盘与图纸不自动过期；保留访问、更正、删除请求渠道 |
| 正式内容 | 六篇旧文改写、四篇新指南，共 29 内容页 / 10 篇文章；另外八篇留作未发布草稿 |
| 关键词 | 188 候选词 / 21 组，搜索量和难度未测，不能称为全部可能词 |
| 编辑技能 | seo-audit、content-strategy、copy-editing、humanizer 已安装并读取使用 |
| 收录开关 | 用户已授权；本地 index 构建验证通过，Cloudflare 实际 Production 变量仍需账号访问 |
| 站长平台 | 账号所有权验证和 sitemap 提交尚未核实；不能从缺少 meta 标记推断没有 DNS 验证 |

执行详情见 [本次发布记录](2026-09-20-content-release.md)、[上线清单](pre-launch-checklist.md)、[文章工作流](content-editorial-workflow.md) 和 [研究报告](research/2026-09-20-hingetra-seo-content-research.md)。原始参数与已锁定页面设计继续保留。

## 已完成的基础 SEO

页面使用统一的正式域名 canonical、Open Graph、Organization / WebSite、BlogPosting、BreadcrumbList、RSS 和 sitemap。产品列表从真实注册表生成，没有伪造价格、库存和评分。发布检查覆盖标题/描述唯一性、H1、图片 ALT、实体标识、路径前缀、草稿排除和跨页锚点。

Cloudflare 静态响应头已加入版本管理；正式域名可开启搜索，pages.dev 别名保留响应头 noindex，GitHub Pages 保留构建级 noindex。当前实际部署与账号状态以发布记录为准。

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

现有十篇正式文章分别承接已核实的采购问题。八篇后续草稿先补资料，再决定是否发布。不建立只有城市、国家或近义词不同的几十个页面。没有实际多语言内容时，不添加虚假 hreflang。

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

建议事件名：`view_product`、`view_drawing`、`rfq_start`、`rfq_validation_error`、`rfq_delivered`。最后一项仅在真实投递证据成立后触发；API 保存回执与邮件接受状态不是收件箱到达证明。事件不包含姓名、邮箱、消息正文或图纸。外部推广使用一致 UTM，站内链接不加 UTM 干扰来源归因。

## 性能基线与限制

2026-09-18 14:09 UTC，Lighthouse 13.4.1 对当时在线首页进行一次移动端模拟测试（412 × 823、模拟节流）：Performance 97、Accessibility 100、Best Practices 100、SEO 66；LCP 2.4 秒、FCP 1.5 秒、TBT 50 毫秒、CLS 0。SEO 阻断项是预览 noindex，这不是搜索排名。

报告提示主图优先级、产品卡片可访问名称及部分缓存/图片机会。本轮修正前两项，保留响应式 WebP。GitHub Pages 缓存不通过无效的 Next 服务端配置修改，应在最终主机配置时确认。

这不是 CrUX 或真实用户 Core Web Vitals；TBT 不是 INP，不证明所有国家和设备同样快。CLI 生成 JSON 后清理 Windows 临时浏览器目录时返回 EPERM；报告无 runtimeError，但整条 CLI 命令不是零错误完成。该次性能基线没有截图或四宽度视觉复审；2026-09-20 内容发布另有四宽度浏览器检查记录。

本地报告：`output/seo/lighthouse-home-mobile.json`；导出基线：`output/seo/baseline.json`。临时诊断不入仓库。

## 正式上线操作

按 [上线清单](pre-launch-checklist.md) 将 **Cloudflare Production** 的 `SEARCH_INDEXING_ENABLED` 设为 `true` 并重新部署。不要改变 GitHub Pages 的同名变量；它是另外一个静态预览。随后检查正式主域 robots、29 个内容页、sitemap、canonical 和响应头。

在所有者 Google Search Console / Bing Webmaster Tools 账号完成验证，提交 `https://hingetra.com/sitemap.xml`。若采用 meta 验证，使用账号提供的公开值配置 `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`，不要使用 API 密钥。

根路径 robots 必须实测；不能长期禁止抓取又期待爬虫读到页面 noindex。预览 noindex 不提供保密能力，客户图纸继续使用私有存储。[Google robots 指南](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)

## 上线后 30 / 60 / 90 天

| 阶段 | 行动 | 交付与依据 |
| --- | --- | --- |
| 前 30 天 | 核实搜索开放，验证站长平台、提交正式地图、建立来源和询盘基线 | 收录状态、投递测试、真实询盘台账；不承诺排名或数量 |
| 31–60 天 | 结合真实查询和买家问法改进重点页，补真实照片/视频/授权案例 | 每项内容有来源，比较同期表现，不盲目扩页 |
| 61–90 天 | 比较产品族、查询和地区的合格 RFQ 与报价质量，调整内容及渠道 | 看对成交的帮助，不只看访问量；做有价值的行业合作，不买垃圾外链 |

这是运营建议，不是自动化计划、交期或增长承诺。以后继续复用设计和产品数据，运行测试、构建、静态及 SEO 检查；新内容先保持草稿。
