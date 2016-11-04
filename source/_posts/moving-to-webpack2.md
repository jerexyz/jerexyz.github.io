---
title: 迁移至webpack2
date: 2016-11-04 18:05:06
category: tools
tags:  
---
  
[Webpack2](https://webpack.js.org)很快就要发布了，目前已经到了2.1.0-beta.25了，我也是从2.1.0-beta21开始关注webpack2，类似tree-shaking等等新特性还是比较令人激动的，现在整理一下从webpack1升级到webpack2的过程。  

你也可以查阅[官方的从webpack1至webpack2的文档](https://webpack.js.org/how-to/upgrade-from-webpack-1/)

## 安装webpack2

首先要做的就是安装最新版的webpack，因为目前还不是稳定版，所以安装的时候最好指定确切的版本。目前最新的是2.1.--beta.25:
```
npm install --save-dev webpack@2.1.0-beta.25
```

如果你使用任何其他webpack插件，你应该意识到它们同时也需要更新，例如：[extract-text-webpack-plugin](extract-text-webpack-plugin)

```
npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4
```  
##### module.loaders => module.rules

这并不是一个破坏性的更新，module.loaders 将继续支持，但在未来它将被module.rules 替换。

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

webpack.optimize.OccurenceOrderPlugin 将被默认包含在webpack2当中，所以我们没有必要单独为其配置。

##### Configuring loaders  

在日常工作中我们使用postcss和[postcss-loader](https://github.com/postcss/postcss-loader)通过Webpack装载CSS。postcss 作为顶级属性在webpack当中配置。在webpack2中，这样是不被允许的；我们可以选择为loader配置一个options属性。任何插件，寻找顶级的配置将要被改变为这种风格。  

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

上述对loader配置的变化也使得更容易配置多个loader，以前可以只能通过字符串拼接的形式，现在改为了一个数组，如ExtractTextPlugin：  

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

webpack2 使用Array结合Object来配置loaders，这样就胡i方便很多，我们可以很容易的将上面的配置替换掉。

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

webpack1 我们使用  key query 配置loaders，现在extracttextplugin 可以使用Array配置，而不是只允许字符串形式：

```
// Webpack 2
ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: loaders,
})
```  

##### Stop Babel from compiling ES2015 modules

webpack1 无法解析 es2015 module，所以babel将其转换成CommonJs。webpack2可以解析 es2015 module，并能够消除死代码的基础上使用module，所以建议你告诉Babel不将其转换成CommonJS模块。你可以通过改变babelrc配置实现：  

```
// before
"presets": ["es2015"]

// after
"presets": [
  ["es2015", { "modules": false }]
]
```

此文为本人根据[http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)翻译而来