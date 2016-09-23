---
title: 汉诺塔问题
date: 2016-05-28 01:04:13
category: 算法
tags:
---
```
var hanoi = function (dist,src,aux,dst){
   if(dist > 0){
    hanoi(dist-1,src,dst,aux);
    console.log('move dist ' + Date.now(),dist + ' from ' + src + ' to ' + dst);
    hanoi(dist-1,aux,src,dst);
   }
};
hanoi(2,'From','Aux','To');
move dist 1464368752088 1 from From to Aux
move dist 1464368752089 2 from From to To
move dist 1464368752089 1 from Aux to To
```
![](http://o15iyihnc.qnssl.com/algorithm/hanoi.jpeg-800)