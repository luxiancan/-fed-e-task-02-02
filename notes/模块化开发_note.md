
## 模块化开发

当下最重要的前端开发范式，“模块化”是一种思想

### 模块化演变过程

早期在没有工具和规范的情况下，对模块化的落地方式

1. Stage 1 - 文件划分方式
- 污染全局作用域
- 命名冲突
- 无法管理模块依赖关系
- 早期模块化完全依靠约定

2. Stage 2 - 命名空间方式，每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象中
- 模块成员可以被修改

3. Stage 3 - IIFE，使用立即执行函数表达式（Immediately-Invoked Function Expression）为模块提供私有空间


### 模块化规范的出现

模块化标准 + 模块加载器

**CommonJS 规范**
- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过 module.exports 导出成员
- 通过 require 函数载入模块
- CommonJS 是以同步模式加载模块

**AMD(Asynchronous Module Definition), require.js**
- define 函数，定义一个模块
- require 函数，载入一个模块
- 目前绝大多数第三方库都支持 AMD 规范
- AMD 使用起来相对复杂
- 模块 JS 文件请求频繁

**Sea.js + CMD(Common Module Definition)**
- Sea.js，淘宝团队推出的库，类似 CommonJS 规范
- 使用上有点类似 require.js


### 模块化标准规范

模块化的最佳实践
- node.js 环境中，遵循 CommonJS 规范
- 浏览器环境中，遵循 ES Modules 规范

ES Modules 基本特性
- 自动采用严格模式，忽略 'use strict'
- 每个 ESM 模块都是单的私有作用域
- ESM 是通过 CORS 去请求外部 JS 模块的
- ESM 的 script 标签会延迟执行脚本

ES Modules 注意事项
- export {} 这是一个固定的语法，不是 es6 中的对象简写
- import {} 这是一个固定的语法，不是 es6 中的对象解构
- 导出得到的是对值的引用，模块内部修改了值外部也会跟着改变
- 导入的成员是只读的成员

ES Modules 导出和导入
- export 注意有无 default 关键字
- 不能省略文件后缀名，不能省略 ./ 
- 执行某个模块，不需要提取模块中的成员 `import './module.js'`
- 动态导入模块，可以用全局函数 import()


### ES Modules in Node.js

支持情况
- 执行文件时，`node --experimental-modules index.mjs`
- ES Module 中可以导入 CommonJS 模块
- CommonJS 中不能导入 ES Module 模块
- CommonJS 始终只会导出一个默认成员
- 注意 import 不是解构导出对象

与 CommonJS 模块的差异
- ESM 中没有 CommonJS 中的那些模块全局成员了(require module exports __filename __dirname)
- 利用 import 和 url path 模块实现
```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = dirname(__filename);
console.log(__dirname);
```

新版本的 node 进一步支持 ESM
- babel是基于插件机制实现的，核心模块并不会转换代码
- 具体转换代码是通过插件来做的（）
- @babel/preset-env 是一个插件的集合，它包含了最新的JS标准中的所有新特性
- @babel/plugin-transform-modules-commonjs 这才是一个具体的插件
