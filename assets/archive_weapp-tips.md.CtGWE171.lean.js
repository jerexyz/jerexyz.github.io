import{_ as s,c as t,a1 as a,o as e}from"./chunks/framework.BDxlaA_J.js";const r=JSON.parse('{"title":"「微信小程序」开发问题汇总","description":"","frontmatter":{"title":"「微信小程序」开发问题汇总","layout":"doc","layoutClass":"doc-archive","aside":false,"lastUpdated":false,"editLink":false,"date":"2019-02-26T06:22:49.941Z"},"headers":[],"relativePath":"archive/weapp-tips.md","filePath":"archive/weapp-tips.md"}'),l={name:"archive/weapp-tips.md"};function p(h,i,n,d,o,c){return e(),t("div",null,i[0]||(i[0]=[a('<ol><li><p>如何便捷的带上分享参数</p><p>通过重写微信小程序的<code>Page</code>函数,改变<code>onShareAppMessage</code>的调用行为,每次调用分享的时候动态拼接上当前用户的分享<code>ID</code></p></li><li><p>小程序中不能显示左尖括号？</p><p>用text标签，设置<code>decode</code>属性为true,例如一下代码</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">text</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> decode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;佣金到</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&amp;lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">会员-收益</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&amp;gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">中查看&lt;/</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></li></ol>',1)]))}const g=s(l,[["render",p]]);export{r as __pageData,g as default};
