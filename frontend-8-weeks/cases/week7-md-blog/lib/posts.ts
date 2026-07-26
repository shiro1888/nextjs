/**
 * 【案例名】博客数据层(硬编码版)
 * 【练什么】把"数据"和"页面"分开放;导出带完整类型的取数函数,
 *          页面文件只管展示,以后换成读 Markdown 或数据库时页面不用改。
 * 【怎么运行】见本案例目录下的 README.md,本文件放到项目的 lib/posts.ts。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 */

export interface Post {
  slug: string; // 出现在网址里的英文短名,如 /blog/why-nextjs
  title: string;
  date: string; // 日期先用字符串存,本案例够用了
  content: string; // 正文,段落之间用空行(\n\n)分隔,详情页会按段落渲染
}

// 真实项目里这些数据会来自 Markdown 文件或数据库。
// 第 7 周先专注路由本身,数据硬编码即可。
const posts: Post[] = [
  {
    slug: 'why-nextjs',
    title: '我为什么选 Next.js',
    date: '2026-07-01',
    content:
      '写了六周的纯 React 之后,我遇到了两个问题:页面首屏白屏时间长,搜索引擎抓不到内容。\n\n' +
      'Next.js 的服务端渲染刚好解决这两件事:HTML 在服务器上就生成好了,浏览器拿到就能显示。\n\n' +
      '另外它的文件路由也省心,建个文件夹就是一个页面,不用再手写路由配置。',
  },
  {
    slug: 'server-components',
    title: '第一次理解 Server Component',
    date: '2026-07-08',
    content:
      '最开始我以为所有组件都要写 useEffect 去请求数据,结果在 Next.js 里根本不用。\n\n' +
      'Server Component 在服务器上运行,函数体里可以直接读数据、直接 await,写起来像普通函数。\n\n' +
      '只有需要点击、输入这些交互的组件,才在文件顶部加 use client 变成客户端组件。',
  },
  {
    slug: 'dynamic-routes',
    title: '动态路由踩坑记录',
    date: '2026-07-15',
    content:
      '今天给博客加详情页,文件夹名字要写成 [slug],方括号是名字的一部分,不是占位符号。\n\n' +
      '最大的坑:Next.js 16 里 params 是一个 Promise,必须先 await 才能解构出 slug。\n\n' +
      '网上很多旧教程直接写 params.slug,照抄就会报错,这也是问 AI 时最容易被教错的地方。',
  },
];

// 列表页用:返回全部文章。
export const getPosts = (): Post[] => {
  return posts;
};

// 详情页用:按 slug 找一篇。
// 找不到返回 undefined,类型写成 Post | undefined,让页面自己决定怎么处理。
export const getPost = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
};
