/**
 * 【案例名】剧集搜索(TypeScript 版)
 * 【练什么】给 React 组件补全类型:用 type 描述接口数据、useState 泛型、
 *          表单事件类型 React.FormEvent、可空字段(image 可能是 null)的安全处理。
 * 【怎么运行】
 *   1. npm create vite@latest my-app -- --template react-ts
 *   2. cd my-app,然后 npm install
 *   3. 用本文件替换 src/App.tsx
 *   4. npm run dev,浏览器打开终端里提示的地址
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 * 【UI 说明】本案例使用统一设计系统(与 week5-show-search 完全同款视觉),令牌含义见样式注释。
 *
 * 和 week5-show-search 对照着看,重点看多了哪些类型标注:
 *   1. type Show / SearchItem:先把接口返回的数据长什么样描述清楚;
 *   2. useState<Show[]>([]):空数组看不出要装什么,泛型告诉 TS 装的是 Show;
 *   3. e: React.FormEvent<HTMLFormElement>:表单提交事件的类型;
 *   4. image: {...} | null:没海报的剧这个字段整个是 null,取值前必须先判断。
 */
import React, { useState } from 'react';

// 只描述我们用得到的字段,接口实际返回的字段更多,不写也没关系。
type Show = {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null;
};

// 搜索接口返回的其实是 [{ score, show }, ...],外面还包了一层。
type SearchItem = {
  score: number;
  show: Show;
};

const App = () => {
  const [query, setQuery] = useState('');
  // 不写 <Show[]> 的话,TS 会把 [] 推断成 never[],后面 setShows 就会报错。
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = query.trim();
    if (keyword === '') return;

    setLoading(true);
    setError('');
    try {
      const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(keyword)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`请求失败:HTTP ${res.status}`);
      // res.json() 的返回值是 any,把它接到标注好类型的变量上,
      // 之后再写错字段名(比如 item.shows)TS 就能当场报错。
      const data: SearchItem[] = await res.json();
      setShows(data.map((item) => item.show));
      setSearched(true);
    } catch (err) {
      // catch 到的 err 是 unknown 类型,先用 instanceof 收窄才能读 .message。
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="case-card">
      <style>{`
        /* ===== 设计令牌:全部案例共用一套,值不要改 ===== */
        :root {
          --brand: #0e9f6e;        /* 主色:清新绿(呼应小兔鲜) */
          --brand-dark: #057a55;   /* hover 加深 */
          --brand-soft: #e6f6f0;   /* 主色浅底(标签、选中态背景) */
          --ink: #111827;          /* 主文字 */
          --ink-2: #6b7280;        /* 次要文字 */
          --bg: #f2f5f4;           /* 页面画布:带一点绿意的浅灰 */
          --card: #ffffff;
          --line: #e5e7eb;
          --danger: #dc2626;
          --radius: 14px;
          --shadow: 0 1px 2px rgba(16,24,40,.05), 0 10px 28px rgba(16,24,40,.07);
        }
        * { box-sizing: border-box; }
        body {
          margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
          background: var(--bg);
          font-family: -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        }
        .case-card { width: min(720px, 100%); background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 28px 32px; color: var(--ink); }
        .eyebrow { margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--brand); }
        .case-title { margin: 0 0 4px; font-size: 21px; font-weight: 700; }
        .case-desc { margin: 0; font-size: 14px; color: var(--ink-2); }
        .bar { display: flex; gap: 8px; max-width: 480px; margin: 20px 0 24px; }
        .bar input { flex: 1; min-width: 0; padding: 10px 12px; font-size: 15px; border: 1px solid var(--line); border-radius: 10px; outline: none; transition: border-color .15s ease, box-shadow .15s ease; }
        .bar input:hover { border-color: #d1d5db; }
        .bar input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(14,159,110,.18); }
        .bar button { padding: 10px 18px; font-size: 15px; border: none; border-radius: 10px; background: var(--brand); color: #fff; cursor: pointer; transition: all .15s ease; }
        .bar button:hover { background: var(--brand-dark); transform: translateY(-1px); }
        .bar button:disabled { opacity: .6; cursor: not-allowed; transform: none; background: var(--brand); }
        /* 空状态 / 无结果:居中留白 + 图标,和 week5 完全同一套写法 */
        .empty { text-align: center; padding: 40px 16px; color: var(--ink-2); }
        .empty-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-title { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: var(--ink); }
        .empty-text { margin: 0; font-size: 14px; }
        .alert { margin: 0; padding: 12px 16px; border-radius: 10px; background: rgba(220,38,38,.08); color: var(--danger); font-size: 14px; text-align: center; }
        /* 结果区:week6 要展示 summary,所以用单列行式卡片(week5 是网格,内容不同布局不同) */
        .results { list-style: none; margin: 0; padding: 0; }
        .show { display: flex; gap: 14px; padding: 14px; border: 1px solid var(--line); border-radius: 12px; transition: box-shadow .15s ease, transform .15s ease; }
        .show + .show { margin-top: 12px; }
        .show:hover { box-shadow: var(--shadow); transform: translateY(-1px); }
        .cover { width: 100px; height: 140px; object-fit: cover; border-radius: 10px; flex-shrink: 0; }
        .cover--placeholder { display: flex; align-items: center; justify-content: center; font-size: 34px; background: var(--brand-soft); }
        .show-name { margin: 0 0 4px; font-size: 18px; }
        .show-meta { margin: 0 0 6px; font-size: 13px; color: var(--ink-2); font-variant-numeric: tabular-nums; /* 评分是数字,用等宽数字对齐 */ }
        .show-summary { margin: 0; font-size: 14px; line-height: 1.7; }
        button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
          .bar button:hover, .show:hover { transform: none; }
        }
      `}</style>

      <p className="eyebrow">Week 6 · TypeScript</p>
      <h1 className="case-title">剧集搜索(TS 版)</h1>
      <p className="case-desc">和 week5 视觉完全同款,对照着看:差异只有类型标注。</p>

      <form className="bar" onSubmit={handleSubmit}>
        {/* 行内写的 onChange 不用标类型:TS 根据 <input> 自动推断出 e 的类型 */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='输入剧名,比如 friends'
        />
        <button type='submit' disabled={loading}>
          {loading ? '搜索中…' : '搜索'}
        </button>
      </form>

      {/* 初始空状态:纯展示,只读已有 state,不新增任何逻辑 */}
      {!searched && !loading && error === '' && (
        <div className="empty">
          <div className="empty-icon">🍿</div>
          <p className="empty-text">输入剧名开始搜索,比如 friends、dark</p>
        </div>
      )}
      {error !== '' && <p className="alert">{error}</p>}
      {searched && !loading && error === '' && shows.length === 0 && (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">没有找到相关剧集</p>
          <p className="empty-text">换个关键词试试?英文剧名命中率更高</p>
        </div>
      )}

      <ul className="results">
        {shows.map((show) => (
          <li className="show" key={show.id}>
            {/* image 的类型是 {...} | null,不先判断直接 show.image.medium 编译不通过 */}
            {show.image !== null ? (
              <img className="cover" src={show.image.medium} alt={show.name} />
            ) : (
              <div className="cover cover--placeholder">🎬</div>
            )}
            <div>
              <h2 className="show-name">{show.name}</h2>
              <p className="show-meta">
                {show.genres.length > 0 ? show.genres.join(' / ') : '未分类'}
                {' · '}
                {show.rating.average !== null ? `评分 ${show.rating.average}` : '暂无评分'}
              </p>
              <p className="show-summary">
                {/* summary 是带 HTML 标签的字符串,也可能是 null,两种情况都要处理 */}
                {show.summary !== null ? show.summary.replace(/<[^>]+>/g, '') : '(暂无简介)'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
