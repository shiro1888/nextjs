/*
  【案例名】React 计数器(useState 最小案例)
  【练什么】useState、onClick 事件、条件渲染(disabled 属性)
  【怎么运行】
    1. npm create vite@latest my-app -- --template react
    2. cd my-app 然后 npm install
    3. 用本文件内容替换 src/App.jsx
    4. npm run dev,浏览器打开终端提示的地址
  【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
  【UI 说明】本案例使用统一设计系统,令牌含义见注释。
*/
import { useState } from 'react';

// 样式直接写在组件里输出,这样只替换 App.jsx 一个文件就能跑
const css = `
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
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  .page { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  .card {
    width: min(360px, 100%);
    background: var(--card);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 28px;
  }
  .eyebrow {
    margin: 0 0 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--brand);
  }
  .title { margin: 0 0 4px; font-size: 21px; font-weight: 700; }
  .subtitle { margin: 0 0 20px; font-size: 14px; color: var(--ink-2); }
  .count {
    margin: 8px 0 20px;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .btn-row { display: flex; gap: 12px; justify-content: center; }
  .btn {
    padding: 10px 18px;
    font: inherit;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    transition: background .15s ease, border-color .15s ease, color .15s ease, transform .15s ease;
  }
  .btn-primary { border: none; background: var(--brand); color: #fff; }
  .btn-primary:hover:not(:disabled) { background: var(--brand-dark); transform: translateY(-1px); }
  .btn-secondary { border: 1px solid var(--line); background: var(--card); color: var(--ink); }
  .btn-secondary:hover:not(:disabled) { border-color: var(--brand); color: var(--brand); transform: translateY(-1px); }
  .btn:focus-visible { outline: 2px solid var(--brand-dark); outline-offset: 2px; }
  /* 禁用态:40% 透明度,并且不再响应 hover */
  .btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
  /* count 为 0 时的提示条:用主色浅底,别是光秃秃一行字 */
  .hint {
    margin: 20px 0 0;
    padding: 8px 12px;
    border-radius: 10px;
    background: var(--brand-soft);
    color: var(--brand-dark);
    font-size: 13px;
    text-align: center;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }
`;

const App = () => {
  // useState(0):0 是初始值;返回 [当前值, 更新函数],这里用的是数组解构
  const [count, setCount] = useState(0);

  // ★ 为什么必须用 setCount,不能直接改 count?
  //   1. count 是 const,直接 count = count + 1 会报错;
  //      就算你换成 let 偷偷改掉了,React 也完全不知道数据变了,界面不会刷新。
  //   2. setCount 做两件事:存下新值 + 通知 React「重新执行一遍 App 函数」。
  //      重新执行时 useState 会返回最新的值,界面才会跟着更新。
  //   一句话:在 React 里,改状态的唯一合法方式就是调用 set 函数。

  return (
    <div className="page">
      <style>{css}</style>
      <div className="card">
        <p className="eyebrow">Week 4 · useState</p>
        <h1 className="title">计数器</h1>
        <p className="subtitle">用 useState 存数字,点按钮触发重新渲染。</p>

        <p className="count">{count}</p>

        <div className="btn-row">
          {/* disabled={count === 0} 就是一种条件渲染:
              值为 0 时表达式是 true,按钮被禁用,防止减到负数 */}
          <button className="btn btn-secondary" disabled={count === 0} onClick={() => setCount(count - 1)}>
            -1
          </button>

          <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
            +1
          </button>

          <button className="btn btn-secondary" onClick={() => setCount(0)}>归零</button>
        </div>

        {/* && 写法的条件渲染:左边为 true 才渲染右边的内容 */}
        {count === 0 && <p className="hint">已经是 0 了,-1 按钮被禁用</p>}
      </div>
    </div>
  );
};

export default App;
