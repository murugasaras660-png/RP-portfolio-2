const fs = require('fs');
let code = fs.readFileSync('d:/RP portfolio rebuild/rp-portfolio/src/components/react-bits/FlowingMenu/FlowingMenu.jsx', 'utf8');

// Replace kick
code = code.replace(
  'const kick = () => {',
  'const kick = () => {\n    const loop = engine.current;\n    console.log("DEBUG KICK:", { raf: loop.raf, shown: band.current.shown, index: band.current.index });'
);

// Replace start of frame
code = code.replace(
  'const frame = now => {',
  'const frame = now => {\n    console.log("DEBUG FRAME ENTER:", { now });'
);

fs.writeFileSync('d:/RP portfolio rebuild/rp-portfolio/src/components/react-bits/FlowingMenu/FlowingMenu.jsx', code, 'utf8');
console.log('Inserted kick and frame logs');
