/**
 * 【案例名】博客列表页(Server Component)
 * 【练什么】文件路由(app/blog/page.tsx 对应网址 /blog)、
 *          服务端组件直接调用函数取数据、用 next/link 做站内跳转。
 * 【怎么运行】见本案例目录下的 README.md,本文件放到项目的 app/blog/page.tsx。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 * 【UI 说明】本案例使用统一设计系统(绿色主题,画布 #f2f5f4 + 白卡片 + emerald 主色);
 *          这里用 Tailwind 实现是因为 create-next-app 默认自带,色值与其他案例的令牌一致。
 */
import Link from 'next/link';
import { getPosts } from '@/lib/posts';

// 文件里没有 'use client',所以这是 Server Component:
// 它在服务器上运行,直接调用 getPosts() 就能拿到数据,
// 完全不需要 useState + useEffect + fetch 那一套。
const BlogPage = () => {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-[#f2f5f4] px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600">
            Week 7 · Next.js 基础
          </p>
          <h1 className="mt-1 text-3xl font-bold">我的博客</h1>
          <p className="mt-1 text-sm tabular-nums text-gray-500">共 {posts.length} 篇文章</p>
        </header>

        {/* 空状态也要设计过:没有文章时给一张居中的提示卡,而不是空白 */}
        {posts.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500 shadow-[0_1px_2px_rgba(16,24,40,.05),0_10px_28px_rgba(16,24,40,.07)]">
            ✍️ 还没有文章,去 lib/posts.ts 里加一篇吧
          </div>
        )}

        <ul className="list-none space-y-4 p-0">
          {posts.map((post) => (
            // 文章卡:hover 轻微上浮;motion-reduce 时关掉动效
            <li
              key={post.slug}
              className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.05),0_10px_28px_rgba(16,24,40,.07)] transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {/* 用 Link 而不是 <a>:切换页面不会整页刷新,速度快得多。
                  href 拼出来是 /blog/why-nextjs 这种地址,
                  由 app/blog/[slug]/page.tsx 负责接住。 */}
              <Link
                href={`/blog/${post.slug}`}
                className="rounded text-lg font-semibold text-gray-900 transition-colors duration-150 hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-sm tabular-nums text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default BlogPage;
