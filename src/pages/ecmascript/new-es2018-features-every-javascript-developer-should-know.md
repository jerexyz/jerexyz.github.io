---
title: "【翻译】每个人都应当知道的es2018当中的新特性"
date: 2019-01-14T07:23:05.859Z
---

ECMAScript 标准的第九版，官方称为 ECMAScript 2018（或简称 ES2018），于 2018 年 6 月发布。从 ES2016 开始，ECMAScript 规范的新版本每年发布而不是每几年发布一次，并且添加的功能少于以前的主要版本。
该标准的最新的每年一次的版本添加了四个新的 RegExp 功能，展开语法(Spread syntax)，异步迭代（asynchronous iteration）和 `Promise.prototype.finally`。此外，ES2018 从标记模板中删除了转义序列的语法限制。

1. The Rest/Spread Properties

    ES2015最有趣的功能之一是点差运算符。
    该运算符使复制和合并数组变得更加简单。
    您可以使用...运算符，而不是调用concat（）或slice（）方法：  

    ```js
    const arr1 = [10, 20, 30];
    // make a copy of arr1
    const copy = [...arr1];
    console.log(copy);    // → [10, 20, 30]
    const arr2 = [40, 50];
    // merge arr2 with arr1
    const merge = [...arr1, ...arr2];
    console.log(merge);    // → [10, 20, 30, 40, 50]
    ```
    在必须作为函数的单独参数传入数组的情况下，扩展运算符也能派上用场。例如：  
    ```js
    const arr = [10, 20, 30]
    // equivalent to
    // console.log(Math.max(10, 20, 30));
    console.log(Math.max(...arr));    // → 30
    ```
    ES2018通过向对象文字添加扩展属性来进一步扩展此语法。
    使用`Spread properties`，您可以将对象的自身可枚举属性复制到新对象上。
    请考虑以下示例：
    ```js
    const obj1 = {
      a: 10,
      b: 20
    };
    const obj2 = {
      ...obj1,
      c: 30
    };
    console.log(obj2);    // → {a: 10, b: 20, c: 30}
    ```
    `Spread properties`还提供了一种合并两个或多个对象的新方法，可以将其用作Object.assign（）方法的替代方法：  
    ```js
    const obj1 = {a: 10};
    const obj2 = {b: 20};
    const obj3 = {c: 30};
    // ES2018
    console.log({...obj1, ...obj2, ...obj3});    // → {a: 10, b: 20, c: 30}
    // ES2015
    console.log(Object.assign({}, obj1, obj2, obj3));    // → {a: 10, b: 20, c: 30}
    ```
    但请注意，`spread properties`并不总是产生与`Object.assign（）`相同的结果。请参考一下代码：  
    ```js
    Object.defineProperty(Object.prototype, 'a', {
      set(value) {
        console.log('set called!');
      }
    });
    const obj = {a: 10};
    console.log({...obj});
    // → {a: 10}
    console.log(Object.assign({}, obj));
    // → set called!
    // → {}
    ```
    在此代码中，Object.assign（）方法执行继承的setter属性。
    相反，`Spread properties`完全忽略了setter。
    重要的是，`Spread properties`只复制可枚举的属性。
    在以下示例中，type属性不会出现在复制的对象中，因为其`enumerable`属性设置为false：  
    ```js
    const car = {
      color: 'blue'
    };
    Object.defineProperty(car, 'type', {
      value: 'coupe',
      enumerable: false
    });
    console.log({...car});    // → {color: "blue"}
    ```  
    即使它们是可枚举的，也会忽略继承的属性：  
    ```js
    const car = {
      color: 'blue'
    };
    const car2 = Object.create(car, {
      type: {
        value: 'coupe',
        enumerable: true,
      }
    });
    console.log(car2.color);                      // → blue
    console.log(car2.hasOwnProperty('color'));    // → false
    console.log(car2.type);                       // → coupe
    console.log(car2.hasOwnProperty('type'));     // → true
    console.log({...car2});                       // → {type: "coupe"}
    ```
    在这段代码中，car2继承了汽车的`color`属性。
    由于`Spread properties`仅复制对象的属性，因此返回值中不包含`color`属性。
    请记住，`Spread properties`只能生成对象的浅表副本(shallow copy)。
    如果属性包含对象，则仅复制对象的引用：  
    ```js
    const obj = {x: {y: 10}};
    const copy1 = {...obj};  
    const copy2 = {...obj};
    console.log(copy1.x === copy2.x); // → true
    ```
    copy1 中的 x 属性引用内存中与 copy2 中引用的 x 相同的对象，因此 strict equality 运算符返回 true。
    ES2015 增加的另一个有用功能是 rest 参数，它使 JavaScript 程序员能够使用...将值表示为数组。

    ```js
    const arr = [10, 20, 30];
    const [x, ...rest] = arr;

    console.log(x);       // → 10
    console.log(rest);    // → [20, 30]
    ```

    这里，arr 中的第一个子项分配给 x，其余元素分配给 rest 变量。
    这种称为`rest variable`的模式变得如此受欢迎，以至于 Ecma 技术委员会决定为对象带来类似的功能：

    ```js
    const obj = {
      a: 10,
      b: 20,
      c: 30
    };

    const {a, ...rest} = obj;

    console.log(a);       // → 10
    console.log(rest);    // → {b: 20, c: 30}
    ```

    此代码使用解构赋值中的其余属性将剩余的自身可枚举属性复制到新对象中。
    请注意，rest 属性必须始终出现在对象的末尾，否则会引发错误：

    ```js
    const obj = {
      a: 10,
      b: 20,
      c: 30
    };

    const {...rest, a} = obj;    // → SyntaxError: Rest element must be last element
    ```

    还要记住，在对象中使用多个休止语法(rest syntaxes)会导致错误，除非它们是嵌套的：

    ```js
    const obj = {
      a: 10,
      b: {
        x: 20,
        y: 30,
        z: 40
      }
    };

    const {b: {x, ...rest1}, ...rest2} = obj;    // no error

    const {...rest, ...rest2} = obj;    // → SyntaxError: Rest element must be last element
    ```

   > [new-es2018-features-every-javascript-developer-should-know](https://css-tricks.com/new-es2018-features-every-javascript-developer-should-know/)
