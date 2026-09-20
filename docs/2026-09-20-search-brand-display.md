# Google 搜索结果品牌显示检查

用户截图：标题已含 HINGETRA，但结果顶部站点名为 hingetra.com，图标显示默认地球。页面还把品牌查询扩展为 Hedera；这是搜索端的查询解释，不是网站 title 被写成 Hedera。

## 线上证据

- 首页与 www 首页最终均到 `https://hingetra.com/`，正常浏览器和内容核验请求返回 200；canonical 正确，meta robots 为 index/follow，无响应头 noindex。
- 浏览器 DOM 中有且仅有一个 WebSite 节点，原首选名为 Hingetra Industrial Hinges，备选名 HINGETRA；og:site_name 已为 HINGETRA。
- 首页已声明 `/icon.png?icon.217we38_di067.png`，类型 PNG、128×128。原始图标为 HINGETRA 铰链标识，文件可访问，尺寸符合 Google 当前要求；并非没有添加 favicon。
- robots.txt 为 Allow: /，没有禁止图标路径。普通 Python 默认 User-Agent 的一次请求收到 403，正常浏览器和明确标识的核验客户端成功；不能用任一模拟 User-Agent 请求证明 Google 的实际抓取结果，需要 Search Console 的实时测试。

## 修改

现有 WebSite 节点改为 `name: HINGETRA`、`alternateName: Hingetra Industrial Hinges`，与导航 Logo、页面 title、og:site_name 的品牌一致。Organization 仍保留公司显示全称及已确认的法定名称。

复用现有有效图标与地址，不新建重复 WebSite 节点，不修改页面视觉设计或产品内容。站点名称和 favicon 最终由 Google 选择；代码更新不能直接更换已缓存的搜索结果，也不能保证展示或具体生效时间。

验证：97 项测试通过；生产静态构建含 TypeScript 检查通过，32 个 HTML 静态检查及 29 个内容页的 SEO 检查通过。构建首页只有一个 WebSite 节点，首选名为 HINGETRA，备选名与公司全称一致；原 128×128 favicon 标签和图标文件保持不变。带查询参数的线上图标返回 200，文件哈希与本地品牌图标一致。

## 用户账号内的后续动作

在 Search Console 的 `https://hingetra.com/` 属性检查首页，进行实时测试，测试可访问后请求编入索引一次。此操作需要用户已登录的管理账号；本轮不声称已代为提交，也不把公开网页可访问等同 Google 已重新抓取。

参考：

- [Google site names](https://developers.google.com/search/docs/appearance/site-names)：首选品牌名、备选名、名称一致性及重新抓取。
- [Google favicons](https://developers.google.com/search/docs/appearance/favicon-in-search)：正方形图标、抓取要求、稳定 URL，可能需要数天至数周处理且不保证展示。
