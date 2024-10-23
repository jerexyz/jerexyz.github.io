---
title: 「微信小程序」开发问题汇总
layout: doc
layoutClass: doc-archive
aside: false
lastUpdated: false
editLink: false
date: 2019-02-26T06:22:49.941Z
---

1. 如何便捷的带上分享参数  

    通过重写微信小程序的`Page`函数,改变`onShareAppMessage`的调用行为,每次调用分享的时候动态拼接上当前用户的分享`ID`  

1. 小程序中不能显示左尖括号？

    用text标签，设置`decode`属性为true,例如一下代码

    ```html
    <text decode>佣金到&lt;会员-收益&gt;中查看</text>
    ```