/**
 * 【案例名】通讯录 TypeScript 重构
 * 【练什么】
 *   1. 用 interface 描述数据结构,可选属性写法 email?: string;
 *   2. 给每个函数写完整的参数类型和返回值类型;
 *   3. 联合类型 Contact | undefined:查找可能失败,调用方必须先判断再使用;
 *   4. 全程不出现 any。
 * 【怎么运行】
 *   方式一:在本文件所在目录执行 npx tsx contacts.ts(需要已安装 Node.js);
 *   方式二:把整个文件粘到 https://www.typescriptlang.org/play,
 *          右侧看运行结果,鼠标悬停在变量上可以看到 TS 推断出的类型。
 * 【使用规则】必须自己先写完并让 AI 验收后,才能打开本文件对照。
 */

// 一条联系人长什么样,先用 interface 说清楚。
// email 后面的问号表示"可有可无":没填邮箱的联系人也是合法的 Contact。
interface Contact {
  name: string;
  phone: string;
  email?: string;
}

// 添加联系人:返回一个"新数组",不去修改传进来的原数组。
// 养成不可变的习惯,第 5 周学 React 的 setState 时会直接受益。
const addContact = (list: Contact[], contact: Contact): Contact[] => {
  return [...list, contact];
};

// 删除联系人:手机号是唯一的,按手机号过滤掉那一条。
const removeContact = (list: Contact[], phone: string): Contact[] => {
  return list.filter((c) => c.phone !== phone);
};

// 查找联系人:名字或手机号里包含关键字就算命中。
// find 找不到时返回 undefined,所以返回类型必须写成 Contact | undefined,
// 这就是联合类型——它逼着调用方先排除 undefined 才能访问 .name。
const searchContact = (list: Contact[], keyword: string): Contact | undefined => {
  return list.find((c) => c.name.includes(keyword) || c.phone.includes(keyword));
};

// 把一条联系人拼成一行文字。email 是可选属性,类型是 string | undefined,
// 用 ?? 提供兜底文案,比 if 判断更顺手。
const formatContact = (c: Contact): string => {
  return `${c.name} | ${c.phone} | ${c.email ?? '(未填邮箱)'}`;
};

// 统计填了邮箱的人数:先 filter 再取 length。
const countWithEmail = (list: Contact[]): number => {
  return list.filter((c) => c.email !== undefined).length;
};

// 把所有名字用顿号连起来,练 reduce:acc 是累计结果,c 是当前联系人。
const joinNames = (list: Contact[]): string => {
  return list.reduce((acc, c) => (acc === '' ? c.name : `${acc}、${c.name}`), '');
};

// ---------------- 下面是演示调用 ----------------

// book 会被反复"换成新数组",所以用 let;类型标注 Contact[] 让空数组不再模糊。
let book: Contact[] = [];

book = addContact(book, { name: '张三', phone: '13800000001', email: 'zhangsan@qq.com' });
book = addContact(book, { name: '李四', phone: '13800000002' });
book = addContact(book, { name: '王五', phone: '13800000003', email: 'wangwu@163.com' });

console.log('=== 当前通讯录 ===');
book.map(formatContact).forEach((line) => console.log(line));

// found 的类型是 Contact | undefined。
// 如果不先判断就直接写 found.name,TS 会在编译期报错——这正是联合类型的价值。
const found = searchContact(book, '李');
if (found !== undefined) {
  console.log(`搜"李"找到了:${formatContact(found)}`);
} else {
  console.log('搜"李"没找到');
}

const missing = searchContact(book, '赵六');
console.log('搜"赵六"的结果:', missing); // undefined,说明没这个人

console.log(`填了邮箱的人数:${countWithEmail(book)} / ${book.length}`);
console.log(`全部联系人:${joinNames(book)}`);

book = removeContact(book, '13800000002');
console.log(`删除李四后还剩 ${book.length} 人:${joinNames(book)}`);
