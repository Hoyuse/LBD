const fs = require('fs');
const path = require('path');
const file = path.resolve('src/data.ts');
const text = fs.readFileSync(file, 'utf8');
for (let i = 0; i < text.length; i++) {
  if (text[i] === 'N') {
    const slice = text.slice(i, i + 8);
    const codes = Array.from(slice).map(ch => ch.codePointAt(0).toString(16).padStart(4, '0'));
    console.log(i, JSON.stringify(slice), codes.join(' '));
  }
}
