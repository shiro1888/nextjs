/**
 * 【案例名】博客详情页(动态路由)
 * 【练什么】[slug] 动态路由、await params(Next.js 16 写法)、
 *          notFound() 处理找不到的文章、generateMetadata 设置每页标题。
 * 【怎么运行】见本案例目录下的 README.md,
 *          本文件放到项目的 app/blog/[slug]/page.tsx(文件夹名带方括号)。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 * 【UI 说明】本案例使用统一设计系统(绿色主题,画布 #f2f5f4 + 白卡片 + emerald 主色);
 *          这里用 Tailwind 实现是因为 create-next-app 默认自带,色值与其他案例的令牌一致。
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
    <main className="min-h-screen bg-[#f2f5f4] px-6 py-12 text-gray-900">
      <article className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,.05),0_10px_28px_rgba(16,24,40,.07)] sm:p-10">
        <Link
          href="/blog"
          className="rounded text-sm font-medium text-emerald-600 transition-colors duration-150 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
        >
          ← 返回列表
        </Link>

        <header className="mt-6 border-b border-gray-200 pb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600">
            Week 7 · 动态路由
          </p>
          <h1 className="mt-1 text-3xl font-bold leading-snug">{post.title}</h1>
          <p className="mt-2 text-sm tabular-nums text-gray-500">{post.date}</p>
        </header>

        {/* 正文按空行拆成段落,一段渲染成一个 <p>;
            max-w-prose 控制行长,leading-8 给出舒适行距 */}
        <div className="max-w-prose">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mt-5 leading-8 text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
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
