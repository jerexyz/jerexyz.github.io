---
title: 迁移至webpack2
date: 2016-11-04 18:05:06
category: tools
tags:
---

[Webpack2](https://webpack.js.org)很快就要发布了，目前已经到了 2.1.0-beta.25 了，我也是从 2.1.0-beta21 开始关注 webpack2，类似 tree-shaking 等等新特性还是比较令人激动的，现在整理一下从 webpack1 升级到 webpack2 的过程。

你也可以查阅[官方的从 webpack1 至 webpack2 的文档](https://webpack.js.org/how-to/upgrade-from-webpack-1/)

## 安装 webpack2

首先要做的就是安装最新版的 webpack，因为目前还不是稳定版，所以安装的时候最好指定确切的版本。目前最新的是 2.1.--beta.25:

```
npm install --save-dev webpack@2.1.0-beta.25
```

如果你使用任何其他 webpack 插件，你应该意识到它们同时也需要更新，例如：[extract-text-webpack-plugin](extract-text-webpack-plugin)

```
npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4
```

##### module.loaders => module.rules

这并不是一个破坏性的更新，module.loaders 将继续支持，但在未来它将被 module.rules 替换。

```
// before
modules: {
 loaders: {...}
}

// after
modules: {
 rules: {...}
}
```

##### resolve.modulesDirectories => resolve.modules

另一个重命名的属性，`resolve.modulesDirectories` 被重命名为 `resolve.modules`

```
// before
resolve: {
  modulesDirectories: [...],
}

// after
resolve: {
  modules: [...],
}
```

##### No webpack.optimize.OccurenceOrderPlugin

webpack.optimize.OccurenceOrderPlugin 将被默认包含在 webpack2 当中，所以我们没有必要单独为其配置。

##### Configuring loaders

在日常工作中我们使用 postcss 和[postcss-loader](https://github.com/postcss/postcss-loader)通过 Webpack 装载 CSS。postcss 作为顶级属性在 webpack 当中配置。在 webpack2 中，这样是不被允许的；我们可以选择为 loader 配置一个 options 属性。任何插件，寻找顶级的配置将要被改变为这种风格。

```
// before, in Webpack top level
postcss: {
  plugins: ...
}

// after
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: ...
        }
      },
      'sass-loader'
    ]
  }]
}
```

##### ExtractTextPlugin changes

上述对 loader 配置的变化也使得更容易配置多个 loader，以前可以只能通过字符串拼接的形式，现在改为了一个数组，如 ExtractTextPlugin：

```
// Webpack 1
ExtractTextPlugin.extract(
  'style-loader',
  'css-loader!postcss-loader!sass-loader'
);
```

这样很难工作，如果你不得不配置选项：

```
// Webpack 1
ExtractTextPlugin.extract(
  'style-loader',
  'css-loader?modules-true!postcss-loader!sass-loader'
);
```

webpack2 使用 Array 结合 Object 来配置 loaders，这样就胡 i 方便很多，我们可以很容易的将上面的配置替换掉。

```
// Webpack 2
var loaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true
    }
  },
  {
    loader: 'postcss-loader'
  },
  {
    loader: 'sass-loader'
  }
]
```

webpack1 我们使用 key query 配置 loaders，现在 extracttextplugin 可以使用 Array 配置，而不是只允许字符串形式：

```
// Webpack 2
ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: loaders,
})
```

##### Stop Babel from compiling ES2015 modules

webpack1 无法解析 es2015 module，所以 babel 将其转换成 CommonJs。webpack2 可以解析 es2015 module，并能够消除死代码的基础上使用 module，所以建议你告诉 Babel 不将其转换成 CommonJS 模块。你可以通过改变 babelrc 配置实现：

```
// before
"presets": ["es2015"]

// after
"presets": [
  ["es2015", { "modules": false }]
]
```

此文为本人根据[http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)翻译而来
