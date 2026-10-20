import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as si from 'simple-icons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/stack');
fs.mkdirSync(outDir, { recursive: true });

const iconMapping = [
  { file: 'python.svg', icon: si.siPython, title: 'Python' },
  { file: 'dart.svg', icon: si.siDart, title: 'Dart' },
  { file: 'flutter.svg', icon: si.siFlutter, title: 'Flutter' },
  { file: 'javascript.svg', icon: si.siJavascript, title: 'JavaScript' },
  { file: 'html.svg', icon: si.siHtml5, title: 'HTML' },
  { file: 'css.svg', icon: si.siCss, title: 'CSS' },
  { file: 'flask.svg', icon: si.siFlask, title: 'Flask' },
  { file: 'firebase.svg', icon: si.siFirebase, title: 'Firebase' },
  { file: 'supabase.svg', icon: si.siSupabase, title: 'Supabase' },
  { file: 'git.svg', icon: si.siGit, title: 'Git & GitHub' },
  { file: 'ai.svg', icon: si.siOpenai, title: 'AI / LLM APIs' },
];

iconMapping.forEach(({ file, icon, title }) => {
  let svgContent = '';
  if (icon && icon.svg) {
    // Replace default fill with currentColor or #EDEBE6
    svgContent = icon.svg.replace('<svg ', '<svg fill="#EDEBE6" ');
  } else {
    // Fallback AI icon
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EDEBE6"><path d="M12 2a2 2 0 0 1 2 2v1a7 7 0 0 1 5 5h1a2 2 0 1 1 0 4h-1a7 7 0 0 1-5 5v1a2 2 0 1 1-4 0v-1a7 7 0 0 1-5-5H4a2 2 0 1 1 0-4h1a7 7 0 0 1 5-5V4a2 2 0 0 1 2-2zm0 5a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5z"/></svg>`;
  }
  fs.writeFileSync(path.join(outDir, file), svgContent, 'utf-8');
  console.log(`Saved ${file} (${title})`);
});
