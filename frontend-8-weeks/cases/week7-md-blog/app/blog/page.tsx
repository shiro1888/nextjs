/**
 * 【案例名】博客列表页(Server Component)
 * 【练什么】文件路由(app/blog/page.tsx 对应网址 /blog)、
 *          服务端组件直接调用函数取数据、用 next/link 做站内跳转。
 * 【怎么运行】见本案例目录下的 README.md,本文件放到项目的 app/blog/page.tsx。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 */
import Link from 'next/link';
import { getPosts } from '@/lib/posts';

// 文件里没有 'use client',所以这是 Server Component:
// 它在服务器上运行,直接调用 getPosts() 就能拿到数据,
// 完全不需要 useState + useEffect + fetch 那一套。
const BlogPage = () => {
  const posts = getPosts();

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 28 }}>我的博客</h1>
      <p style={{ color: '#888' }}>共 {posts.length} 篇文章</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ margin: '20px 0' }}>
            {/* 用 Link 而不是 <a>:切换页面不会整页刷新,速度快得多。
                href 拼出来是 /blog/why-nextjs 这种地址,
                由 app/blog/[slug]/page.tsx 负责接住。 */}
            <Link href={`/blog/${post.slug}`} style={{ fontSize: 18 }}>
              {post.title}
            </Link>
            <span style={{ color: '#888', marginLeft: 12, fontSize: 14 }}>{post.date}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogPage;
