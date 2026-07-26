/*
  【案例名】React 计数器(useState 最小案例)
  【练什么】useState、onClick 事件、条件渲染(disabled 属性)
  【怎么运行】
    1. npm create vite@latest my-app -- --template react
    2. cd my-app 然后 npm install
    3. 用本文件内容替换 src/App.jsx
    4. npm run dev,浏览器打开终端提示的地址
  【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
*/
import { useState } from 'react';

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
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '80px' }}>
      <h1>计数器</h1>
      <p style={{ fontSize: '48px', margin: '16px 0' }}>{count}</p>

      {/* disabled={count === 0} 就是一种条件渲染:
          值为 0 时表达式是 true,按钮被禁用,防止减到负数 */}
      <button disabled={count === 0} onClick={() => setCount(count - 1)}>
        -1
      </button>

      <button style={{ margin: '0 12px' }} onClick={() => setCount(count + 1)}>
        +1
      </button>

      <button onClick={() => setCount(0)}>归零</button>

      {/* && 写法的条件渲染:左边为 true 才渲染右边的内容 */}
      {count === 0 && <p style={{ color: '#999' }}>已经是 0 了,-1 按钮被禁用</p>}
    </div>
  );
};

export default App;
