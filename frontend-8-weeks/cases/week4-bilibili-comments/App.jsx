/*
【案例名】B 站评论区(经典列表渲染案例)
【练什么】
  1. useState 管理评论列表,用 map 渲染列表
  2. 不可变更新:点赞用 map、删除用 filter,永远返回新数组,禁止直接改旧 state
  3. 条件渲染:只有自己的评论才显示删除按钮
  4. 派生状态:排序结果由 tab + list 现场算出来,不需要再存一份 state
【怎么运行】
  1. 终端执行:npm create vite@latest my-app -- --template react
  2. 用本文件内容替换 my-app/src/App.jsx
  3. cd my-app 后执行 npm install,再执行 npm run dev,浏览器打开终端提示的地址
【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
*/
import { useState } from 'react';

// 当前登录用户写死:真实项目里来自登录接口,这里只为演示"判断评论是不是我发的"
const currentUser = { uid: 30009257, name: '黑马前端' };

// 内置评论数据。time 用 '年-月-日 时:分:秒' 格式,好处是直接按字符串比较就能比出先后
const defaultList = [
  { id: 1, uid: 30009257, author: '黑马前端', content: '哎哟,不错哦', like: 88, time: '2026-07-24 09:05:00' },
  { id: 2, uid: 21306830, author: '御剑飞行', content: '前端 yyds,学起来!', like: 130, time: '2026-07-23 11:29:51' },
  { id: 3, uid: 10086233, author: '晓看天色', content: '博主讲得太细了,收藏了', like: 66, time: '2026-07-25 08:55:00' },
  { id: 4, uid: 92700577, author: 'Kobayashi', content: '第一遍没看懂,二刷终于会了', like: 53, time: '2026-07-25 22:02:10' },
  { id: 5, uid: 88240321, author: '阿黄', content: '来晚了,前排占座', like: 2, time: '2026-07-26 07:40:33' },
];

// 没有头像图片,就用"彩色圆圈 + 名字首字"代替;颜色按 uid 取模,同一个人永远同色
const colors = ['#fb7299', '#00aeec', '#ffb027', '#9499a0', '#67c23a'];
const avatarColor = (uid) => colors[uid % colors.length];

const App = () => {
  const [list, setList] = useState(defaultList);
  // 我点过赞的评论 id 列表:点没点过是"我"的状态,不属于评论数据本身,所以单独存
  const [likedIds, setLikedIds] = useState([]);
  const [tab, setTab] = useState('hot'); // 'hot' 最热 | 'new' 最新

  const handleLike = (id) => {
    const liked = likedIds.includes(id);
    // 关键:不可变更新!不能写 item.like++,那是直接改旧 state,React 不一定重新渲染。
    // 正确做法:map 返回一个新数组,要改的那一项用 {...item} 复制后再覆盖 like 字段
    setList(list.map((item) => (
      item.id === id ? { ...item, like: item.like + (liked ? -1 : 1) } : item
    )));
    // 同理:数组禁止 push,用展开语法 / filter 生成新数组
    setLikedIds(liked ? likedIds.filter((i) => i !== id) : [...likedIds, id]);
  };

  const handleDelete = (id) => {
    if (!window.confirm('确定删除这条评论吗?')) return;
    // filter 天生返回新数组,是"不可变删除"的标准写法
    setList(list.filter((item) => item.id !== id));
  };

  // 排序结果是"算出来的",不用 useState 存。
  // 注意:sort 会原地修改数组,所以必须先 [...list] 复制一份再排(依然是不可变原则)
  const sortedList = [...list].sort((a, b) => (
    tab === 'hot' ? b.like - a.like : b.time.localeCompare(a.time)
  ));

  return (
    <div className="app">
      <style>{`
        .app { max-width: 640px; margin: 24px auto; padding: 0 16px; font-family: system-ui, sans-serif; color: #18191c; }
        .head { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #e3e5e7; padding-bottom: 12px; }
        .head h3 { margin: 0; font-size: 18px; }
        .count { color: #9499a0; font-size: 13px; }
        .tabs { margin-left: auto; display: flex; gap: 4px; }
        .tabs button { border: none; background: none; padding: 4px 10px; cursor: pointer; font-size: 14px; color: #61666d; }
        .tabs button.active { color: #00aeec; font-weight: 700; }
        .item { display: flex; gap: 12px; padding: 16px 0; border-bottom: 1px solid #f1f2f3; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .body { flex: 1; }
        .author { font-size: 13px; color: #61666d; margin-bottom: 4px; }
        .mine { color: #fb7299; border: 1px solid #fb7299; border-radius: 4px; font-size: 11px; padding: 0 4px; margin-left: 6px; }
        .content { font-size: 15px; line-height: 1.6; margin: 0; }
        .foot { margin-top: 6px; font-size: 13px; color: #9499a0; display: flex; gap: 16px; align-items: center; }
        .foot button { border: none; background: none; cursor: pointer; color: #9499a0; font-size: 13px; padding: 0; }
        .foot button.liked { color: #00aeec; }
        .foot button.del:hover { color: #fb7299; }
      `}</style>

      <div className="head">
        <h3>评论</h3>
        <span className="count">{list.length} 条</span>
        <div className="tabs">
          <button className={tab === 'hot' ? 'active' : ''} onClick={() => setTab('hot')}>最热</button>
          <button className={tab === 'new' ? 'active' : ''} onClick={() => setTab('new')}>最新</button>
        </div>
      </div>

      {sortedList.map((item) => (
        // key 必须用稳定唯一的 id,不能用索引:删除一条后索引会整体前移,React 会认错人
        <div className="item" key={item.id}>
          <div className="avatar" style={{ background: avatarColor(item.uid) }}>
            {item.author[0]}
          </div>
          <div className="body">
            <div className="author">
              {item.author}
              {item.uid === currentUser.uid && <span className="mine">我</span>}
            </div>
            <p className="content">{item.content}</p>
            <div className="foot">
              <span>{item.time}</span>
              <button
                className={likedIds.includes(item.id) ? 'liked' : ''}
                onClick={() => handleLike(item.id)}
              >
                👍 {item.like}
              </button>
              {/* 条件渲染:uid 和当前登录用户相同,才是我的评论,才允许删除 */}
              {item.uid === currentUser.uid && (
                <button className="del" onClick={() => handleDelete(item.id)}>删除</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
