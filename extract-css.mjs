import fs from 'fs';

const html = fs.readFileSync('/Users/wrteam-vimal/Downloads/Single-Page-Website/index.html', 'utf8');
const lines = html.split('\n');

const cssLines = lines.slice(11, 2034);

// Additional Tailwind base imports for Next.js 15+ if needed, but we will just stick to standard CSS
const baseCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

`;

fs.writeFileSync('/Users/wrteam-vimal/Downloads/unyra/app/globals.css', baseCSS + cssLines.join('\n'));
console.log('CSS extracted to app/globals.css');
