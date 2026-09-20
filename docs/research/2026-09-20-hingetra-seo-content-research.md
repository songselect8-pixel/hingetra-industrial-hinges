# HINGETRA 网站现状、关键词与内容研究

后续执行见 [发布记录](../2026-09-20-content-release.md)。以下保留研究阶段快照，不能当作发布后的实时状态。用户随后已确认经营主体、永久保留和 Cindy 三项验收。

研究日期：2026-09-20。对象：`https://hingetra.com`。本轮完成公开网站检查、现有代码与文章检查、同行内容研究、GitHub技能筛选和编辑计划。没有修改线上网站、放开收录、发布文章、安装第三方技能或发送邮件。

配套文件：

- `2026-09-20-hingetra-keywords.csv`：188个候选关键词，21组，包含10个不适合当前业务的排除词；Excel可用UTF-8打开。
- `2026-09-20-hingetra-editorial-briefs.md`：六篇现有文章的修改方向、12个新选题及编辑工作流。
- 本地检查证据：`output/research/seo-2026-09-20/live-audit.json`、`stale-copy.json`、`article-inventory.json`。

## 邮件能否直接回复

可以使用企业邮箱里的“回复”。当前服务器发信使用固定通知收件人 `cindy@hingetra.com`，同时把客户表单中的邮箱放入 `reply_to`。代码位置：`server/inquiries.ts` 第24行和第154行。Resend发送的是网站生成的询盘通知；客户邮箱是回复目标。

| 界面或字段 | 当前意义 |
| --- | --- |
| HINGETRA inquiries / inquiry@forms.hingetra.com | 网站通知的显示名称和发件地址 |
| 长串地址 @rsend.forms.hingetra.com | 发信系统相关地址，不是客户联系邮箱 |
| 邮件正文 Customer → Email | 客户自己填写的联系邮箱 |
| 回复收件人 / Reply-To | 按当前程序配置为客户填写的邮箱 |

点击“回复”后看一眼收件人，确认与正文里的客户邮箱一致，再发送。回复应从你当前登录的企业邮箱发出，后续是企业邮箱与客户的普通通信。如果某个邮件客户端仍填入通知地址，手动改成正文里的客户邮箱。不要把 `inquiry@forms.hingetra.com` 或长串代发地址当成客户。

本轮核对了程序配置，没有读取原始邮件头，也没有替用户点发送。因此尚未独立验证阿里邮箱这封邮件的实际回复草稿。正式推广前可由Cindy用自己的测试询盘做一次“收到通知→回复→客户收到”的闭环。截图中的代发提示本身不足以判断SPF/DKIM/DMARC的全部结果，需要原始邮件头才能判断。

## 网站目前完成了什么

线上抓取了sitemap中的25个内容URL，全部返回HTTP 200；每页一个H1，25个独立标题和25个独立描述；抓取到的canonical与对应sitemap URL一致；页面里的JSON-LD均可解析。这是基础结构检查，不等于排名、富结果资格或完整视觉验收。

主域HTTPS可访问，HTTP和www请求最终到 `https://hingetra.com/`。网站已有10个产品详情页、6篇文章、应用、制造、质量、公司和联系等页面。询盘已接通，用户已确认测试邮箱收到通知和附件、R2保存了文件。当前收件路由已恢复Cindy。

## 还差哪些工作，按顺序做

| 顺序 | 事项 | 本轮证据 / 现状 | 完成标准 |
| --- | --- | --- | --- |
| 1 | 修正产品FAQ里的旧预览说明 | **10个线上产品详情页**仍说文件只在本地预览，不会上传或发送。与现有功能矛盾 | 修改共用FAQ及bearing单独FAQ；正式部署说明正确，非发送预览仍需诚实表述；不改变已有功能 |
| 2 | Cindy正式收件与回信闭环 | 此前真实收件测试在sales邮箱，后续路由已改回Cindy；本轮未验证实际回信 | Cindy确认通知、附件、回复目标和客户实际收信；最好覆盖Contact和共用产品RFQ，大附件另测 |
| 3 | 明确主体与询盘日常处理 | 已有展开式隐私说明、私有D1/R2及通知失败记录；保留期限、删除/备份实际操作和责任人仍需确认 | 清晰说明实际业务主体和联系方式，落实访问权限、保留与删除安排；有人检查待发送/失败记录和退信 |
| 4 | 完成基础部署检查后开放搜索 | **25/25页面仍有noindex,nofollow，robots.txt仍为Disallow: /** | 在用户确认正式开放搜索后，同时检查构建开关、robots、网页meta、站点地图及可能的主机响应头；不要只提交sitemap |
| 5 | 确认站长平台与测量 | 未发现页面GSC/Bing meta验证标记或常见网页统计脚本；这不能排除DNS验证或Cloudflare后台统计 | 登录所有者账号确认Google Search Console与Bing站长平台；提交正式sitemap；建立实际询盘与搜索落地页的基本记录 |
| 6 | 完善上线检查中的安全配置 | 本轮首页/Contact响应有nosniff和Referrer-Policy，未看到CSP、framing限制、Permissions-Policy、HSTS响应头 | 针对Pages、Turnstile和现有资源测试配置；不把未经测试的严格策略直接上线 |
| 7 | 提高内容实用性 | 6篇文章集中于目录、尺寸与RFQ；缺少充分展开的结构、拆装、维护和采购比较问题 | 先更新R01/R02，再分批新增A01–A04；其余按证据成熟度发布 |
| 8 | 补充可验证的产品与公司素材 | 缺少逐型号材料/表面、载荷依据、安装案例等可用于深入写作的材料 | 优先真实照片、标注图、销售常见问题和审核过的案例；示意图维持披露 |

无需为了上线先凑到几十篇文章。搜索就绪取决于真实功能、准确内容、可抓取配置和业务准备。新增文章可以持续做。Google解释了noindex的作用；被robots禁止抓取时，爬虫可能无法看到页面的noindex，所以开放搜索需要一起检查两层配置。[Google noindex说明](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

运维文档也有历史文字待同步：`docs/pre-launch-checklist.md`和`docs/seo-geo-operations.md`仍保留早期“尚未接通”等阶段说明。本轮以上线实测、当前服务器代码和用户已确认的收件结果为准，没有把历史待办误当成全部未完成。

测量限制：未登录Google/Bing账号，未读取完整邮件头，未对全部页面做四尺寸视觉重测，也未重跑本轮移动端性能测试。没有证据时，不把“未观察到”写成“肯定没有”。

## 现有文章需要补，而且需要先减少重复

现有六篇覆盖：基础选型、尺寸、门/拖车/坡道应用、电控柜应用、标准与定制、询价图纸。这些是有用的起点。问题在于多个篇章反复回到同一件事：对照目录、保留原数据、准备图纸和请求确认。

按源文件中的正文、标题、提示和表格说明提取，第一篇约1031个英文词，catalog出现27次；六篇合计出现105次。此统计不含动态产品表渲染值，只用来定位重复表达，不是搜索引擎评分，也不是AI检测结果。

内部来源审查本来是优点，但很多审查过程不必在买家正文反复出现。例如“只有这些家族可以带source-backed customization label”是编辑规则；买家更需要知道可询问哪些变更、应给什么图、哪些事项报价前必须核对。

建议保留网址和准确数据，重新分配文章任务。主选型文章负责引导，尺寸文章负责读图，图纸文章负责准备文件，定制文章负责解释什么差异需要评审。不要再用不同标题重复一套RFQ清单。

## 同行实际在写什么

本轮查看的是相关厂家和工业五金供应商的公开网站；这些是内容参照，不是确认其为HINGETRA直接竞品，也没有测量其流量或排名。以下“对本站的用途”为研究判断。

| 网站与公开页面 | 看到的内容组织 | 对本站有用的方向 | 不能直接照搬的部分 |
| --- | --- | --- | --- |
| [Guden：Weld-On Hinge Selection](https://www.guden.com/selection-guides/weld-on-hinges) | 把轴线、门体拆卸空间和润滑接口拆成实际设计问题 | A03/A04，可用自家结构图补足安装沟通 | 材料组合、样品政策和该站自己的服务承诺 |
| [OneMonroe：Pros and Cons](https://monroeengineering.com/blog/the-pros-and-cons-of-weld-on-hinges/) | 使用场景与安装方式优缺点 | A09，帮助客户理解为什么选焊接固定 | 对所有结构的强度或维护结论；不同产品不能泛化 |
| [PINET：Weld-on hinges and others](https://www.pinet-industrie.com/en/products/24875-weld-on-hinges-and-others) | 将头部外形、销轴、垫圈、轴承、注油嘴和材料与具体产品相连 | 产品词库、A02/A06/A12的区分方法 | 同行尺寸、304/303等材料和具体产品性能 |
| [Locinox：Gate Hinges](https://www.locinoxusa.com/gate-hardware/hinges/) | 按可调方向、安装方式与门类组织采购入口 | A05应明确究竟调节什么 | 不把自家adjustable等同于对方3-way/4D或180°功能 |
| [Kirmell：Weld-on Butt Hinges](https://www.kirmell.co.uk/what-are-weld-on-butt-hinges/) | 结构、支承、安装与卡滞等问题 | A10/A11需要的工程问题清单 | butt叶片结构与自家圆柱/水滴结构的差异；具体焊接与性能指导需核对 |
| [HDC：Weld-On Hinges FAQ](https://hdcmfg.com/blogs/a-guide-to-weld-on-hinges/) | 术语、种类和安装问答 | A01的行业用词，辨认bullet/barrel等采购表达 | 逐段改写、泛化安装步骤和营销话术 |
| [Jingmays：Weld-on Hinge Guide](https://www.jingmays.com/en-US/blogc7-what-is-a-weld-on-hinge-a-comprehensive-guide) | 入门定义、类型与应用解释 | 对照本站应用入口和术语覆盖 | 将别家产品结构、用途和性能视为本站既有能力 |

Essentra的材料比较页面也在公开搜索结果中出现，但直接打开返回403。本轮只把其搜索摘要当补充线索，没有声称完整审阅该页，也没有据此提出自家材料承诺。[该页面](https://www.essentracomponents.com/en-us/news/solutions/access-hardware/stainless-steel-vs-aluminum-hinges)

这些网站的文章不必都照着写。值得借鉴的是明确的问题、可见的结构和对采购动作有帮助的信息。HINGETRA的内容应建立在自己的10类产品和能提供的资料上。

## 关键词词库如何使用

188个词包括公开页面中的行业用语、本站目录名称及研究扩展的长尾候选；**不代表逐词已观测到用户搜索，也不是穷尽所有关键词**。有10个排除词，因此当前可继续筛选的范围是178个。CSV逐行提供意图、页面去向、证据限制和来源，搜索量及SEO难度均明确标记“未测”。

本轮没有Keyword Planner、Ahrefs或Semrush账户的分国家数据，没有伪造月搜索量、点击价或SEO难度。后续可以按实际主要市场补数据；广告工具的“竞争度”不能直接当成自然搜索排名难度。最适合继续补词的数据来自客户询盘、销售问答、指定国家的搜索结果和站点开放后的GSC查询。

| 词群 | 示例 | 主要承接方式 |
| --- | --- | --- |
| 高采购意图 | weld-on hinge manufacturer；weld on hinge supplier；custom weld on hinges | 首页、产品总览、定制页；不让信息文章与采购页争同一职责 |
| 自家产品结构 | bearing / pin / grease nipple / round / adjustable / square / flag weld on hinges | 现有产品详情页；用比较文解释选择问题 |
| 行业叫法 | weld on bullet hinges；weld on barrel hinges；leafless weld on hinges | 核对结构对应后融入产品文案和A01，不把所有词当同义词 |
| 既有应用 | control cabinet hinges；weld on gate hinges；trailer door weld on hinges | 已有应用及两篇应用指南，维持产品族的适用边界 |
| 实用技术问题 | how to measure a weld on hinge；weld on hinge alignment；removal clearance | R02、A04、A07；提供标注图和检查清单 |
| 待证实能力 | ball bearing、3-way adjustable、304/316、OEM、MOQ、lead time、load capacity | 资料齐全后决定；不能从竞争对手页面推导自家能力 |
| 排除方向 | soft-close kitchen hinges；piano hinges；uPVC调整；自闭泳池门铰链；hinge交友应用 | 当前不做内容入口。有关新业务另行核实 |

优先级表示本站适配和编辑顺序，不是流量大小。基础词与近义词可由同一页覆盖。没有搜索数据时，不能因为一个词听起来热门就建立新页面。

## GitHub上的技能与工作流

已检查原仓库README、相关SKILL.md和公开使用数据。以下均为社区项目，非Google或OpenAI官方SEO产品；热度是筛选参考，不能证明排名效果。计数为2026-09-20查看值，可能变化。

| 项目 | 具体用途 | 公开使用数据 | 本站建议 |
| --- | --- | --- | --- |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) 中的seo-audit | 检查抓取、收录、页面结构和内容质量 | 仓库50,940星；技能约210.4K安装 | 推荐按需采用。现有自动检查继续保留，不重建整套网站 |
| 同仓库content-strategy | 分买家阶段、整理内容簇、比较新增和更新价值 | 同仓库；约142.5K安装 | 推荐做选题与关键词到页面的映射，商业模式换成工业询盘 |
| 同仓库copy-editing | 检查清晰度、证据、具体性和语气 | 同仓库；约127.9K安装 | 取其证据和语言检查；工业技术文不照搬情绪强化、虚假稀缺或转化承诺 |
| [blader/humanizer](https://github.com/blader/humanizer) | 去掉机械转折、空泛强调、模板节奏，改后校对事实 | 仓库50,327星；技能约7.2K安装 | 推荐作为后置语言编辑，不代替产品事实审查 |
| [TheCraigHewitt/seomachine](https://github.com/TheCraigHewitt/seomachine) | 研究、写作、更新、内链、数据分析等完整工作流 | 仓库7,453星；未取得可比技能安装计数 | 借鉴研究简报与复盘结构；暂不整套部署 |

安装量来源分别为[seo-audit](https://skills.sh/coreyhaines31/marketingskills/seo-audit)、[content-strategy](https://skills.sh/coreyhaines31/marketingskills/content-strategy)、[copy-editing](https://skills.sh/coreyhaines31/marketingskills/copy-editing)、[Humanizer](https://skills.sh/blader/humanizer/humanizer)。原始仓库星数通过GitHub仓库API读取；目录展示有缓存差异。

原文件已查看：[seo-audit规则](https://github.com/coreyhaines31/marketingskills/blob/main/skills/seo-audit/SKILL.md)、[content-strategy规则](https://github.com/coreyhaines31/marketingskills/blob/main/skills/content-strategy/SKILL.md)、[copy-editing规则](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copy-editing/SKILL.md)、[Humanizer规则](https://github.com/blader/humanizer/blob/main/SKILL.md)。

SEO Machine偏Claude Code工作区，包含数据工具和WordPress发布步骤；其默认长文写作流程写明2000–3000+词，并关注关键词密度。本站是Next静态页面加Cloudflare Functions，不用WordPress；不适合为了套工作流而迁移。按固定词数填充也无必要。[SEO Machine工作流原文](https://github.com/TheCraigHewitt/seomachine#workflows)

Humanizer当前规则强调保存事实，检查改写是否增加或删掉信息。这正好适合做最后一遍编辑，但不能让“更自然”成为编造客户故事、第一人称经验和数据的理由。[Humanizer说明](https://github.com/blader/humanizer)

只作备选、尚未执行的安装命令：

```powershell
npx skills add coreyhaines31/marketingskills --skill seo-audit --agent codex -g
npx skills add coreyhaines31/marketingskills --skill content-strategy --agent codex -g
npx skills add coreyhaines31/marketingskills --skill copy-editing --agent codex -g
npx skills add blader/humanizer --skill humanizer --agent codex -g
```

不需要先买软件或安装庞大框架才能做这份内容计划。建议工作流是：产品事实卡 → 关键词与意图 → 同行缺口 → 英文简报 → 有依据的初稿 → 技术复核 → 语言编辑 → SEO/页面检查 → 发布后数据复盘。

## 怎样做到文章自然、有用

每篇针对一个具体买家，回答一个真实问题。用已有型号、自己的图纸和结构照片解释，尽快给答案；删掉没有新增信息的开场、反复总结和夸张形容。保留真正影响选型的条件，去掉内部审查过程对读者造成的负担。

Google没有要求一个固定文章字数，重点是有帮助、可靠、面向读者的内容；大量低价值页面即使经过人工改写，也可能属于规模化内容滥用。因此本计划不把“AI检测分数”和文章数量当成质量目标。[有用内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)、[规模化内容滥用政策](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)

最有价值的下一批素材是：各族产品拆分近照、已确认的材料和表面处理、可公开安装案例、销售最常被问的十个问题，以及公司实际能承诺的报价条件。有这些资料，文章自然会比拼接同行介绍更具体，也更容易帮客户提出有效询盘。

## 建议执行顺序

1. 处理旧FAQ和正式收件/回信核对，落实必要上线事项，准备好后单独确认搜索开放。
2. 先做R01选型和R02尺寸两篇改稿，保留网址；把编辑口吻改成实际采购问题。
3. 两批制作A01/A02、A03/A04。事实和图准备好一篇，审核一篇，不承诺每天自动发。
4. A05–A12根据资料、客户问题和实际搜索数据排序。没有材料/载荷/安装依据的主题，先补依据。

完整的每篇主词、目标问题、内链、所需图片和发布条件见配套编辑简报。
