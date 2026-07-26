# 经典案例参考代码库

这里是 `nextjs.md` 第 6.5 节「经典案例库」的**完整参考代码**,每个案例一个文件夹,全部可以直接运行:

- `index.html` 的案例:双击文件用浏览器打开即可
- `App.jsx` / `App.tsx` 的案例:`npm create vite@latest my-app -- --template react`(TS 案例用 `react-ts`),用案例文件替换 `src/App.jsx`,然后 `npm run dev`
- `week6-contacts-ts`:`npx tsx contacts.ts` 运行,或粘贴到 typescriptlang.org/play
- `week7-md-blog`:看该文件夹里的 README,放进 create-next-app 新项目

## 使用铁律(违反 = 案例作废重做)

```text
自己写完 → 发给 AI 验收(模板 9)→ 通过后才允许打开参考代码对照
```

对照时问自己三个问题,答案写进当日日志:

1. 参考代码哪里比我的简洁?用了什么我没想到的方法?
2. 我的版本有没有参考代码考虑到、而我漏掉的边界情况?
3. 有没有我看不懂的行?看不懂就用模板 6 让 AI 审问自己。

**先看答案再动手 = 白学。** 你的大脑只会对"自己挣扎过的问题"的答案产生记忆。

## 案例清单

| 周 | 文件夹 | 案例 |
| --- | --- | --- |
| 1 | `week1-personal-card/` | 个人名片页(HTML/CSS) |
| 2 | `week2-atm/` | ATM 取款机(循环+分支) |
| 2 | `week2-score-manager/` | 学生成绩管理(对象数组) |
| 2 | `week2-cart-checkout/` | 购物车结算(map/filter/reduce) |
| 2 | `week2-contacts/` | 通讯录 CRUD |
| 3 | `week3-carousel/` | 轮播图(DOM 综合) |
| 3 | `week3-tab/` | Tab 切换(事件委托) |
| 3 | `week3-todo/` | 纯 JS Todo(localStorage) |
| 3 | `week3-form-validate/` | 注册表单验证 |
| 3 | `week3-countdown/` | 秒杀倒计时 |
| 3 | `week3-debounce-search/` | 搜索防抖联想 |
| 3 | `week3-random-user/` | 随机用户卡片(fetch 三态) |
| 4 | `week4-counter/` | React 计数器 |
| 4 | `week4-tic-tac-toe/` | 井字棋(官方经典) |
| 4 | `week4-bilibili-comments/` | B 站评论区 |
| 5 | `week5-github-user-search/` | GitHub 用户搜索 |
| 5 | `week5-show-search/` | 剧集搜索(免 key 的"电影搜索"同款) |
| 6 | `week6-contacts-ts/` | 通讯录 TS 重构 |
| 6 | `week6-typed-search/` | 剧集搜索 TS 版 |
| 7 | `week7-md-blog/` | Next.js 16 简易博客(await params) |

## 为什么四个作品集项目没有参考答案

**天气查询、React Todo、电影搜索、购物车、毕业项目**没有答案文件——它们会写进你的简历,面试官会逐行追问,必须 100% 是你自己的代码。每个都配了"同款技术"的参考案例,先学模式,再独立做:

| 作品集项目(无答案) | 学模式用的参考案例 |
| --- | --- |
| 天气查询(第 3 周验收门槛) | `week3-random-user/` |
| React Todo | `week3-todo/`(数据驱动思路)+ `week4-counter/` + `week4-bilibili-comments/` |
| 电影搜索 | `week5-show-search/` + `week5-github-user-search/` |
| 购物车(React+TS) | `week6-typed-search/` + `week6-contacts-ts/` |

## 你自己的代码放哪

你自己写的案例代码放对应的 `week-0X-*/` 文件夹,单独 commit(如 `day 12: finish carousel case`)。`cases/` 文件夹只放参考代码,不要改动它——改了就失去了"对照标准答案"的意义。
