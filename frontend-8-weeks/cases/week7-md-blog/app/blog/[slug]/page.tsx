/**
 * 【案例名】博客详情页(动态路由)
 * 【练什么】[slug] 动态路由、await params(Next.js 16 写法)、
 *          notFound() 处理找不到的文章、generateMetadata 设置每页标题。
 * 【怎么运行】见本案例目录下的 README.md,
 *          本文件放到项目的 app/blog/[slug]/page.tsx(文件夹名带方括号)。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPost } from '@/lib/posts';

// ★★★ 全文件最重要的一行类型 ★★★
// Next.js 16 里,动态路由的 params 是一个 Promise,不是普通对象!
// 很多 AI 和旧教程会写 { params }: { params: { slug: string } },
// 然后直接用 params.slug——那是旧版写法,新版会报错。
// 记住口诀:类型包 Promise,用之前先 await。
type Props = {
  params: Promise<{ slug: string }>;
};

// 组件加 async,才能在里面 await。
const PostPage = async ({ params }: Props) => {
  const { slug } = await params; // ★ 先 await,再解构,这一步不能省

  const post = getPost(slug);

  // getPost 返回 Post | undefined。找不到就调 notFound(),
  // Next.js 会渲染内置的 404 页面,后面的代码不再执行,
  // 所以下面用 post 时 TS 也知道它一定存在。
  if (post === undefined) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
      <Link href='/blog'>← 返回列表</Link>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>{post.title}</h1>
      <p style={{ color: '#888', marginTop: 0 }}>{post.date}</p>

      {/* 正文按空行拆成段落,一段渲染成一个 <p> */}
      {post.content.split('\n\n').map((paragraph, index) => (
        <p key={index} style={{ lineHeight: 1.8 }}>
          {paragraph}
        </p>
      ))}
    </main>
  );
};

export default PostPage;

// 让每篇文章的浏览器标签页显示自己的标题(对分享和 SEO 都有用)。
// 注意:这里的 params 同样是 Promise,同样必须先 await——和上面是同一个坑。
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);

  return {
    title: post === undefined ? '文章不存在' : `${post.title} | 我的博客`,
  };
};
