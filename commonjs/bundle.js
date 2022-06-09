/**
 * 以 webpack 为例，看如何实现对 CommonJS 规范的支持。
 * 
 * 我们使用 webpack 构建时，把各个模块的文件内容按照如下格式打包到一个 js 文件中，
 * 因为它是一个立即执行的匿名函数，所以可以在浏览器直接运行。
 */

(function(modules){

    // 模块管理的实现
    const loadModules = {}
    
    /**
     * 加载模块的业务逻辑
     * moudleName  需要加载的模块名
     */
    const require = function(moduleName) {

        // 如果已经加载过，直接返回
        if (loadModules[moduleName]) {
            return loadModules[moduleName].exports
        }

        // 如果没有加载，就生成一个 module, 并缓存到 loadModules 中
        const module = loadModules[moduleName] = {
            moduleName,
            exports: {}
        }

        // 执行加载的模块
        modules[moduleName].call(module.exports, module, module.exports, require)

        return module.exports
    }

    return require('index.js')

})({
    "a.js": function (module, exports, require) {
        // a.js 文件内容
    },
    "b.js": function (module, exports, require) {
        // b.js 文件内容
    },
    "index.js": function (module, exports, require) {
        // index.js 文件内容
    }
})