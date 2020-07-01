
## Webpack 打包

打包工具解决的是前端整体的模块化，并不单指 JavaScript 模块化


### webpack 工作模式
mode: 'production',
mode: 'development',
mode: 'none',

### webpack 资源模块加载
- JS file => Default Loader
- Other file => Other Loader

### webpack 导入资源模块
- JavaScript 驱动整个前端应用
- 在 js 中导入相关资源模块，逻辑合理，JS 确实需要这些资源文件
- 确保上线资源不缺失，都是必要的

> 学习一个新事物，不是学会它的所有用法就能提高，掌握新事物的思想才是突破点。能够搞明白这些新事物为什么这样设计，那就基本上算是出道了。

### webpack 文件资源加载器
- JS file => Default Loader => Bundle.js
- 图片、字体等资源文件 => File Loader => 文件路径 => Bundle.js


### webpack URL 加载器
协议 媒体类型和编码 文件内容

data:[<mediatype>][;base64],<data>

data:text/html;charset-UTF-8,<h1>content</h1>

data:image/png;base64,iVBORw0KGg...SuQmCC

最佳实践
- 小文件使用 Data URLs，减少请求次数
- 大文件单独提取存放，提高加载速度

```javascript
{
    test: /.png$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10 * 1024 // 10 KB
        }
    }
}
```
- 超出 10KB 文件单独提取存放
- 小于 10KB 文件转换为 Data URLS 嵌入代码中

### webpack 常用加载器分类
- 编译转换类（css-loader => 以 JS 形式工作的我 CSS 模块）
- 文件操作类（file-loader => 导出文件访问路径）
- 代码检查类（eslint-loader => 检查通过/不通过）


### webpack 加载资源的方式
- 遵循 ES Modules 标准的 import 声明
- 遵循 CommonJS 标准的 require 函数
- 遵循 AMD 标准的 define 函数和 require 函数
- * 样式代码中的 @import 执行和 url 函数
- * HTML 代码中图片标签的 src 属性

### webpack 核心工作原理
Loader 机制是 Webpack 的核心

### webpack 插件机制 

- Loader 专注实现资源模块加载
- Plugin 解决其他自动化工作

Plugin 用途：
- 打包之前清除 dist 目录
- 拷贝静态文件至输出目录
- 压缩输出代码

常用的插件：
- clean-webpack-plugin  打包之前清除 dist 目录
- html-webpack-plugin  用于生成 index.html 文件
- copy-webpack-plugin  拷贝静态文件至输出目录

开发一个插件：插件是通过在生命周期的钩子中挂载函数实现扩展

### 如何增强 webpack 开发体验

- 自动编译
- 自动刷新浏览器
- webpack-dev-server：继承了以上特性的工具

### Source Map
- 运行代码与源代码之间完全不同
- 如果需要调试应用，或者运行应用过程中出现了错误，错误信息无法定位
- 调试和报错都是基于运行代码
- Source Map 解决了源代码与运行代码不一致所产生的问题

### Source Map 的方式

webpack 支持 12 种不同的 source-map 方式，每种方式的效率和效果各不相同

不同 devtool 之间的差异
- eval - 是否使用 eval 执行模块代码
- cheap - Source Map 是否包含行信息
- module - 是否能够得到 Loader 处理之前的源代码

#### 选择合适的 Source Map

开发模式：cheap-module-eval-source-map
- 我的代码每行不会超过 80 个字符
- 我的代码经过 Loader 转换过后的差异较大
- 首次打包速度慢无所谓，重新打包速度较快

生产环境：none / nosources-source-map
- 安全隐患，source-map 会暴露源代码
- 调试是开发阶段的事情
- 没有绝对的选择，理解不同模式的差异，适配不同的环境

### HMR 体验
HMR(Hot Module Replacement): 模块热替换
- 应用运行过程中实时替换某个模块
- 应用运行状态不受影响
- 自动刷新会导致页面状态丢失
- 热替换只将修改的模块实时替换至应用中

#### 开启 HMR
集成在 webpack-dev-server 中
- webpack-dev-server --hot
- 也可以通过配置文件开启

#### HMR 的疑问
- webpack 中的 HMR 并不可以开箱即用
- webpack 中的 HMR 需要手动处理模块热替换逻辑
- 为什么样式文件的热更新开箱即用？因为样式经过了 loader 处理，然后只需要替换掉某段 <style></style> 就可以实现
- 我的项目没有手动处理，JS 照样可以热替换？因为使用了框架，框架下的开发，每种文件都是有规律的
- 通过脚手架创建的项目内部都集成了 HMR 方案

总结：我们需要手动处理 JS 模块更新后的热替换


### Webpack 生产环境优化

- 生产环境跟开发环境有很大差异
- 生产环境注重运行效率，开发环境注重开发效率
- 模式（mode），为不同的工作环境创建不同的配置


### Webpack Tree Shaking
- 尽可能的将所有模块合并输出到一个函数中
- 既提升了运行效率，又减少了代码体积
- Tree Shaking 又被称为 Scope Hoisting 作用域提升

### Webpack Tree Shaking 与 Babel
- Tree Shaking 前提是 ES Modules
- 由 Webpack 打包的代码必须使用 ESM
- 为了转换代码中的 ECMAScript 新特性而使用 babel-loader ，就有可能导致 ESM => CommonJS，这取决我们有没有使用转换 ESM 的插件


### Webpack 代码分割

代码分包
- 所有代码最终都被打包到一起，bundle 体积过大
- 并不是每个模块在启动时都是必要的
- 模块打包是必要的，但是应用越来越大之后，需要进行分包，按需加载
- 有两种方式：多入口打包；ESM 动态导入


#### 多入口打包
- 常用于多页应用程序
- 一个页面对应一个打包入口
- 公共部分单独提取

#### 动态导入
- 按需加载，需要用到某个模块时，再加载这个模块
- 可以极大地节省带宽和流量
- 无需配置任何地方，只需要按照 ESM 动态导入的方式去导入模块，webpack 内部会自动处理分包和按需加载
- 使用单页应用开发框架（React/Vue），在项目中的路由映射组件就可以通过动态导入实现按需加载

#### Webpack 魔法注释
- 使用魔法注释可以为动态导入最终打包出来的文件命名
- 命名相同的模块最终会被打包到一起

#### Webpack 输出文件名 Hash
- 一般我们部署前端资源文件时，都会采用服务器的静态资源缓存
- 开启缓存的问题：缓存时间过短-效果不明显，缓存过期时间较长-应用发生了更新重新部署后客户端因为缓存得不到更新
- 解决上面问题，建议生产模式下，文件名使用 Hash，文件名不同也就是新的请求，解决了缓存的问题，服务器可以将缓存过期时间设置足够长

三种 Hash 方式
- hash: 整个项目级别的，项目中任意一个地方改动，重新打包之后的 hash 值都会改变
- chunkhash: chunk 级别的，同一路的打包 chunkhash 都是相同的
- contenthash: 文件级别的hash，根据文件内容生成的hash值，不同的文件就有不同的值

解决缓存问题的最佳 hash 方式 [contenthash:8]

