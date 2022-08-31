module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    // 新增这里vue3支持
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    },
    parser: "vue-eslint-parser",

  },
  plugins: ['vue'],
  rules: {
    //要求使用 === 和 !==
    "eqeqeq": "warn",
    // 设置标签的自闭和
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always",

    }],
    // 关闭指定每行多少个属性
    "vue/max-attributes-per-line": "off",
    // 单行元素内是否换行
    "vue/singleline-html-element-content-newline": "off",
    // promise 规定 reject 返回必须是 Error对象
    "prefer-promise-reject-errors": "error",
    // 禁止文件末尾保留一行空行
    "eol-last": "off",
    // 禁止v-model在自定义组件中添加参数
    "vue/no-v-model-argument": "off",
    // 自定义组件名的大小写 MyComponent
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    // 多词组件名称
    "vue/multi-word-component-names": "off",
    // 不允许在行尾添加随尾空白
    "no-trailing-spaces": "off",
    // v-for key不能放子元素上
    "vue/no-v-for-template-key-on-child": "error",
    // 设置属性顺序
    "vue/attributes-order": "off",
    // 规定props要有默认值
    "vue/require-default-prop": "off",

    "vue/attribute-hyphenation": "off",
    // 禁止使用 debugger
    "no-debugger": "off",
    //
    "vue/multi-word-component-names": "off"
  }
}