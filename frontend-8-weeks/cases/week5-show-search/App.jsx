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
        .app { max-width: 960px; margin: 32px auto; padding: 0 16px; font-family: system-ui, sans-serif; color: #222; }
        h2 { text-align: center; }
        .bar { display: flex; gap: 8px; max-width: 480px; margin: 0 auto 28px; }
        .bar input { flex: 1; padding: 10px 14px; font-size: 15px; border: 1px solid #ccc; border-radius: 8px; outline: none; }
        .bar input:focus { border-color: #e50914; }
        .bar button { padding: 10px 22px; font-size: 15px; border: none; border-radius: 8px; background: #e50914; color: #fff; cursor: pointer; }
        .bar button:disabled { opacity: 0.6; cursor: not-allowed; }
        .tip { text-align: center; color: #888; }
        .tip.err { color: #e50914; }
        /* auto-fill + minmax:一行能塞几个 160px 的卡片就塞几个,天然响应式 */
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
        .card { border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .cover { width: 100%; height: 220px; object-fit: cover; display: block; }
        .placeholder { display: flex; align-items: center; justify-content: center; font-size: 48px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .info { padding: 10px 12px; }
        .name { margin: 0 0 6px; font-size: 15px; }
        .meta { margin: 0 0 4px; font-size: 12px; color: #888; }
      `}</style>

      <h2>📺 剧集搜索</h2>
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

      {status === 'idle' && <p className="tip">搜点什么试试,比如 dark、girls、western</p>}
      {status === 'loading' && <p className="tip">正在搜索…</p>}
      {status === 'error' && <p className="tip err">{errMsg}</p>}
      {/* 第四态:请求成功但结果为空。必须和"成功有数据"分开处理,否则用户以为页面坏了 */}
      {status === 'success' && shows.length === 0 && (
        <p className="tip">没有找到相关剧集,换个关键词试试</p>
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
