# 首批 FAQ 与三个产品页内容更新

授权：用户在看过下一步建议后要求“直接开始吧”。本轮落实首批 12 题及 Bearing、Pin、Grease Nipple 产品页完善，面向全球英语采购客户。

## 内容与实现

在八篇现有文章的相关小节内补入短问短答，保留原网址与目录锚点，用 H3 让问句进入现有文章目录。不增加独立 FAQ 页面，也不将同一组问答复制到所有产品页。文章仍为 10 篇，待补证的八篇草稿继续留在公开注册表之外。

| 研究编号 | 文章 | 问题与定位锚点 |
| --- | --- | --- |
| Q02 | bullet-barrel-weld-on-hinge-names | 名称是否相同 · `bullet-barrel-same-hinge` |
| Q03 | weld-on-hinge-sizes | 如何测量 · `measure-weld-on-hinge` |
| Q05 | how-to-choose-weld-on-hinges | 承重与自重 · `weld-on-hinge-load-capacity` |
| Q09 | bearing-pin-washer-weld-on-hinges | 结构区别 · `bearing-pin-washer-difference` |
| Q10 | bearing-pin-washer-weld-on-hinges | 垫圈是否防水 · `gasket-hinge-waterproof` |
| Q13 | weld-on-hinge-alignment-and-removal-clearance | 焊后能否拆门 · `remove-door-after-welding` |
| Q14 | weld-on-hinge-alignment-and-removal-clearance | 拆卸空间 · `lift-off-removal-space` |
| Q18 | grease-fitting-weld-on-hinges | 油嘴用途 · `grease-nipple-purpose` |
| Q20 | grease-fitting-weld-on-hinges | 工具空间 · `grease-fitting-tool-clearance` |
| Q23 | weld-on-hinge-sizes | 替换旧件 · `replace-existing-hinge` |
| Q25 | prepare-hinge-drawing-dimension-request | 询价资料 · `hinge-quotation-details` |
| Q26 | standard-vs-custom-weld-on-hinges | 定制变更 · `custom-hinge-changes` |

三个产品页均沿用已锁定模板，更新简介、选型说明、元描述和各自的五个问答。Bearing 说明 18 条规格、原参考图适用范围和自重；Pin 说明五条规格、配合尺寸与拆卸路径；Grease Nipple 说明六条完整复合尺寸与油嘴工具接入。尺寸、重量、应用映射及七族定制范围未变。

原文已覆盖的部分改为直接问答，避免在文末重复一遍。尺寸文章保留原图，拆卸文章复用已核实的 Pin Type 实物照片；无图纸的产品页不再被文章描述为拥有完整图纸。使用现有 H2/H3、表格和图片组件，没有新增组件、依赖或 CSS。

## 依据与边界

- [FAQ 研究](research/2026-09-20-weld-on-hinge-faq-research.md) 记录 32 题及原厂公开资料。本次 12 题是编辑筛选，不是声称已有客户提出的次数或搜索量排名。
- [供应商资料复核](research/2026-09-20-supplier-catalog-and-store-review.md) 确认 PDF 与原目录完全一致。具体值沿用 `catalog-variants.ts`，没有采用国际站标题中的承重、材料或角度宣传。
- Bearing 示例 `ф16*100mm / 142 g`、Pin 三个 `Φ20*…mm` 例子及 Grease Nipple `Φ14x16x100mm` 均逐项核对原数据。型号 12-A 与 D=11.80 的单位仍不推断。
- “自有工厂、铰链不是主营产品”已记录在事实卡。此次不改写其他工厂介绍页面，不推断每个铰链型号的生产分工。
- 编辑检查采用已有 copy-editing / humanizer 规则：直接回答、给出测量和询价动作、保留必要限制；不补虚构经历、客户案例或资历。
- 原内容测试禁止出现任何 `load rating` 字样，会误拦“自重不是承重”的说明；调整为拦截无依据的数值载荷表述，其余事实边界检查保留。没有为文案建立新的测试框架。

## 验证与发布

- 97 项自动测试通过，类型检查及开启搜索的静态生产构建通过。
- 静态检查覆盖 32 个 HTML，无坏链接、缺失资源或开发地址；SEO 检查覆盖 29 个内容页、10 篇文章和 1,105 个锚点链接。
- 八篇文章与三个产品页在 1440、1024、768、390px 下共 44 组浏览器检查全部通过：200、单 H1、正确 canonical/index、无页面横向溢出、缺失答案、坏图片或本地失败资源。
- 逐一点击 12 题的目录入口，等待 URL 更新与平滑滚动完成后验证目标；三个产品页各五个问答全部可展开。手机表格容器宽 358px、内容宽 760px，可滚动 402px，页面本身不溢出。
- 人工检查桌面 Bearing 问答、手机 Grease Nipple 问答及拆卸文章截图。未修改任何模板或 CSS。证据：`output/playwright/faq-product-review.json`、`faq-*.png`。
- 153 个锁定文件记录已核验，本次仅刷新获授权内容文件的哈希；所有记录匹配。既有尺寸与图纸完整性测试通过。
- 本次未发真实询盘或测试邮件，收件与附件功能沿用此前用户已验收的流程。后台账号与保留规则未改。

发布目标为现有 main → Cloudflare Pages 正式域名，提交后核验线上内容及部署结果。
