module.exports = {
    // "extends": ["eslint:recommended", "plugin:react/recommended"], //官方推荐规则
    "parser": "babel-eslint", //解析器
    "parserOptions":  {
         "ecmaVersion": 6, //用es6
        //  "jsx": true
    },
    // //定义全局变量
    // //true代表允许重写、false代表不允许重写
    // "globals": {
    //     "document": true,
    //     "navigator": true,
    //     "window": true,
    //     "localStorage": true,
    //     "fetch": true,
    //     "Atomics": "readonly",
    //       "SharedArrayBuffer": "readonly"
    // },
       //预定义全局变量
  "env": {
    "es6": true,
    "node": true
  },
    // 0 或'off'：关闭规则。
    // 1 或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
    // 2 或'error'：打开规则，并且作为一个错误（退出码为1，检查不通过）。
    "rules": {
        //  "indent": [2, 4], //缩进4
        //  "semi": [2, "never"],
        //  "linebreak-style": [0, "unix"], // 强制使用一致的换行风格
        //  "no-extra-semi": 0, // 禁止不必要的分号
        //  "no-debugger": 1,// 验证出现debugger语句
        //  "no-unused-vars": 2, // 禁止出现未使用过的变量
        //  "react/display-name": 0,
        //  "react/prop-types":0,
        //  "react/no-string-refs":0,
        //  "keyword-spacing": 2, // 强制在关键字前后使用一致的空格 (前后腰需要)
        //  "no-spaced-func": 2, // 禁止 function 标识符和括号之间出现空格
        //  "space-in-parens": 2, // 强制在圆括号内使用一致的空格
        //  "no-console": 1, // 禁用 console,
        // "curly": [2, "multi-line"], // 强制所有控制语句使用一致的括号风格
        // "array-bracket-spacing": 2, // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        // "block-spacing": 2, // 禁止或强制在单行代码块中使用空格(禁用)
        // "brace-style": 2, // if while function 后面的{必须与if在同一行，java风格。
        // "comma-spacing": 2, // 控制逗号前后的空格
        // "comma-style": 2, //始终将逗号置于行末。
        // "space-infix-ops": 2, // 要求操作符周围有空格
        // "arrow-spacing": 2, //规则在箭头函数的箭头（=>）之前/之后标准化间距样式。
        // "constructor-super": 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        // "no-var": 2, //// 要求使用 let 或 const 而不是 var
        // "no-extra-parens": 2, // 禁止不必要的括号 //(a * b) + c;//报错
        // "no-multiple-empty-lines": [2, { "max": 1, "maxBOF": 0 }], //不允许有连续多行空行。maxBOF,文件开头
        // "operator-linebreak": 0, //对于三元运算符 ? 和 : 与他们所负责的代码处于同一行
        // "camelcase": 2, //对于变量和函数名统一使用驼峰命名法。
        // "eol-last": 2, //文件末尾留一空行。
        // "key-spacing": 2, //键值对当中冒号与值之间要留空白。
        // "no-duplicate-imports": 2, //同一模块有多个导入时一次性写完。
        // "quotes": [2, "double"] 
    }
  }