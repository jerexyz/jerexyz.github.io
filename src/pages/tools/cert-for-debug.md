---
title: 微信H5移动端真机调试
date: 2019-04-17T03:20:00.790Z
---

1. mkcert

   ```bash
   Usage of mkcert:

   $ mkcert -install
   Install the local CA in the system trust store.

   $ mkcert example.org
   Generate "example.org.pem" and "example.org-key.pem".

   $ mkcert example.com myapp.dev localhost 127.0.0.1 ::1
   Generate "example.com+4.pem" and "example.com+4-key.pem".

   $ mkcert "*.example.it"
   Generate "_wildcard.example.it.pem" and "_wildcard.example.it-key.pem".

   $ mkcert -uninstall
   Uninstall the local CA (but do not delete it).
   ```

Advanced options:

    -cert-file FILE, -key-file FILE, -p12-file FILE
        Customize the output paths.

    -client
        Generate a certificate for client authentication.

    -ecdsa
        Generate a certificate with an ECDSA key.

    -pkcs12
        Generate a ".p12" PKCS #12 file, also know as a ".pfx" file,
        containing certificate and key for legacy applications.

    -csr CSR
        Generate a certificate based on the supplied CSR. Conflicts with
        all other flags and arguments except -install and -cert-file.

    -CAROOT
        Print the CA certificate and key storage location.

    $CAROOT (environment variable)
        Set the CA certificate and key storage location. (This allows
        maintaining multiple local CAs in parallel.)

    $TRUST_STORES (environment variable)
        A comma-separated list of trust stores to install the local
        root CA into. Options are: "system", "java" and "nss" (includes
        Firefox). Autodetected by default.
    ```

1. 安装`anyproxy`

```
npm install -g anyproxy
```

2. 配置`anyproxy`证书

```
anyproxy-ca #生成rootCA证书，生成后需要手动信任
// anyproxy --intercept #启动AnyProxy，并解析所有https请求
node config/ssl/proxy.js #启动代理
```

[如何信任证书](http://anyproxy.io/cn/#%E8%AF%81%E4%B9%A6%E9%85%8D%E7%BD%AE)

3. 配置 webpackDevServer 的证书
   将`config/ssl/server.pem` 覆盖至 `/gmall/node_modules/webpack-dev-server/ssl`
   修改`/af-webpack/lib/dev.js` 添加

```javascript
const serverConfig = {
  disableHostCheck: true,
  compress: true,
  clientLogLevel: 'none',
  hot: true,
  quiet: true,
  https: true,
  headers: {
    'access-control-allow-origin': '*',
  },
  publicPath: webpackConfig.output.publicPath,
  watchOptions: {
    ignored: /node_modules/,
  },
  historyApiFallback,
  overlay: false,
  host: HOST,
  proxy,
}
```

4. 安装`config/ssl/CA.crt` 至需要代理的手机

5) 修改手机 wifi 代理至`本机IP:8001`

6) 配置 host `127.0.0.1 test.niubi.com`

1. `anyproxy`

```js
/* eslint-disable */
const AnyProxy = require('anyproxy')

const options = {
  port: 8001,
  webInterface: {
    enable: true,
    webPort: 8002,
  },
  throttle: 10000,
  forceProxyHttps: true,
  wsIntercept: true, // 不开启websocket代理
  silent: false,
  dangerouslyIgnoreUnauthorized: true,
}
const proxyServer = new AnyProxy.ProxyServer(options)

proxyServer.on('ready', () => {
  /* */
})
proxyServer.on('error', e => {
  /* */
})
proxyServer.start()
```

注意：
被代理手机需要安装并信任两个证书，一个是 anyproxy 的，一个是`config/ssl/CA.crt`

> [change-webpack-certificate](http://blog.acwong.org/2016/03/05/change-webpack-certificate/)

[mkcert](https://github.com/FiloSottile/mkcert)
