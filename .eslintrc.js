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
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'prefer-promise-reject-errors': 'off',
    'eol-last': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/attributes-order': 'off',
    'vue/require-default-prop': 'off',
    'vue/attribute-hyphenation': 'off',
    'no-debugger': 'off',
    'eqeqeq': 'off',
    'n/no-callback-literal': 'off',
    'vue/v-on-event-hyphenation': 'off'
  }
}
