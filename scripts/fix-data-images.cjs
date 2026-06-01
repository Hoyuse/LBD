const fs = require('fs');
const path = require('path');
const file = path.resolve('src/data.ts');
let text = fs.readFileSync(file, 'utf8');
text = text.replace(/export const assetUrl = \(relativePath: string\) => new URL\(relativePath, import.meta.url\)\.href;\n\n/, '');
text = text.replace(/image: assetUrl\("(\.\/assets\/images\/[^"]+)"\)/g, 'image: new URL("$1", import.meta.url).href');
fs.writeFileSync(file, text, 'utf8');
console.log('Updated data.ts');
