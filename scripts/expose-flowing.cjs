const fs = require('fs');
let code = fs.readFileSync('d:/RP portfolio rebuild/rp-portfolio/src/components/react-bits/FlowingMenu/FlowingMenu.jsx', 'utf8');

if (!code.includes('window.__flowingMenu')) {
  code = code.replace(
    'const settingsRef = useRef(settings);',
    'const settingsRef = useRef(settings);\n  if (typeof window !== "undefined") window.__flowingMenu = { band, metrics, settings: settingsRef, engine };'
  );
  fs.writeFileSync('d:/RP portfolio rebuild/rp-portfolio/src/components/react-bits/FlowingMenu/FlowingMenu.jsx', code, 'utf8');
  console.log('Exposed window.__flowingMenu');
}
