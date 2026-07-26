/*
【案例名】剧集搜索(TVMaze 版,免注册免 API key)
【练什么】
  1. 表单 onSubmit + preventDefault 的标准搜索写法(支持回车提交)
  2. 请求四态:loading 加载中 / error 出错 / 空结果 / success 有数据,一个都不能少
  3. 接口字段可能为 null(封面图、评分),渲染前必须兜底,否则整个页面白屏报错
  4. 响应式网格卡片布局:grid + auto-fill,窗口变窄时列数自动减少
【怎么运行】
  1. 终端执行:npm create vite@latest my-app -- --template react
  2. 用本文件内容替换 my-app/src/App.jsx
  3. cd my-app 后执行 npm install,再执行 npm run dev,浏览器打开终端提示的地址
【特别说明】第 5 周主线项目"电影搜索"必须完全自己写!本文件故意换了一个接口
  (TVMaze 搜剧集),你要学的是"表单提交 + 四态渲染 + 网格卡片"这套模式,
  看懂模式即可,禁止把代码照抄到主线项目里。
【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
【UI 说明】本案例使用统一设计系统,令牌含义见注释。
*/
import { useState } from 'react';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [shows, setShows] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认的整页刷新——SPA 处理表单的第一课
    const q = keyword.trim();
    if (!q) return;
    setStatus('loading');
    try {
      // encodeURIComponent 防止空格、中文、& 等特殊字符把 URL 弄坏
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`请求失败,状态码 ${res.status}`);
      const data = await res.json();
      // 接口返回 [{ score, show }, ...],我们只关心里面的 show,用 map 提取出来
      setShows(data.map((item) => item.show));
      setStatus('success');
    } catch (err) {
      setErrMsg(err.message || '网络出错了,稍后再试');
      setStatus('error');
    }
  };

  return (
    <div className="app">
      <style>{`
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
        .app { width: min(720px, 100%); background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 28px 32px; color: var(--ink); }
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
        /* 空状态 / 加载态:居中留白 + 图标,不能光秃秃一行字 */
        .empty { text-align: center; padding: 40px 16px; color: var(--ink-2); }
        .empty-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-title { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: var(--ink); }
        .empty-text { margin: 0; font-size: 14px; }
        .spinner { width: 28px; height: 28px; margin: 0 auto 12px; border-radius: 50%; border: 3px solid var(--brand-soft); border-top-color: var(--brand); animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .alert { margin: 0; padding: 12px 16px; border-radius: 10px; background: rgba(220,38,38,.08); color: var(--danger); font-size: 14px; text-align: center; }
        /* auto-fill + minmax:一行能塞几个 150px 的卡片就塞几个,天然响应式 */
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
        .card { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--card); box-shadow: 0 1px 2px rgba(16,24,40,.05); transition: transform .15s ease, box-shadow .15s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .cover { width: 100%; aspect-ratio: 2 / 3; object-fit: cover; display: block; }
        .placeholder { display: flex; align-items: center; justify-content: center; font-size: 44px; background: var(--brand-soft); }
        .info { padding: 10px 12px; }
        .name { margin: 0 0 6px; font-size: 14px; line-height: 1.4; }
        .meta { margin: 0 0 4px; font-size: 12px; color: var(--ink-2); font-variant-numeric: tabular-nums; }
        button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <header className="case-head">
        <p className="eyebrow">WEEK 5 · 搜索与网格</p>
        <h2 className="case-title">剧集搜索</h2>
        <p className="case-desc">表单提交 + 请求四态 + 响应式网格卡片,TVMaze 接口免 key。</p>
      </header>

      <form className="bar" onSubmit={handleSubmit}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="输入剧名试试,如 friends、office"
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '搜索中…' : '搜索'}
        </button>
      </form>

      {status === 'idle' && (
        <div className="empty">
          <div className="empty-icon">🍿</div>
          <p className="empty-text">搜点什么试试,比如 dark、girls、western</p>
        </div>
      )}
      {status === 'loading' && (
        <div className="empty">
          <div className="spinner" />
          <p className="empty-text">正在搜索…</p>
        </div>
      )}
      {status === 'error' && <p className="alert">{errMsg}</p>}
      {/* 第四态:请求成功但结果为空。必须和"成功有数据"分开处理,否则用户以为页面坏了 */}
      {status === 'success' && shows.length === 0 && (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">没有找到相关剧集</p>
          <p className="empty-text">换个关键词试试?英文剧名命中率更高</p>
        </div>
      )}

      {status === 'success' && shows.length > 0 && (
        <div className="grid">
          {shows.map((show) => (
            <div className="card" key={show.id}>
              {/* 封面可能是 null!直接写 show.image.medium 会报错,把整个页面搞崩,必须兜底 */}
              {show.image ? (
                <img className="cover" src={show.image.medium} alt={show.name} />
              ) : (
                <div className="cover placeholder">🎬</div>
              )}
              <div className="info">
                <h3 className="name">{show.name}</h3>
                <p className="meta">{show.genres.length > 0 ? show.genres.join(' / ') : '未分类'}</p>
                <p className="meta">
                  {/* ?? 空值合并:只在 null / undefined 时用兜底值,0 分不会被误伤 */}
                  ⭐ {show.rating.average ?? '暂无评分'}
                  {' · '}
                  {show.premiered ? show.premiered.slice(0, 4) : '年份未知'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
