(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{351:function(e,a,s){"use strict";s.r(a);var t=s(0),r=Object(t.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[s("a",{attrs:{href:"https://webpack.js.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Webpack2"),s("OutboundLink")],1),e._v("很快就要发布了，目前已经到了 2.1.0-beta.25 了，我也是从 2.1.0-beta21 开始关注 webpack2，类似 tree-shaking 等等新特性还是比较令人激动的，现在整理一下从 webpack1 升级到 webpack2 的过程。")]),e._v(" "),s("p",[e._v("你也可以查阅"),s("a",{attrs:{href:"https://webpack.js.org/how-to/upgrade-from-webpack-1/",target:"_blank",rel:"noopener noreferrer"}},[e._v("官方的从 webpack1 至 webpack2 的文档"),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"安装-webpack2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-webpack2"}},[e._v("#")]),e._v(" 安装 webpack2")]),e._v(" "),s("p",[e._v("首先要做的就是安装最新版的 webpack，因为目前还不是稳定版，所以安装的时候最好指定确切的版本。目前最新的是 2.1.--beta.25:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("npm install --save-dev webpack@2.1.0-beta.25\n")])])]),s("p",[e._v("如果你使用任何其他 webpack 插件，你应该意识到它们同时也需要更新，例如："),s("a",{attrs:{href:"extract-text-webpack-plugin"}},[e._v("extract-text-webpack-plugin")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4\n")])])]),s("h5",{attrs:{id:"module-loaders-module-rules"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#module-loaders-module-rules"}},[e._v("#")]),e._v(" module.loaders => module.rules")]),e._v(" "),s("p",[e._v("这并不是一个破坏性的更新，module.loaders 将继续支持，但在未来它将被 module.rules 替换。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// before\nmodules: {\n loaders: {...}\n}\n\n// after\nmodules: {\n rules: {...}\n}\n")])])]),s("h5",{attrs:{id:"resolve-modulesdirectories-resolve-modules"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resolve-modulesdirectories-resolve-modules"}},[e._v("#")]),e._v(" resolve.modulesDirectories => resolve.modules")]),e._v(" "),s("p",[e._v("另一个重命名的属性，"),s("code",[e._v("resolve.modulesDirectories")]),e._v(" 被重命名为 "),s("code",[e._v("resolve.modules")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// before\nresolve: {\n  modulesDirectories: [...],\n}\n\n// after\nresolve: {\n  modules: [...],\n}\n")])])]),s("h5",{attrs:{id:"no-webpack-optimize-occurenceorderplugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#no-webpack-optimize-occurenceorderplugin"}},[e._v("#")]),e._v(" No webpack.optimize.OccurenceOrderPlugin")]),e._v(" "),s("p",[e._v("webpack.optimize.OccurenceOrderPlugin 将被默认包含在 webpack2 当中，所以我们没有必要单独为其配置。")]),e._v(" "),s("h5",{attrs:{id:"configuring-loaders"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuring-loaders"}},[e._v("#")]),e._v(" Configuring loaders")]),e._v(" "),s("p",[e._v("在日常工作中我们使用 postcss 和"),s("a",{attrs:{href:"https://github.com/postcss/postcss-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("postcss-loader"),s("OutboundLink")],1),e._v("通过 Webpack 装载 CSS。postcss 作为顶级属性在 webpack 当中配置。在 webpack2 中，这样是不被允许的；我们可以选择为 loader 配置一个 options 属性。任何插件，寻找顶级的配置将要被改变为这种风格。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// before, in Webpack top level\npostcss: {\n  plugins: ...\n}\n\n// after\nmodule: {\n  rules: [{\n    test: /\\.scss$/,\n    use: [\n      {\n        loader: 'postcss-loader',\n        options: {\n          plugins: ...\n        }\n      },\n      'sass-loader'\n    ]\n  }]\n}\n")])])]),s("h5",{attrs:{id:"extracttextplugin-changes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#extracttextplugin-changes"}},[e._v("#")]),e._v(" ExtractTextPlugin changes")]),e._v(" "),s("p",[e._v("上述对 loader 配置的变化也使得更容易配置多个 loader，以前可以只能通过字符串拼接的形式，现在改为了一个数组，如 ExtractTextPlugin：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// Webpack 1\nExtractTextPlugin.extract(\n  'style-loader',\n  'css-loader!postcss-loader!sass-loader'\n);\n")])])]),s("p",[e._v("这样很难工作，如果你不得不配置选项：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// Webpack 1\nExtractTextPlugin.extract(\n  'style-loader',\n  'css-loader?modules-true!postcss-loader!sass-loader'\n);\n")])])]),s("p",[e._v("webpack2 使用 Array 结合 Object 来配置 loaders，这样就胡 i 方便很多，我们可以很容易的将上面的配置替换掉。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// Webpack 2\nvar loaders = [\n  {\n    loader: 'css-loader',\n    options: {\n      modules: true\n    }\n  },\n  {\n    loader: 'postcss-loader'\n  },\n  {\n    loader: 'sass-loader'\n  }\n]\n")])])]),s("p",[e._v("webpack1 我们使用 key query 配置 loaders，现在 extracttextplugin 可以使用 Array 配置，而不是只允许字符串形式：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// Webpack 2\nExtractTextPlugin.extract({\n  fallbackLoader: 'style-loader',\n  loader: loaders,\n})\n")])])]),s("h5",{attrs:{id:"stop-babel-from-compiling-es2015-modules"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stop-babel-from-compiling-es2015-modules"}},[e._v("#")]),e._v(" Stop Babel from compiling ES2015 modules")]),e._v(" "),s("p",[e._v("webpack1 无法解析 es2015 module，所以 babel 将其转换成 CommonJs。webpack2 可以解析 es2015 module，并能够消除死代码的基础上使用 module，所以建议你告诉 Babel 不将其转换成 CommonJS 模块。你可以通过改变 babelrc 配置实现：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('// before\n"presets": ["es2015"]\n\n// after\n"presets": [\n  ["es2015", { "modules": false }]\n]\n')])])]),s("p",[e._v("此文为本人根据"),s("a",{attrs:{href:"http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/"),s("OutboundLink")],1),e._v("翻译而来")])])}),[],!1,null,null,null);a.default=r.exports}}]);