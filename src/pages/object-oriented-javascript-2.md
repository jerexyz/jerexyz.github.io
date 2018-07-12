---
title: javascript 面向对象编程（继承）
date: 2016-06-06 17:43:01
tags: [面向对象,继承]
category: js
---
### 1. 构造函数继承  

call,apply 可以用来更改函数的作用环境，因此在下面的栗子当中：  
`SuperClass.call(this,id);`就是将子类（SubClass）的变量在父类当中执行一遍，由于父类是给this绑定属性的，因此子类自然也就继承了父类的共有属性。
```
//声明父类
function SuperClass(id) {
    // 引用类型共有属性
    this.books = ['javascript','html','css'];
    // 值类型共有属性
    this.id = id;
}
//父类声明原型方法
SuperClass.prototype.showBooks = function() {
    console.log(this.books);
}
//声明子类
function SubClass(id) {
    //继承父类
    SuperClass.call(this,id);
}

var instance1 = new SubClass(1);
var instance2 = new SubClass(2);

instance1.books.push('html5');
instance2.books.push('css3');

console.log(instance1.books);  // [ 'javascript', 'html', 'css', 'html5' ]
console.log(instance1.id);     // 1

console.log(instance2.books);  // [ 'javascript', 'html', 'css', 'css3' ]
console.log(instance2.id);     // 2

console.log(instance1.showBooks());  // TypeError: instance1.showBooks is not a function
```
由于这种类型的继承没有涉及原型prototype，所以父类的原型方法自然不会被子类继承。
### 2. 组合继承
构造函数式继承是通过在子类的构造函数作用环境中执行一次父类的构造函数来实现，但没有继承prototype，可将构造函数和prototype结合起来。
```
//声明父类
function SuperClass(name){
    this.name = name;
    this.books = ["html","js","css"];
}

SuperClass.prototype.getName = function() {
    console.log(this.name);
}

//声明子类
function SubClass(name, time) {
    SuperClass.call(this, name);
    this.time = time;
}

// 子类原型继承父类
SubClass.prototype = new SuperClass();
//子类原型方法
SubClass.prototype.getTime = function(){
    console.log(this.time);
}

var instance1 = new SubClass('js book',2014);

```
![](/images/oriented/js-oriented-2016-06-06.png)
```
instance1.books.push('html5','css3');
```
`instance1这个实例和instance1.__proto__都各有一个books，这是因为构造函数被调用了两次的缘故。`
![](/images/oriented/js-oriented-2-2016-06-06.png)
优点： 子类实例中更改父类继承下来的引用类型如books，不会影响到其他实例，并且子类实例化过程中又能将参数传递到父类的构造函数中  
缺点： 使用构造函数继承时执行了一遍父类的构造函数，实现子类原型继承时又执行了一次构造函数
### 3. 原型式继承
父类SuperClass不变的属性都可以写入SuperClass.prototype当中，所以可以让SubClass.prototype直接跳过new SuperClass()，直接继承SuperClass.prototype。
```
// 子类原型继承父类
SubClass.prototype = SuperClass.prototype;

console.log(instance1.getName()); //js book
```
优点：效率比较高（不用执行和建立SuperClass的实例了），比较省内存。  
缺点：SubClass.prototype和SuperClass.prototype现在指向了同一个对象，那么任何对SubClass.prototype的修改，都会反映到SuperClasss.prototype。 
**借助原型prototype可以根据已有的对象创建一个新的对象**，同时不必创建新的自定义类型。
```
function inheritObject(o){
    //声明一个过渡函数对象
    function F(){};
    //过渡对象的原型继承父对象
    F.prototype = o;
    //返回过度对象的一个实例，该实例的原型继承了父对象
    return new F();
}

var book = {
    name: "js book",
    alikeBook: ["css book","html Book"]
}

var newBook = inheritObject(book);
```
这种方式由于F过度类的构造函数中无内容，所以开销比较小。
### 4. 寄生组合式继承
创建一个父类原型的副本而不需要调用父类的构造函数。
```
/**
＊ 寄生式继承 继承原型
＊ 传递参数 subClass 子类
＊ 传递参数 superClass 父类
**/
function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype);
    // 修正因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subClass;
    //设置子类的原型
    subClass.prototype = p;
}

// 定义子类
function SuperClass(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
// 定义父类原型方法
SuperClass.prototype.getName = function() {
    console.log(this.name);
}
// 定义子类
function SubClass(name, time) {
    // 构造函数式继承
    SuperClass.call(this, name);
    // 子类新增属性
    this.time = time;
}
// 寄生式继承父类原型
inheritPrototype(SubClass, SuperClass);
// 子类新增原型方法
SubClass.prototype.getTime = function() {
    console.log(this.time);
}

var instance1 = new SubClass("js book", 2014);
var instance2 = new SubClass("css book", 2013);
```