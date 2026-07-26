# Week 7 案例:Next.js 博客(App Router + 动态路由)

## 使用规则

必须自己先写完并让 AI 验收后,才能打开本目录的代码对照。

## 怎么运行

本案例不能双击打开,需要放进一个真正的 Next.js 项目里跑。

1. 新建项目(所有问题一路回车,全部用默认选项):

   ```bash
   npx create-next-app@latest my-blog
   cd my-blog
   ```

2. 把本目录下的文件按相同路径放进 my-blog 项目:

   | 本目录里的文件 | 放到项目里的位置 |
   | --- | --- |
   | `lib/posts.ts` | `my-blog/lib/posts.ts`(lib 文件夹需要自己新建) |
   | `app/blog/page.tsx` | `my-blog/app/blog/page.tsx` |
   | `app/blog/[slug]/page.tsx` | `my-blog/app/blog/[slug]/page.tsx`(文件夹名就叫 `[slug]`,带方括号) |

   注意:如果你建项目时选了 `src/` 目录,就把上面三个文件都放到 `src/` 下面,
   即 `src/lib/...` 和 `src/app/...`,代码里的 `@/lib/posts` 两种情况都能用。

3. 启动开发服务器:

   ```bash
   npm run dev
   ```

4. 浏览器访问 <http://localhost:3000/blog>,点任意一篇文章进详情页;
   再手动把地址改成 `/blog/xxx` 这种不存在的 slug,应该看到 404 页面。

## 你能学到什么

- 文件夹就是路由:`app/blog/page.tsx` 对应网址 `/blog`;
- 动态路由:`[slug]` 文件夹接住 `/blog/后面的任意一段`;
- Server Component 里直接调用函数拿数据,不需要 useEffect + fetch;
- Next.js 16 的重点:`params` 是 Promise,必须 `await`(AI 和旧教程最常写错的地方);
- 找不到数据时调用 `notFound()`,以及用 `generateMetadata` 给每页设置标题。
