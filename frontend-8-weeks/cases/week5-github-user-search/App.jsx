/*
【案例名】GitHub 用户搜索(练 API 请求三态)
【练什么】
  1. fetch + async/await 请求真实接口
  2. 用一个 status 状态机管理页面:loading 加载中 / error 出错 / success 成功
  3. 根据 HTTP 状态码区分"用户不存在(404)"和其他错误
  4. 三种状态各渲染不同 UI —— 这是所有"请求接口的页面"的通用套路
【怎么运行】
  1. 终端执行:npm create vite@latest my-app -- --template react
  2. 用本文件内容替换 my-app/src/App.jsx
  3. cd my-app 后执行 npm install,再执行 npm run dev,浏览器打开终端提示的地址
【注意】未登录调用 GitHub API,每个 IP 每小时限 60 次;搜太频繁会返回 403,
  这不是你代码写错了,等一小时自然恢复。
【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
【UI 说明】本案例使用统一设计系统,令牌含义见注释。
*/
import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  // 用一个 status 字符串抵三个布尔值:isLoading / isError / isSuccess 分开存容易互相打架,
  // 比如忘了把 isError 重置回 false;而 status 同一时刻只可能是一个值,天然不冲突
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  const handleSearch = async () => {
    const name = input.trim();
    // 双保险:按钮 disabled 只能拦住鼠标点击,输入框里按回车会直接调用本函数,
    // 所以函数入口也要判断"正在加载就不再发",否则会重复请求甚至响应乱序
    if (!name || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch(`https://api.github.com/users/${name}`);
      // fetch 的大坑:404 并不会抛错走 catch,必须自己检查 res.status / res.ok
      if (res.status === 404) {
        setErrMsg(`用户「${name}」不存在,检查一下拼写?`);
        setStatus('error');
        return;
      }
      if (!res.ok) {
        throw new Error(`请求失败(状态码 ${res.status}),可能是超出每小时 60 次的限制`);
      }
      const data = await res.json();
      setUser(data);
      setStatus('success');
    } catch (err) {
      // 走到这里通常是断网,或上面主动 throw 的错误
      setErrMsg(err.message);
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
        .app { width: min(560px, 100%); background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 28px 32px; color: var(--ink); }
        .eyebrow { margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--brand); }
        .case-title { margin: 0 0 4px; font-size: 21px; font-weight: 700; }
        .case-desc { margin: 0; font-size: 14px; color: var(--ink-2); }
        .bar { display: flex; gap: 8px; margin: 20px 0 24px; }
        .bar input { flex: 1; min-width: 0; padding: 10px 12px; font-size: 15px; border: 1px solid var(--line); border-radius: 10px; outline: none; transition: border-color .15s ease, box-shadow .15s ease; }
        .bar input:hover { border-color: #d1d5db; }
        .bar input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(14,159,110,.18); }
        .bar button { padding: 10px 18px; font-size: 15px; border: none; border-radius: 10px; background: var(--brand); color: #fff; cursor: pointer; transition: all .15s ease; }
        .bar button:hover { background: var(--brand-dark); transform: translateY(-1px); }
        .bar button:disabled { opacity: .6; cursor: not-allowed; transform: none; background: var(--brand); }
        /* 空状态 / 加载态:居中留白,不能光秃秃一行字 */
        .empty { text-align: center; padding: 36px 16px; color: var(--ink-2); }
        .empty-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-title { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: var(--ink); }
        .empty-text { margin: 0; font-size: 14px; }
        .spinner { width: 28px; height: 28px; margin: 0 auto 12px; border-radius: 50%; border: 3px solid var(--brand-soft); border-top-color: var(--brand); animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .alert { margin: 0; padding: 12px 16px; border-radius: 10px; background: rgba(220,38,38,.08); color: var(--danger); font-size: 14px; text-align: center; }
        /* 结果名片:左圆头像 + 右信息 */
        .card { display: flex; gap: 18px; padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); }
        .avatar { width: 84px; height: 84px; border-radius: 50%; flex-shrink: 0; border: 3px solid var(--brand-soft); }
        .profile { min-width: 0; }
        .card h3 { margin: 0 0 6px; font-size: 18px; }
        .bio { margin: 0 0 12px; color: var(--ink-2); font-size: 14px; line-height: 1.6; }
        .stats { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .stat { background: var(--brand-soft); border-radius: 10px; padding: 8px 14px; text-align: center; }
        .stat-num { display: block; font-size: 18px; font-weight: 700; color: var(--brand-dark); font-variant-numeric: tabular-nums; }
        .stat-label { font-size: 12px; color: var(--ink-2); }
        .follow { font-size: 13px; color: var(--ink-2); font-variant-numeric: tabular-nums; }
        .card a { color: var(--brand-dark); font-size: 14px; font-weight: 500; text-decoration: none; }
        .card a:hover { text-decoration: underline; }
        button:focus-visible, a:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <header className="case-head">
        <p className="eyebrow">WEEK 5 · API 三态</p>
        <h2 className="case-title">GitHub 用户搜索</h2>
        <p className="case-desc">一个 status 状态机,管好 loading / error / success 三种状态。</p>
      </header>

      <div className="bar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="输入 GitHub 用户名,如 torvalds"
        />
        {/* 加载中禁用按钮,防止用户狂点重复发请求 */}
        <button onClick={handleSearch} disabled={status === 'loading'}>
          {status === 'loading' ? '搜索中…' : '搜索'}
        </button>
      </div>

      {status === 'idle' && (
        <div className="empty">
          <div className="empty-icon">🐙</div>
          <p className="empty-text">试试搜:torvalds、gaearon、ruanyf</p>
        </div>
      )}
      {status === 'loading' && (
        <div className="empty">
          <div className="spinner" />
          <p className="empty-text">正在请求 GitHub 接口…</p>
        </div>
      )}
      {/* 错误态分两种展示:404 的文案里带"不存在",画成居中空状态;其余画成红色提示条。
          这只是渲染层的分支,状态机逻辑没有任何变化 */}
      {status === 'error' && (errMsg.includes('不存在') ? (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">没有找到这个用户</p>
          <p className="empty-text">{errMsg}</p>
        </div>
      ) : (
        <p className="alert">{errMsg}</p>
      ))}
      {status === 'success' && (
        <div className="card">
          {/* 头像图片来自接口返回的 avatar_url 字段,这正是 fetch 案例要练的 */}
          <img className="avatar" src={user.avatar_url} alt={user.login} />
          <div className="profile">
            {/* name 可能为 null(用户没填昵称),用 || 兜底显示登录名 */}
            <h3>{user.name || user.login}</h3>
            {user.bio && <p className="bio">{user.bio}</p>}
            <div className="stats">
              <div className="stat">
                <span className="stat-num">{user.public_repos}</span>
                <span className="stat-label">📦 仓库</span>
              </div>
              <div className="stat">
                <span className="stat-num">{user.followers}</span>
                <span className="stat-label">👥 粉丝</span>
              </div>
              <span className="follow">关注 {user.following}</span>
            </div>
            <a href={user.html_url} target="_blank" rel="noreferrer">去 TA 的 GitHub 主页 →</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
