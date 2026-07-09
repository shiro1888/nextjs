# 前端速成执行计划：8-10 周从零到可投实习 + 可接静态建站小单

> 开始日期：2026-07-03
> 8 周节点：2026-08-28
> 10 周节点：2026-09-11
> 每日投入：建议 6 小时，其中至少 3 小时必须自己敲代码
> 核心目标：8-10 周后拥有 3-5 个可展示项目、GitHub 记录、线上作品链接，并开始投前端实习与接静态建站小单

---

## 0. 总原则

这份计划只服务一个目标：**尽快具备前端实习与简单静态建站交付能力**。

所以学习顺序不是“知识百科全书”，而是：

```text
HTML/CSS 够用 → JavaScript 扎实 → React 能做项目 → TypeScript 够用 → Next.js 能上线 → 简历/作品集/投递
```

你每天只需要记住 4 条硬规则：

1. **每天必须写代码**，不能只看教程。
2. **每天必须 commit**，从 Day 1 开始养成 Git 记录。
3. **每周必须有产出**，哪怕很丑，也要能运行。
4. **不会就问，但不能直接让 AI 代写完**，项目代码必须能逐行讲明白。

---

## 1. 总路线图

| 阶段 | 时间 | 主题 | 目标 | 验收标准 |
|---|---|---|---|---|
| 阶段 0 | 第 1 周前 3 天 | HTML + CSS 速通 | 能写基础页面和 Flex 布局 | 手写一个个人介绍页 |
| 阶段 1 | 第 1-3 周 | JavaScript 核心 | 能独立写逻辑、DOM、API 请求 | 天气 API 小应用 |
| 阶段 2 | 第 4-6 周 | React + TypeScript | 能用组件化方式做项目 | 2-3 个 React 项目 |
| 阶段 3 | 第 7-8 周 | Next.js + 部署 | 能做多页面网站并上线 | 一个 Next.js 毕业项目 |
| 阶段 4 | 第 9-10 周 | 简历 + 投递 + 接静态小单 | 开始市场验证 | 投递、面试、尝试接单 |

---

## 2. 技术优先级

### 必须掌握

| 技术 | 掌握到什么程度 |
|---|---|
| HTML | 常用标签、表单、语义化结构够用 |
| CSS | 盒模型、Flex、Grid、响应式、基础 UI |
| JavaScript | 变量、函数、数组、对象、DOM、事件、异步、fetch |
| Git / GitHub | add、commit、push、README、项目展示 |
| React | 组件、props、state、列表、表单、useEffect、组件拆分 |
| TypeScript | 基础类型、interface/type、props 类型、API 返回类型 |
| Next.js | App Router、page、layout、Server/Client Component、Route Handlers、metadata、部署 |
| Vercel | GitHub 连接、自动部署、环境变量 |

### 暂时不学或浅尝即止

| 暂缓内容 | 原因 |
|---|---|
| Vue / Angular | 先专注 React 生态 |
| Redux / Zustand | 初期项目用 React state 够了 |
| Node.js 后端深入 | 先用 Next.js Route Handlers 和 Supabase 够用 |
| K8s / 微服务 | 当前阶段收益极低 |
| CSS 预处理器 | Tailwind + 原生 CSS 已够用 |
| 复杂算法 | 先准备前端高频题即可 |
| 带后台的接单项目 | 风险高、维护重、超出前期能力边界 |

---

## 3. 核心学习资源

只用这些，不再囤教程。

| 资源 | 用途 | 地址 |
|---|---|---|
| 现代 JavaScript 教程 | JS 主线教材 | https://zh.javascript.info |
| MDN Web Docs | HTML/CSS/JS 权威字典 | https://developer.mozilla.org/zh-CN |
| React 官方文档 | React 主线 | https://zh-hans.react.dev |
| Next.js Learn | Next.js 官方教程 | https://nextjs.org/learn |
| TypeScript 手册 | TS 查询和入门 | https://www.typescriptlang.org/zh/docs |
| Tailwind CSS 文档 | 样式工具查询 | https://tailwindcss.com/docs |
| Vercel | 部署项目 | https://vercel.com |
| GitHub | 存代码和展示项目 | https://github.com |

---

## 3.1 javascript.info 精读/跳过清单（按官方目录逐章标注）

javascript.info 内容太全，不需要从头看到尾。对应第 1-3 周的 JS 阶段，按下面的目录逐章标注：**必读 / 泛读（扫一眼）/ 跳过（先不学）**。

### 第一部分：简介

| 章节 | 处理方式 |
|---|---|
| 1.1 JavaScript 简介 | 泛读 |
| 1.2 手册与规范 | 跳过（查阅用，不用专门学） |
| 1.3 代码编辑器 | 跳过（已有自己的编辑器） |
| 1.4 开发者控制台 | 泛读（会打开 F12 看报错即可） |

### 第一部分：JavaScript 基础知识

| 章节 | 处理方式 |
|---|---|
| 2.1-2.5 Hello world / 代码结构 / use strict / 变量 / 数据类型 | 必读 |
| 2.6 交互：alert、prompt 和 confirm | 泛读 |
| 2.7-2.13 类型转换 / 运算符 / 比较 / 条件分支 / 逻辑运算符 / `??` / 循环 | 必读 |
| 2.14 switch 语句 | 泛读 |
| 2.15-2.17 函数 / 函数表达式 / 箭头函数 | 必读（箭头函数是 React 的基本功） |
| 2.18 JavaScript 特性 | 泛读（当复习） |

### 代码质量

| 章节 | 处理方式 |
|---|---|
| 3.1 在浏览器中调试 | 泛读（会用断点即可） |
| 3.2 代码风格 | 泛读 |
| 3.3 注释 | 跳过 |
| 3.4 忍者代码 | 跳过（趣味吐槽章节） |
| 3.5 使用 Mocha 进行自动化测试 | 跳过（测试留到工作后再学） |
| 3.6 Polyfill 和转译器 | 泛读（知道 Babel 是干嘛的就行） |

### Object：基础知识

| 章节 | 处理方式 |
|---|---|
| 4.1 对象 | 必读 |
| 4.2 对象引用和复制 | 必读（React state 更新最容易踩这个坑） |
| 4.3 垃圾回收 | 泛读 |
| 4.4 对象方法，"this" | 必读 |
| 4.5 构造器和操作符 "new" | 泛读 |
| 4.6 可选链 "?." | 必读 |
| 4.7 symbol 类型 | 跳过 |
| 4.8 对象——原始值转换 | 跳过 |

### 数据类型

| 章节 | 处理方式 |
|---|---|
| 5.1 原始类型的方法 | 泛读 |
| 5.2 数字类型 | 必读 |
| 5.3 字符串 | 必读 |
| 5.4 数组 | 必读 |
| 5.5 数组方法 | 必读（`map`/`filter`/`reduce`/`find` 练到肌肉记忆） |
| 5.6 Iterable object | 跳过 |
| 5.7 Map and Set | 必读（实际项目常用） |
| 5.8 WeakMap and WeakSet | 跳过 |
| 5.9 Object.keys，values，entries | 必读（渲染对象列表常用） |
| 5.10 解构赋值 | 必读 |
| 5.11 日期和时间 | 泛读（用到时查） |
| 5.12 JSON 方法，toJSON | 必读（fetch/localStorage 都要用） |

### 函数进阶内容

| 章节 | 处理方式 |
|---|---|
| 6.1 递归和堆栈 | 跳过（先不练算法） |
| 6.2 Rest 参数与 Spread 语法 | 必读（React 更新 state、传 props 到处用） |
| 6.3 变量作用域，闭包 | 必读（自定义 Hook 会用到） |
| 6.4 老旧的 "var" | 泛读（知道为什么不用 var） |
| 6.5 全局对象 | 泛读 |
| 6.6 函数对象，NFE | 跳过 |
| 6.7 "new Function" 语法 | 跳过 |
| 6.8 调度：setTimeout 和 setInterval | 必读（防抖/轮询会用） |
| 6.9 装饰器模式和转发，call/apply | 跳过 |
| 6.10 函数绑定 | 泛读 |
| 6.11 深入理解箭头函数 | 泛读（知道箭头函数不绑定自己的 this） |

### 对象属性配置 / 原型，继承 / 类

| 章节 | 处理方式 |
|---|---|
| 7.1-7.2 属性标志描述符 / getter setter | 跳过 |
| 8.1-8.4 原型，继承全部内容 | 跳过（用 React 组件+hooks 够用，以后面试再补） |
| 9.1 Class 基本语法 | 泛读（认识语法即可，能看懂别人代码） |
| 9.2-9.7 类继承 / 静态属性 / 私有属性 / 扩展内建类 / instanceof / Mixin | 跳过 |

### 错误处理 / Promise，async/await / Generator / 模块 / 杂项

| 章节 | 处理方式 |
|---|---|
| 10.1 错误处理，try...catch | 必读 |
| 10.2 自定义 Error，扩展 Error | 跳过 |
| 11.1 简介：回调 | 泛读（了解 Promise 出现前的痛点） |
| 11.2-11.4 Promise / Promise 链 / 用 promise 处理错误 | 必读 |
| 11.5 Promise API（all/race/allSettled） | 泛读（用到 `Promise.all` 时再细看） |
| 11.6 Promisification | 跳过 |
| 11.7 微任务（Microtask） | 跳过（面试深挖时再学） |
| 11.8 async/await | 必读 |
| 12.1-12.2 Generator，异步迭代 | 跳过 |
| 13.1-13.3 模块简介 / 导出导入 / 动态导入 | 泛读（会写 `import`/`export` 基本语法即可，Next.js 会自动处理打包） |
| 14.1-14.6 Proxy / Eval / 柯里化 / Reference Type / BigInt / Unicode | 跳过 |

### 第二部分：浏览器：文档，事件，接口 —— Document

| 章节 | 处理方式 |
|---|---|
| 1.1 浏览器环境，规格 | 泛读 |
| 1.2 DOM 树 | 必读 |
| 1.3 遍历 DOM | 必读 |
| 1.4 搜索：getElement*，querySelector* | 必读 |
| 1.5 节点属性：type，tag 和 content | 必读 |
| 1.6 特性和属性 | 泛读 |
| 1.7 修改文档（document） | 必读 |
| 1.8 样式和类 | 必读 |
| 1.9 元素大小和滚动 | 泛读 |
| 1.10 Window 大小和滚动 | 泛读 |
| 1.11 坐标 | 跳过（做拖拽/悬浮提示时再学） |

### 事件简介 / UI 事件 / 表单，控件

| 章节 | 处理方式 |
|---|---|
| 2.1 浏览器事件简介 | 必读 |
| 2.2 冒泡和捕获 | 必读 |
| 2.3 事件委托 | 必读（常用模式） |
| 2.4 浏览器默认行为 | 必读（`preventDefault` 表单提交常用） |
| 2.5 创建自定义事件 | 跳过 |
| 3.1 鼠标事件 | 泛读 |
| 3.2 移动鼠标 | 跳过 |
| 3.3 鼠标拖放事件 | 跳过 |
| 3.4 指针事件 | 跳过 |
| 3.5 键盘：keydown 和 keyup | 泛读（搜索框回车提交会用到） |
| 3.6 滚动 | 跳过 |
| 4.1 表单属性和方法 | 必读 |
| 4.2 聚焦：focus/blur | 必读 |
| 4.3 事件：change，input，cut，copy，paste | 必读（受控组件的核心） |
| 4.4 表单：事件和方法提交 | 必读 |

### 加载文档和其他资源 / 杂项

| 章节 | 处理方式 |
|---|---|
| 5.1 页面生命周期 | 泛读 |
| 5.2 脚本：async，defer | 泛读 |
| 5.3 资源加载：onload，onerror | 跳过 |
| 6.1 DOM 变动观察器 | 跳过 |
| 6.2 选择和范围 | 跳过 |
| 6.3 事件循环：微任务和宏任务 | 泛读（面试常问，有空可以看） |

### 第三部分：其他文章（几乎全部跳过）

| 分类 | 处理方式 |
|---|---|
| Frame 和 window（弹窗、跨窗口通信、点击劫持） | 跳过 |
| 二进制数据，文件（ArrayBuffer/Blob/File） | 跳过 |
| 网络请求（Fetch 高级用法、XMLHttpRequest、WebSocket、SSE、长轮询） | 跳过（基础 fetch 已在第一部分学过，够用） |
| 在浏览器中存储数据：Cookie | 跳过 |
| 在浏览器中存储数据：LocalStorage，sessionStorage | **必读**（React Todo 项目要用 localStorage 保存数据） |
| 在浏览器中存储数据：IndexedDB | 跳过 |
| 动画（贝塞尔曲线、CSS 动画、JS 动画） | 跳过 |
| Web components 全部内容 | 跳过 |
| 正则表达式全部内容 | 跳过（用到时查 MDN，不用系统学） |

### 建议做法

- 不要按目录顺序从头看到尾，「必读」章节看完立刻做该章末尾的习题（tasks），这是 javascript.info 最值钱的部分。
- 「泛读」章节快速看一遍知道是什么、能查到就行，不用做完所有习题。
- 「跳过」章节先不点开，书签留着，等 React/TS/面试阶段遇到看不懂的概念再回来查，而不是提前学。

---

## 4. 每日固定流程

每天 6 小时版：

| 时段 | 时长 | 内容 | 产出 |
|---|---:|---|---|
| 上午 | 2 小时 | 学新知识，边看边敲示例 | 一份可运行练习 |
| 下午 | 3 小时 | 独立写代码，完成当天任务 | 一个小功能或练习题 |
| 晚上 | 1 小时 | 复盘、写日志、整理问题、提交 Git | 学习日志 + commit |

每天结束前必须完成：

```powershell
git status
git add .
git commit -m "day X: describe today work"
```

如果当天已经 commit 过，也至少写学习日志。

---

## 5. Git 和目录规范

建议所有练习都放在：

```text
C:\Next.js\frontend-8-weeks
```

推荐目录：

```text
frontend-8-weeks/
  week-01-html-css-js/
  week-02-js-core/
  week-03-dom-async/
  week-04-react-todo/
  week-05-react-movie-search/
  week-06-react-ts-cart/
  week-07-nextjs-starter/
  week-08-nextjs-final-project/
  notes/
  README.md
```

commit 信息建议：

```text
day 1: create profile page
day 2: practice js variables and functions
day 3: finish fizzbuzz and guessing game
week 3: build weather api app
week 5: add movie search loading and error states
week 8: deploy final nextjs project
```

---

## 6. 逐周执行计划

## 第 1 周：HTML/CSS 速通 + JavaScript 起步

时间：2026-07-03 至 2026-07-09

目标：不要纠结页面多漂亮，先把 Web 基础跑起来。

### Day 1-3：HTML + CSS 够用

学习内容：

- 常用标签：`div`、`p`、`a`、`img`、`input`、`button`、`form`
- HTML 页面结构
- CSS 选择器
- 盒模型
- `display: flex`
- `gap`、`padding`、`margin`
- `border-radius`、`box-shadow`
- 简单响应式

练习项目：

- 个人介绍页
- 技能卡片区
- 项目卡片区
- 移动端不炸版

验收标准：

- 能独立写一个静态页面
- 能解释盒模型
- 能用 Flex 做横向/纵向排列
- 页面没有横向滚动条

不要学：

- float 布局
- CSS 预处理器
- 复杂动画
- 大量 UI 特效

### Day 4-7：JavaScript 基础语法

学习内容：

- `let` / `const`
- 数据类型
- 字符串、数字、布尔值
- `if/else`
- `for` / `while`
- 函数
- 基础输入输出：`console.log()`

练习题：

- FizzBuzz
- 判断闰年
- 九九乘法表
- 猜数字游戏
- 简单 BMI 计算器

第 1 周验收：

- 一个个人介绍页
- 至少 10 个 JS 基础练习
- 至少 5 次 commit
- 一篇周总结

---

## 第 2 周：JavaScript 核心

时间：2026-07-10 至 2026-07-16

目标：把数组、对象、函数练熟。

学习内容：

- 对象 Object
- 数组 Array
- 数组方法：`map`、`filter`、`reduce`、`find`、`forEach`、`some`、`every`
- 字符串方法
- 解构赋值
- 模板字符串
- 简单数据转换

练习题：

- 数组去重
- 统计字符出现次数
- 学生成绩排序
- 购物车总价计算
- 商品筛选和搜索
- 用户列表格式化
- 用 `reduce` 做分组统计

第 2 周验收：

- 不看答案完成 20-30 个 JS 数据处理题
- 能解释 `map` 和 `forEach` 区别
- 能解释 `filter` 和 `find` 区别
- 能用 `reduce` 算总和
- 一篇 JS 数组方法总结

---

## 第 3 周：DOM + 事件 + 异步

时间：2026-07-17 至 2026-07-23

目标：能写一个真正能交互、能请求 API 的小页面。

### Day 1-3：DOM 和事件

学习内容：

- `document.querySelector`
- `document.querySelectorAll`
- `addEventListener`
- 修改文本和样式
- 创建/删除 DOM 元素
- 表单输入处理

练习项目：

- Todo List
- 简单计算器
- 标签切换 Tab
- 图片切换器

### Day 4-7：Promise / async / fetch

学习内容：

- Promise 基础
- `async/await`
- `try/catch`
- `fetch`
- loading 状态
- error 状态
- JSON 数据渲染

API 练习：

- 天气：`wttr.in`
- 随机用户：`randomuser.me`
- 电影：TMDB

第 3 周大验收：

做一个天气 API 页面：

```text
输入城市名 → 点击查询 → 调 API → 显示天气 → 显示 loading → 显示错误状态
```

验收不通过就加练 3-5 天，不要急着进 React。

---

## 第 4 周：React 入门

时间：2026-07-24 至 2026-07-30

目标：从 DOM 操作切换到组件化思维。

学习内容：

- JSX
- 组件
- props
- `useState`
- 条件渲染
- 列表渲染
- key
- 表单受控组件
- 组件拆分

项目：React Todo

功能要求：

- 新增任务
- 删除任务
- 勾选完成
- 编辑任务
- 统计剩余数量
- localStorage 保存

TypeScript 预热：

- 认识 `type`
- 认识 `interface`
- 给简单 props 标类型

第 4 周验收：

- React Todo 能运行
- 代码上传 GitHub
- README 写清楚功能和运行方式
- 能解释 state 和 props 区别

---

## 第 5 周：React 进阶 + API 项目

时间：2026-07-31 至 2026-08-06

目标：完成一个接近真实项目的小应用。

学习内容：

- `useEffect`
- 请求 API
- loading 状态
- error 状态
- 组件间传值
- 简单自定义 Hook
- Tailwind CSS 入门

项目：电影搜索页

功能要求：

- 搜索框
- 搜索按钮
- 电影列表
- loading 状态
- error 状态
- 空结果状态
- 电影详情弹窗或详情页
- 响应式布局

TypeScript 渐进引入：

- 给电影数据类型建 `type Movie`
- 给组件 props 标类型
- 给事件处理函数标类型

第 5 周验收：

- 电影搜索项目能运行
- 页面部署上线或至少 GitHub 可见
- README 有截图
- 能解释 `useEffect` 什么时候执行

---

## 第 6 周：TypeScript + React 巩固

时间：2026-08-07 至 2026-08-13

目标：具备写 React + TS 小项目的能力。

学习内容：

- 基础类型
- 数组类型
- 对象类型
- `type` vs `interface`
- 联合类型
- 可选属性
- 函数参数和返回值类型
- React props 类型
- API 返回值类型

项目：购物车应用

功能要求：

- 商品列表
- 加入购物车
- 数量加减
- 删除商品
- 总价计算
- 商品筛选
- 空购物车状态

第 6 周验收：

- 购物车项目用 React + TS 完成
- 前 3 个 React 项目都在 GitHub 上
- 每个项目都有 README
- 能解释 `type` 和 `interface` 的基本区别
- 能给一个组件 props 写类型

---

## 第 7 周：Next.js App Router 入门

时间：2026-08-14 至 2026-08-20

目标：理解 Next.js 的项目结构和 App Router。

学习内容：

- `create-next-app`
- `app` 目录
- `page.tsx`
- `layout.tsx`
- 嵌套路由
- 动态路由
- `loading.tsx`
- `not-found.tsx`
- Server Component
- Client Component
- 数据获取
- metadata
- Route Handlers：`app/api/xxx/route.ts`
- 环境变量

注意：

优先学习 App Router，不要把重点放在旧的 Pages Router。API 相关优先学 Route Handlers。

练习：

- 多页面个人网站
- 博客列表页
- 文章详情页
- 一个简单 API：`/api/hello`

第 7 周验收：

- Next.js 小网站能跑起来
- 至少 4 个页面
- 至少 1 个动态路由
- 至少 1 个 Route Handler
- 能解释 Server Component 和 Client Component 的区别

---

## 第 8 周：Next.js 毕业项目 + 上线

时间：2026-08-21 至 2026-08-28

目标：完成一个可放简历的线上项目。

毕业项目三选一：

### 选项 A：个人作品集 + 博客

适合投实习。

功能：

- 首页
- 关于我
- 项目列表
- 项目详情
- 博客列表
- 博客详情
- 联系方式
- SEO metadata

### 选项 B：本地商家展示站

适合接静态建站小单。

功能：

- 首页
- 服务介绍
- 案例展示
- 价格说明
- 联系方式
- 响应式布局
- 地图/电话/微信二维码区域

### 选项 C：个人工具站

适合展示 JS 和 API 能力。

功能：

- 天气查询
- 汇率换算
- Todo
- 常用工具集合
- 多页面路由

推荐优先级：

```text
投实习优先：选项 A
接单优先：选项 B
练 API 优先：选项 C
```

部署要求：

- GitHub 仓库
- Vercel 在线地址
- README
- 项目截图
- 技术栈说明
- 本地运行命令

第 8 周验收：

- 项目线上可访问
- 手机端能正常看
- README 完整
- 你能用 3 分钟讲清楚项目

---

## 第 9-10 周：简历、投递、接静态小单

时间：2026-08-29 至 2026-09-11

目标：开始市场验证。

### 投实习

渠道：

- Boss 直聘
- 实习僧
- 牛客网
- 学校就业群
- 本地公司官网

搜索词：

```text
前端实习
Web 前端实习生
React 实习
前端开发实习
```

简历内容：

- 基本信息
- 可实习时间
- 技术栈
- 2-3 个项目
- GitHub
- 在线项目链接
- 学习经历和个人优势

简历措辞：

不要写：

```text
精通 React / 精通 Next.js
```

建议写：

```text
熟悉 HTML、CSS、JavaScript，能够使用 React + TypeScript 开发基础前端项目；了解 Next.js App Router，并完成过部署上线项目。
```

每日投递目标：

```text
每天 20-30 家
连续投 2-4 周
投递后记录公司、岗位、状态、反馈
```

### 接静态建站小单

前期只接：

- 个人主页
- 作品集
- 活动页
- 社团宣传页
- 本地商家展示页
- 简单落地页

暂时不接：

- 带后台系统
- 登录注册
- 支付
- 复杂数据库
- 权限管理
- 长期维护型系统

定价参考：

| 类型 | 参考价格 |
|---|---:|
| 单页静态展示页 | 300-800 |
| 3-5 页企业展示站 | 800-1500 |
| 带设计修改和部署 | 可额外加价 |

接单前必须问清楚：

- 页面数量
- 有没有设计稿
- 文案谁提供
- 图片谁提供
- 是否需要部署
- 是否需要域名
- 修改次数限制
- 交付时间

---

## 7. 项目清单

8 周后至少有这些项目：

| 项目 | 技术 | 用途 |
|---|---|---|
| 个人介绍页 | HTML + CSS | 基础页面能力 |
| JS 天气 API | HTML + CSS + JS + fetch | JS、DOM、异步能力 |
| React Todo | React | 组件和状态管理 |
| React 电影搜索 | React + API + Tailwind | API 项目能力 |
| React TS 购物车 | React + TypeScript | TS 和业务逻辑 |
| Next.js 毕业项目 | Next.js + Vercel | 简历核心项目 |

最重要的是最后 3 个：

1. React 电影搜索
2. React TS 购物车
3. Next.js 毕业项目

---

## 8. 每周验收问题

### 第 1 周

- HTML 页面基本结构是什么？
- 盒模型是什么？
- Flex 怎么实现水平垂直居中？
- `let` 和 `const` 区别是什么？
- 函数参数有什么用？

### 第 2 周

- `map` 和 `forEach` 区别是什么？
- `filter` 和 `find` 区别是什么？
- `reduce` 能做什么？
- 对象和数组分别适合存什么？

### 第 3 周

- DOM 是什么？
- 事件监听怎么写？
- Promise 是什么？
- `async/await` 解决什么问题？
- `fetch` 请求失败怎么处理？

### 第 4 周

- React 组件是什么？
- props 和 state 区别是什么？
- 为什么列表要写 key？
- 受控组件是什么？

### 第 5 周

- `useEffect` 什么时候执行？
- loading 和 error 状态为什么重要？
- 如何拆分组件？
- API 数据如何渲染到页面？

### 第 6 周

- TypeScript 解决什么问题？
- `type` 和 `interface` 基本区别是什么？
- 如何给 props 写类型？
- 如何给 API 返回值写类型？

### 第 7 周

- Next.js App Router 是什么？
- `page.tsx` 和 `layout.tsx` 区别是什么？
- Server Component 和 Client Component 区别是什么？
- Route Handler 怎么写？

### 第 8 周

- 项目如何部署到 Vercel？
- 环境变量放在哪里？
- README 应该写什么？
- 怎么向面试官介绍项目？

---

## 9. 学习日志模板

每天在 `notes/` 里写一篇，文件名示例：

```text
2026-07-03-day-01.md
```

模板：

```md
# Day X 学习日志

## 今天学了什么

-

## 今天写了什么代码

-

## 今天遇到的问题

-

## 我是怎么解决的

-

## 明天做什么

-

## 今日 commit

-
```

---

## 10. 卡住时的求助流程

遇到问题按这个顺序：

1. 先读报错，不要马上复制给 AI。
2. 看报错文件名、行号、关键字。
3. 自己尝试 10-30 分钟。
4. 还不行，再把这些内容一起发出来：

```text
我想实现什么：
我现在的代码：
报错信息：
我已经尝试过什么：
```

不要只发一句：

```text
为什么不行？
```

---

## 11. 今日启动任务

今天是 2026-07-03，先做启动动作。

### 任务 1：建总仓库

```powershell
cd C:\Next.js
mkdir frontend-8-weeks
cd frontend-8-weeks
git init
mkdir week-01-html-css-js
mkdir notes
```

### 任务 2：写第一行 JS

在 `week-01-html-css-js` 里创建：

```text
index.html
script.js
```

`script.js` 写：

```js
console.log("day 1");
```

### 任务 3：写第一篇日志

创建：

```text
notes/2026-07-03-day-01.md
```

写下：

```md
# Day 1 学习日志

## 今天学了什么

- 建立前端学习仓库
- 跑通第一行 JavaScript

## 明天做什么

- HTML/CSS 个人介绍页
```

### 任务 4：第一次 commit

```powershell
git status
git add .
git commit -m "day 1: start frontend learning"
```

---

## 12. 最终目标状态

到 2026-09-11，你应该至少拥有：

- 1 个 GitHub 总学习仓库
- 3 个以上完整项目仓库或项目目录
- 1 个 Next.js 线上项目
- 1 份前端实习简历
- 1 个作品集页面
- 1 套项目讲解话术
- 每天 commit 的学习记录
- 开始投递实习
- 可以尝试接静态展示页小单

记住：

```text
不求学得多，先求每天有产出。
不求页面完美，先求功能跑通。
不求一步到位，先求连续 8 周不断线。
```
