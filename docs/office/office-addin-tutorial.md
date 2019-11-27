---
title: office插件开发指北
date: 2019-11-27T09:55:00.793Z
category: office
tags:
---

传统的基于excel导入数据繁琐,  

```sequence
Excel->Browser:选择excel文件
Browser->Back End:上传excel文件
Back End->Back End: 解析excel数据
Back End-->Browser: 返回处理结果(成功/失败)
Browser-->Excel:下载返回的excel文件
Excel->Excel:编辑错误数据
Browser->Back End:重新上传编辑好的文件
```
