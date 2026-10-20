import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.resolve(__dirname, '../../brief-pack/docs/react-bits');
const targetBase = path.resolve(__dirname, '../src/components/react-bits');

const components = [
  'Lanyard',
  'FlowingMenu',
  'SpotlightCard',
  'LogoLoop',
  'FlipCard',
  'FlexCarousel',
  'Folder'
];

components.forEach(name => {
  const mdPath = path.join(docsDir, `${name}.md`);
  if (!fs.existsSync(mdPath)) {
    console.error(`Not found: ${mdPath}`);
    return;
  }

  const content = fs.readFileSync(mdPath, 'utf-8');

  // Find Full Component Source
  const sourceHeadingMatch = content.match(/### Full Component Source[\s\S]*?```(?:jsx|javascript|tsx)?\r?\n([\s\S]*?)```/);
  if (!sourceHeadingMatch) {
    console.error(`Could not find JSX for ${name}`);
    return;
  }
  const jsxCode = sourceHeadingMatch[1];

  // Find Component CSS
  const cssHeadingMatch = content.match(/### Component CSS[\s\S]*?```css\r?\n([\s\S]*?)```/);
  const cssCode = cssHeadingMatch ? cssHeadingMatch[1] : '';

  const compDir = path.join(targetBase, name);
  fs.mkdirSync(compDir, { recursive: true });

  fs.writeFileSync(path.join(compDir, `${name}.jsx`), jsxCode, 'utf-8');
  fs.writeFileSync(path.join(compDir, `${name}.css`), cssCode, 'utf-8');

  console.log(`Successfully extracted ${name} -> ${compDir}`);
});
