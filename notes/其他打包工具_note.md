## rollup

### Rollup 概述

- Rollup 与 Webpack作用类似
- Rollup 更为小巧
- 仅仅是一款 ESM 打包器
- Rollup 中并不支持类似 HMR 这种高级特性
- Rollup 的初衷是提供一个充分利用 ESM 各项特性的高效打包器

### Rollup 快速上手

```bash
# 安装依赖
yarn add rollup --dev

# 指定打包的入口文件、打包输出格式、输出结果路径，执行打包
yarn rollup ./src/index.js --format iife --file dist/bundle.js
```

### Rollup 配置文件
- 在项目根目录创建 rollup.config.js

```javascript
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  }
}
```

- 执行命令 `yarn rollup --config` 完成打包，也可以在命令最后跟上文件名

### Rollup 使用插件
- 想加载其他类型的资源模块
- 想导入 CommonJS 模块、编译 ECMAScript 新特性
- Rollup 支持使用插件的方式扩展，插件是 Rollup 唯一扩展途径
- rollup-plugin-json 加载 json 文件的插件
- rollup-plugin-node-resolve 加载 npm 模块的插件
- rollup-plugin-commonjs 加载 CommonJS 模块

### Rollup 代码拆分
使用 Dynamic Imports 动态导入实现模块按需加载，实现代码拆分/分包

rollup.config.js 修改为：
```javascript
export default {
  input: 'src/index.js',
  output: {
    // file: 'dist/bundle.js',
    // format: 'iife'
    dir: 'dist',
    format: 'amd'
  } 
}
```

### Rollup 多入口打包
- 将 rollup.config.js 文件中的 input 改为一个数组 或者 对象
- 对于以 amd 格式输出的文件，不能直接引入到页面上，需要配合 Require.js 这样的库使用

### Rollup VS Webpack 选用原则

优点：
- 输出结果更加扁平
- 自动移除未引用的代码
- 打包结果依然完全可读

缺点：
- 加载非 ESM 的第三方模块比较复杂
- 模块最终都被打包到一个函数中，无法实现 HMR
- 浏览器环境中，代码拆分功能依赖 AMD

选用原则：
- 如果我们正在开发应用程序 => webpack
- 如果我们正在开发框架或者类库 => rollup
- 大多数知名框架 / 库都在使用 rollup
- 社区中希望二者共存，webpack 大而全，rollup 小而美
