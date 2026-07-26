/*
  【案例名】井字棋(react.dev 官方经典教程的成品)
  【练什么】组件拆分(Square / Board / Game 三层)、状态提升、
           不可变更新(slice / 展开运算符)、用历史记录实现悔棋
  【怎么运行】
    1. npm create vite@latest my-app -- --template react
    2. cd my-app 然后 npm install
    3. 用本文件内容替换 src/App.jsx
    4. npm run dev,浏览器打开终端提示的地址
  【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
*/
import { useState } from 'react';

// 样式直接写在组件里输出,这样只替换 App.jsx 一个文件就能跑
const css = `
  .game { display: flex; gap: 32px; justify-content: center;
          margin-top: 60px; font-family: sans-serif; }
  .status { margin-bottom: 12px; font-weight: bold; }
  .board-row { display: flex; }
  .square { width: 48px; height: 48px; font-size: 24px; font-weight: bold;
            border: 1px solid #999; background: #fff; cursor: pointer;
            margin: -1px 0 0 -1px; padding: 0; }
  .game-info ol { padding-left: 24px; }
  .game-info button { margin-bottom: 4px; cursor: pointer; }
`;

// 判断赢家:枚举 8 条可能连成一线的下标组合,
// 只要某条线上三格相同且不为空,就返回那个棋子('X' 或 'O'),否则返回 null
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 三横
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 三竖
    [0, 4, 8], [2, 4, 6],            // 两斜
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// ★ 状态提升(第一层):Square 自己不存任何状态。
//   显示什么(value)、点了做什么(onSquareClick)全由父组件 Board 传进来。
//   这样 9 个格子的数据集中在一处,判断胜负才有可能。
const Square = ({ value, onSquareClick }) => (
  <button className='square' onClick={onSquareClick}>{value}</button>
);

// Board 也不存状态,棋盘数据和落子回调都来自更上层的 Game(见下方注释)
const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    // 已有赢家、或这一格已经落过子,直接忽略这次点击
    if (calculateWinner(squares) || squares[i]) return;
    // 不可变更新:先用 slice() 复制一份,在副本上改,
    // 绝不写 squares[i] = 'X' —— 直接改原数组 React 察觉不到变化,
    // 而且会破坏后面的"历史记录悔棋"功能(历史里存的就是这些旧数组)
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  // 没有赢家且 9 格全部填满,就是平局
  const isDraw = !winner && squares.every((s) => s !== null);
  let status;
  if (winner) {
    status = `获胜者:${winner} 🎉`;
  } else if (isDraw) {
    status = '平局!双方握手言和 🤝';
  } else {
    status = `下一步:${xIsNext ? 'X' : 'O'}`;
  }

  // 用两层 map 生成 3x3 棋盘,i = 行号 * 3 + 列号 换算出 0~8 的下标
  return (
    <div>
      <div className='status'>{status}</div>
      {[0, 1, 2].map((row) => (
        <div className='board-row' key={row}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;
            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Game = () => {
  // ★ 状态提升(第二层)发生在这里:
  //   棋盘数据不放在 Square,也不放在 Board,而是一路提升到最顶层的 Game。
  //   原因:悔棋功能需要"每一步的棋盘快照",而快照列表(history)要同时
  //   喂给 Board(显示当前棋盘)和右侧的历史按钮列表,
  //   只有它们共同的父组件 Game 才够得着两边。
  //   口诀:多个组件要共享的状态,提升到它们最近的共同父组件。
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // 这两个值能从已有 state 算出来,就不要再单独建 state(避免数据不同步)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    // 如果悔棋回到了第 2 步再落子,第 3 步之后的"未来"就作废了,
    // 所以只保留 0 ~ currentMove 的历史,再接上新的一步(依然是不可变更新)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  // 悔棋 = 仅仅改变"当前在看第几步",history 本身一步都没丢
  const jumpTo = (move) => setCurrentMove(move);

  return (
    <div className='game'>
      <style>{css}</style>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol start='0'>
          {history.map((squares, move) => (
            // 这个列表只增不减、顺序不变,用 move 下标当 key 是安全的
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move > 0 ? `回到第 ${move} 步` : '回到开局'}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Game;
