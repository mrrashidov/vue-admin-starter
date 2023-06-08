module.exports = {
  '*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}': () => ['pnpm lint', 'pnpm type-check'],
  '*.json': 'pnpm format'
}
