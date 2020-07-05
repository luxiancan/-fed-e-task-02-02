## 规范化标准

### 规范化标准介绍

规范化是我们践行前端工程化中重要的一部分

为什么要有规范会标准？
- 软件开发需要多人协同
- 不同开发者具有不同的编码习惯和喜好
- 不同的喜好会增加项目的维护成本
- 每个项目或者团队需要明确统一的标准

哪里需要规范化标准？
- 代码、文档、甚至是提交日志
- 开发过程中人为编写的成果物
- 代码标准化规范最为重要

实施规范化的方法
- 编码前人为的标准约定
- 通过工具实现 Lint

常见的规范化实现方式
- ESLint 工具使用
- 定制 ESLint 校验规则
- ESLint 对 TypeScript 的支持
- ESLint 结合自动化工具或者 Webpack
- 基于 ESLint 的衍生工具
- StyleLint 工具的使用

### ESLint 介绍

- 最为主流的 JavaScript Lint 工具，检测 JS 代码质量
- ESLint 很容易统一开发者的编码风格
- ESLint 可以帮助开发者提升编码能力

### ESLint 快速上手

- 初始化项目，安装 ESLint 模块为开发依赖 `npm install eslint -D`
- 编写“问题”代码，使用 eslint 执行检测 `npx eslint ./01-prepare.js` 加上参数 `--fix` 可以自动修复格式问题
- 当代码中存在语法错误时，eslint 没法检查问题代码
- 完成 eslint 使用配置

### 结合自动化工具

- 集成之后，ESLint 一定会工作
- 与项目统一，管理更加方便
- 结合 gulp 使用，通过 `.pipe(plugins.eslint())` 让其工作

### ESLint 结合 Webpack

- Webpack 可以通过 loader 机制实现 eslint 的检测工作
- 安装 eslint eslint-loader 
- 在 webpack.config.js 文件配置 eslint-loader 应用在 .js 文件中
- 安装相关插件，如：eslint-plugin-react
- 修改 .eslintrc.js 的配置

### ESLint 检查 TypeScript
- 初始化项目
- 安装 eslint typescript
- 初始化 .eslintrc.js 配置文件，注意当询问 use TypeScript ? 是要选择 yes
- 执行 `npx eslint .\index.ts`

### Stylelint 认识
- 提供默认的代码检查规则
- 提供 CLI 工具，快速调用
- 通过插件支持 Sass Less PostCSS
- 支持 Gulp 或 Webpack 集成

快速上手
- 安装 stylelint `npm i stylelint -D`
- 安装 standard 插件 `npm i stylelint-config-standard -D`
- 创建 .stylelintrc.js 配置文件，并修改 extends 字段
```javascript
module.exports = {
    extends: 'stylelint-config-standard'
}
```
- 执行 `npx stylelint ./index.css`，加上参数 `--fix` 可以自动修复部分格式问题
- 检查 sass 文件，执行 `npm i stylelint-config-sass-guidelines -D`，修改 .stylelintrc.js 文件中的 extends 为数组，添加 sass 插件

### Prettier 的使用

- Prettier 几乎可以完成所有类型文件的格式化工作
- 安装， `npm i prettier -D`
- 检查某个文件并输出检查结果，`npx prettier style.css`
- 检查并格式化某个文件，`npx prettier style.css --write`
- 检查并格式化项目所有文件，`npx prettier . --write`

### ESLint 结合 Git Hooks

Git Hooks
- 代码提交至仓库之前未执行 lint 工作
- 使用 lint 的目的就是保证提交到仓库的代码是没有问题的
- 通过 Git Hooks 在代码提交前强制 lint
- Git Hooks 也称为 git 钩子，每个钩子都对应一个任务
- 通过 shell 脚本可以编写钩子任务触发时要具体执行的操作

快速上手
- 很多前端开发者并不擅长使用 shell
- Husky 可以实现 Git Hooks 的使用需求 `npm i husky -D`，然后在 package.json 中添加如下配置 
```javascript
    "husky": {
        "hooks": {
            "pre-commit": "npm run lint"
        }
    }
```
- 配合 lint-stage 使用，`npm i lint-staged -D`
```javascript
    "lint-staged": {
        "*.js*": [
            "eslint",
            "git add"
        ]
    }
```
