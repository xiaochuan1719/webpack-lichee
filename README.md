
![webpack](./build-everything.png)

# Module  

JavaScript 模块化

## 1. 模块化

模块化是一种将 JavaScript 程序拆分，并可按需导入单独模块的一种机制。

> 模块系统主要解决模块的定义、依赖和导出。


## 2. 模块化的意义

```
1. 避免变量冲突和全局污染（每个文件，也就是模块，具有私有的命名空间）
2. 逻辑分离、按需加载，将不同的逻辑拆分放在不同的文件下，同一类逻辑可由一个文件管理
3. 代码复用性、可维护性、可读性
```

## 3. 模块化发展

```
0. 直接写在 <script> 标签里面
1. 基于对象、闭包的模块化 
2. Node.js 时代，CommonJS 规范
3. AMD 规范 (推崇依赖前置)
4. CMD 规范（改进的AMD，推崇就近原则，用到的时候再去加载）
5. ES6 Module 规范
```

### 1. 基于对象的模块化

在 CommonJS 规范出现之前，为了避免全局变量污染，常采用的一种方案就是将一类变量放在一个对象里面，作为对象的属性，使得这些变量私有化

```javascript
let Util = {
    toString: (str) {
        // ...
    },
    formatStr: (str)  {
        // ...
    }
}
let Math = {
    add: (a, b) {
        // return a + b 
    },
    max: () {
        // return max value
    }
}
```

#### 不足之处

```
1. 声明变量就变成了声明对象的一个属性，在对象外面可能会意外覆盖掉同名属性
2. 对象之间可能会覆盖的情况
3. 代码还是在一个文件里面，无法分而自治；随着功能添加，一个文件中的代码量也会越来越大
```

### 2. 基于闭包的模块化

**IIFE**(立即调用函数表达式)是 CommonJS 规范出来之前最典型的模块化方式，大名鼎鼎的 `jQuery` 就是使用的这种模块化方式

```javascript
// IIFE 是一个定义时就会调用的函数，定义一个 IIFE 也很简单
// IIFE 最后一定要加一个分号，表示结束

// 形式一
(function(arg) {
    console.log(arg) // window 对象
    const $ = jQuery = {}
    jQuery.add = (x, y) => {
        //....
    }
})(window);

// 形式二
(function(arg){
    console.log(arg)
    const $ = jQuery = {}
    jQuery.add = (x, y) => {
        // ...
    }
}(window));

// 举个栗子：jquery 包装基本结构
(function(global, factor) {
    // ...
})(window, function(window, noGlobal) {
    // ...
});
```

#### 不足之处

```
1. IIFE 中的变量和函数不可复用
2. 使用不会很方便
3. 难以测试和维护
```

### CommonJS -- Node.js 的模块化

> CommonJS 的出现是为了服务于服务器端的。

> CommonJS 是一个项目，其目标是为 JavaScript 在网页浏览器之外创建模块约定。创建这个项目的主要原因是当时缺乏普遍可接受形式的 JavaScript 脚本模块单元，模块在与运行JavaScript 脚本的常规网页浏览器所提供的不同的环境下可以重复使用。

Node.js 的出现，将 JavaScript 语言带到了服务端，面对文件系统、网络、操作系统等复杂业务场景，模块化不可或缺。 

Node.js 应用由模块组成，每个文件就是一个模块，有私有的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件是不可见的。

```javascript
// 定义一个模块：a.js
const name = "Alpha"
const age = 18

// CommonJS 规范规定，每个模块内部有两个变量可以使用吗，require 和 module

// 将模块中的变量或方法导出
module.exports.name = name
module.exports.getAge = function() {
    return age
}

// 定义一个模块 b.js
// 在模块中使用 a.js 模块中的变量和方法
const a = require('./a.js')
console.log(a.name)
console.log(a.getAge())
```

> `module` 代表当前模块，是一个对象，保存了当前模块的信息。
> `exports` 是 `module` 上的一个属性，保存了当前模块要导出的接口或者变量
> `require` 用来加载某个模块

#### `exports` 

Node.js 在实现 CommonJS 规范时，为每个模块提供了一个 `exports` 的私有变量，指向 `module.exports`。

```javascript
const exports = module.exports
```

如果一个模块对外接口就是一个单一的值，可以直接使用 `module.exports` 导出

```javascript
const name = 'Alpha'
const age = 18
module.exports = name

// 下面的写法是错误的
// exports 虽然是指向 module.exports ,但是不可以直接导出一个变量；如下就是
// 直接修改了 exports 的指向，不在指向 module.exports 了
exports = age
```

#### `require`

`require` 加载某个模块；读入并执行一个 js 文件（模块），然后返回该模块的 exports 对象。如果找不到指定模块，则会报错。

> 模块在第一次加载后被缓存；意味着每次调用 `require` 都会返回完全相同的对象。
> 如果 `require.cache` 没有被修改，则多次调用 `require('a')` 不会导致 a 模块代码被多次执行

### AMD - Asynchronous Module Definition

其典型代表就是 `Require.js`，或者说，AMD 就是 `RequireJS` 在推广过程中的对模块定义的规范化产出。

`RequireJS` 是一个 js 文件和模块加载器，适合在浏览器中，也可以在其他 js 环境中使用，比如 Node、Rhino 等；

`RequireJS`加载模块化脚本能提高代码的加载速度和质量。

