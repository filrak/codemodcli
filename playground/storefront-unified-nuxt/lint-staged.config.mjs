export default {
  '*.{js,cjs,mjs,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{js,cjs,mjs,ts,tsx,vue}': () => 'yarn run typecheck',
};
