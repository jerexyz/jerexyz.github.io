---
title: nginx部署前端SPA应用实践
date: "2018-02-08T22:12:03.284Z"
---
>随着react，vue的普及，前后端分离之后，多采用nginx为静态服务器，并用nginx对api做反向代理，以实现前端SPA应用的部署。

### nginx location 匹配规则
- ~  波浪线表示执行一个正则匹配，区分大小写
- ~* 表示执行一个正则匹配，不区分大小写
- ^~ 表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
- =  进行普通字符精确匹配
- @  定义一个命名的 location，使用在内部定向时，例如 error_page, try_files

### browserHistory 模式的刷新问题
browserHistory 路由模式下，使用history api可以在前端进行页面跳转，但是刷新的话，就需要对链接进行一个修复（重定向）
我们可以使用nginx 的 `try_files` 来实现：
```nginx
location / {
    root /code/app1/build;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
location ^~ /app {
    alias /code/app2/build;
    index index.html;
    try_files $uri $uri/ /app/index.html;
}
location ^~ /api/ {
  proxy_pass http://api.site;
}
```
webpackDevServer的重定向配置
```javascript
const basename = '/app';
devServer: {
    proxy: {
        '/api': {
            target: 'http://api.site',
            changeOrigin: true,
            secure: false
        }
    },
    publicPath: basename,
    host: HOST,
    port: PORT,
    inline: true,
    historyApiFallback: {
        rewrites: [
            { from: new RegExp(`^${basename}`), to: `${basename}/index.html` },
            { from: /./, to: basename }
        ]
    },
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'build')
}
```

### 多个SPA的部署与重定向
首先约定发布代码目录如下:
```
/publish_webapp/
|-- app1/
    |-- index.html
    |-- static
|-- app2/
    |-- index.html
    |-- static
```
nginx 配置：
```nginx
location ~* ^\/(\w+) {
    root /publish_webapp/;
    index index.html;
    try_files $uri $uri/ $uri/index.html /$1/ /$1/index.html;
}
```

### 开启gzip
```
gzip  on;
gzip_types    text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
```
配合webpack在打包的时候压缩静态文件，使用webpack插件[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)
由于在部署至nginx服务器之前使用了webpack生成了gizp压缩之后的文件，所以就不用使用nginx来压缩静态js了，nginx只需要配置，直接使用gzip之后的文件即可。

配置gzip_static
```
gzip_static on;
```
>The ngx_http_gzip_static_module module allows sending precompressed files with the “.gz” filename extension instead of regular files.
