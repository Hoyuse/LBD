const fs = require('fs');
const path = require('path');
const files = [
  'src/App.tsx',
  'src/components/ProductCatalog.tsx',
  'src/data.ts'
];
const replacements = [
  { from: /N�\u0018ud/g, to: 'Nœud' },
  { from: /Trio d'�0toiles/g, to: "Trio d'Étoiles" },
  { from: /�0pingles/g, to: 'Épingles' },
  { from: /DISE.*OS EXCLUSIVOS/g, to: 'DISEÑOS EXCLUSIVOS' },
  { from: /Locks by Danna .* Cartagena/g, to: 'Locks by Danna — Cartagena' },
  { from: /�S¡Tu corona te espera, bestie! Brilla con total seguridad sabiendo que cada pieza del Atelier fue creada pensando exclusivamente en destacar lo mejor de ti\.⬝ .* Danna\./g,
    to: '“¡Tu corona te espera, bestie! Brilla con total seguridad sabiendo que cada pieza del Atelier fue creada pensando exclusivamente en destacar lo mejor de ti.” — Danna.'
  },
  { from: /N�ud Fleuri/g, to: 'Nœud Fleuri' },
  { from: /N�ud d'Organza/g, to: 'Nœud d\'Organza' },
  { from: /Set Bloom & Shine \(N�ud & Géométrique\)/g, to: 'Set Bloom & Shine (Nœud & Géométrique)' },
  { from: /N�ud Fleuri/g, to: 'Nœud Fleuri' }
];
for (const file of files) {
  const fullPath = path.resolve(file);
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed', file);
  } else {
    console.log('No changes for', file);
  }
}
