---
title: javascript 面向对象编程（封装）
date: 2016-05-22 10:46:23
category: js
tags: [面向对象,封装]
---
面向对象编程就是将你的需求抽象成一个对象，然后针对这个对象分析其特性（属性）与动作（方法）。这个对象我们称之为类。面向对象编程思想其中有一个特点就是封装，就是说把你需要的功能放到一个对象里。  

### 1. javascript 当中的 prototype  

在js当中，constructor属性是专门为function而设计的，她存在于**每一个function**的**prototype属性中**。constructor保存了指向function的一个引用。同时，实例化（new 操作符）的book的__proto__ 属性是函数prototype的一个内部引用 

```
var Book = function(id,bookname,price) {
    this.id = id;
    this.bookname = bookname;
    this.price = price;
}

Book.prototype.display = function(){
        console.log(this.bookname);
    }

var book = new Book(10,'javascript ',55);

console.log(book.__proto__.constructor === Book) //true
console.log(Book.prototype.constructor === Book) //true
console.log(Book.prototype.isPrototypeOf(book))  //true
```
在上面的代码当中，如果写成
```
Book.prototype = {
    display: function(){
        cosole.log('display');       
    }
}

console.log(Book.prototype.constructor === Book) //false
```
因为constructor被覆盖掉了，针对这种情况，可以按照这种方式去写：  
```
Book.prototype = {
    constructor:Book,
    display: function(){
        cosole.log('display');       
    }
}

console.log(Book.prototype.constructor === Book) //true
```
### 2. 验证prototype属性  

`isPrototypeOf()` 这个方法用来判断某个prototype对象与某个实例的关系
```
console.log(Book.prototype.isPrototypeOf(book)) //true
```
`hasOwnProperty()` 每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype的属性。
```
book.hasOwnProperty('id'); //true
book.hasOwnProperty('display'); //false
```
in 运算符 可以用来判断某个实例是否含有某个属性，不管是不是本地属性。
```
console.log('id' in book); //true
console.log('display' in book) //true
```
in 运算符还可以用来遍历某个对象的所有属性
```
for(var prop in book){
    console.log("book["+ prop +"]="+book[prop]);
}
/**
book[id]=10
book[bookname]=javascript 
book[price]=55
book[display]=function (){
    console.log(this.bookname);
}
**/
```
### 3. 闭包实现一个完整的类
有时候我们经常将类的静态变量通过闭包来实现
```
var Book = (function(){
    //静态私有变量
    var bookNum = 0;
    //静态私有方法
    function checkBook(name){
        console.log(name);
    }
    //创建类
    function _book(newId,newName,newPrice){
        // 私有变量
        var name,price;
        function checkID(id){}
        //特权方法
        this.getName = function(){}
        this.getPrice = function(){}
        this.setName = function(){}
        this.setPrice = function(){}
        //公有属性
        this.id = newId;
        //公有方法
        this.copy = function(){}
        bookNum ++;
        if(bookNum > 100){
            throw new Error('我们仅出版100本书');
        }
        this.setName(name);
        this.setPrice(price);
    }
    
    _book.prototype = {
        isJSbook :false,
        display: function(){}
    }
    
    return _book;
})();
```
闭包有权访问另外一个函数作用域中的变量的函数，即在一个函数内部创建另外一个函数。我们将这个闭包作为创建对象的构造函数，这样它既是闭包又是可实例对象的函数，即可以访问到类函数作用域中的变量（booknum，checkBook）。  
同时在闭包内部实现了原型属性和方法，最终得以返回一个完整的类。