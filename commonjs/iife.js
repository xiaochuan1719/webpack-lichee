
// 如果向一个立即执行函数提供 `require`、`exports`、`module` 三个参数，模块代码放在这个立即执行函数里面。
// 模块的导出值放在 `module.exports` 中，这样就实现了模块的加载。

(function(module, exports, require) {
    const a = require('moduleA.js')
    console.log("a.name =", a.name)
    console.log("a.age =", a.getAge())

    const name = "HanMeimei"
    const age = 16
    exports.name = name
    exports.getAge = function() {
        return age
    }

})(module, module.exports, require);