module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "prettier"],
  rules: {
    'complexity': 0,
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'no-undef': 'off',
    'no-restricted-globals': [
      'warn',
      {
        name: 'toRefs',
        message:
        "Use `import { toRefs } from '@vueuse/core'` instead. https://github.com/vuestorefront/storefront-nuxt3-boilerplate/pull/22#discussion_r1259826324",
      },
    ],
    'vue/max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreHTMLAttributeValues: true,
      },
    ],
    'vue/no-multiple-template-root': 'warn',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
