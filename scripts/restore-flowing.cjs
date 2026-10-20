const fs = require('fs');
const doc = fs.readFileSync('d:/RP portfolio rebuild/brief-pack-v2/docs/react-bits/FlowingMenu.md', 'utf8');

const match = doc.match(/### Full Component Source[\s\S]*?```(?:jsx|javascript)\r?\n([\s\S]*?)```/);
let code = match[1];
fs.writeFileSync('d:/RP portfolio rebuild/rp-portfolio/src/components/react-bits/FlowingMenu/FlowingMenu.jsx', code, 'utf8');
console.log('Restored FlowingMenu.jsx to 100% clean original');
