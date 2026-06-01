const fs = require('fs');
const path = require('path');
const file = path.resolve('dist/assets/index-BkFRHFnq.js');
const text = fs.readFileSync(file, 'utf8');
const needles = [
  'lbd_product_blossom_knot_1780280846869.png',
  'lbd_product_pearl_slide_1780280828278.png',
  'lbd_product_pearl_tiara_1780280813932.png',
  'lbd_product_geometric_slide_1780280862288.png'
];
for (let i = 0; i < needles.length; i += 1) {
  const needle = needles[i];
  const idx = text.indexOf(needle);
  console.log('needle', needle, 'idx', idx);
  if (idx !== -1) {
    console.log(text.slice(Math.max(0, idx - 100), Math.min(text.length, idx + needle.length + 100)));
  }
}
