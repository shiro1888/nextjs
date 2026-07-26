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
    if (!name) return;
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
        .app { max-width: 520px; margin: 40px auto; padding: 0 16px; font-family: system-ui, sans-serif; color: #1f2328; }
        h2 { text-align: center; }
        .bar { display: flex; gap: 8px; margin-bottom: 24px; }
        .bar input { flex: 1; padding: 10px 12px; font-size: 15px; border: 1px solid #d0d7de; border-radius: 6px; outline: none; }
        .bar input:focus { border-color: #0969da; }
        .bar button { padding: 10px 20px; font-size: 15px; border: none; border-radius: 6px; background: #1f883d; color: #fff; cursor: pointer; }
        .bar button:disabled { opacity: 0.6; cursor: not-allowed; }
        .tip { text-align: center; color: #656d76; }
        .tip.err { color: #d1242f; }
        .card { display: flex; gap: 16px; padding: 20px; border: 1px solid #d0d7de; border-radius: 12px; }
        .avatar { width: 90px; height: 90px; border-radius: 50%; flex-shrink: 0; }
        .card h3 { margin: 0 0 6px; }
        .bio { margin: 0 0 6px; color: #656d76; font-size: 14px; }
        .meta { margin: 0 0 10px; font-size: 14px; }
        .card a { color: #0969da; font-size: 14px; }
      `}</style>

      <h2>🔍 GitHub 用户搜索</h2>
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

      {status === 'idle' && <p className="tip">试试搜:torvalds、gaearon、ruanyf</p>}
      {status === 'loading' && <p className="tip">正在请求 GitHub 接口…</p>}
      {status === 'error' && <p className="tip err">{errMsg}</p>}
      {status === 'success' && (
        <div className="card">
          {/* 头像图片来自接口返回的 avatar_url 字段,这正是 fetch 案例要练的 */}
          <img className="avatar" src={user.avatar_url} alt={user.login} />
          <div>
            {/* name 可能为 null(用户没填昵称),用 || 兜底显示登录名 */}
            <h3>{user.name || user.login}</h3>
            {user.bio && <p className="bio">{user.bio}</p>}
            <p className="meta">📦 仓库 {user.public_repos} · 👥 粉丝 {user.followers} · 关注 {user.following}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">去 TA 的 GitHub 主页 →</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
