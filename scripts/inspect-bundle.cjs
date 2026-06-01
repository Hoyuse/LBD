const fs = require('fs');
const path = require('path');
const file = path.resolve('dist/assets/index-BkFRHFnq.js');
const text = fs.readFileSync(file, 'utf8');
console.log('includes lbd_product?', text.includes('lbd_product'));
console.log('index new URL', text.indexOf('new URL'));
console.log('first 200 chars:', text.slice(0, 200));
console.log('sample contains __vite__', text.includes('__vite__'));
