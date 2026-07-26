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
    <main style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1>剧集搜索(TS 版)</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        {/* 行内写的 onChange 不用标类型:TS 根据 <input> 自动推断出 e 的类型 */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='输入剧名,比如 friends'
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button type='submit' disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? '搜索中…' : '搜索'}
        </button>
      </form>

      {error !== '' && <p style={{ color: 'crimson' }}>{error}</p>}
      {searched && !loading && error === '' && shows.length === 0 && <p>没有找到相关剧集。</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {shows.map((show) => (
          <li key={show.id} style={{ display: 'flex', gap: 12, margin: '20px 0' }}>
            {/* image 的类型是 {...} | null,不先判断直接 show.image.medium 编译不通过 */}
            {show.image !== null ? (
              <img
                src={show.image.medium}
                alt={show.name}
                style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  width: 100,
                  height: 140,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                🎬
              </div>
            )}
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: 20 }}>{show.name}</h2>
              <p style={{ margin: '0 0 6px', color: '#888' }}>
                {show.genres.length > 0 ? show.genres.join(' / ') : '未分类'}
                {' · '}
                {show.rating.average !== null ? `评分 ${show.rating.average}` : '暂无评分'}
              </p>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
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
