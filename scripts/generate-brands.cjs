const fs = require('fs');
const path = require('path');
const si = require('../node_modules/simple-icons');

const brandsDir = path.resolve(__dirname, '../public/brands');
fs.mkdirSync(brandsDir, { recursive: true });

function makeSvg(iconPath, scale = 6) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
      <feComposite in2="SourceGraphic" in="glitch" operator="in" />
    </filter>
  </defs>
  <rect width="600" height="400" fill="#E4E1DA" />
  <rect width="600" height="400" fill="#16131C" opacity="0.04" filter="url(#grain)" />
  <g transform="translate(300, 180) scale(${scale})" fill="#16131C">
    <path d="${iconPath}" transform="translate(-12, -12)" />
  </g>
</svg>`;
}

// GitHub
const githubPath = si.siGithub.path;
fs.writeFileSync(path.join(brandsDir, 'github.svg'), makeSvg(githubPath, 5.5), 'utf8');

// LinkedIn
const linkedinPath = 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z';
fs.writeFileSync(path.join(brandsDir, 'linkedin.svg'), makeSvg(linkedinPath, 5.5), 'utf8');

// Email
const emailPath = 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z';
fs.writeFileSync(path.join(brandsDir, 'email.svg'), makeSvg(emailPath, 5.5), 'utf8');

// Resume
const resumePath = 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z';
fs.writeFileSync(path.join(brandsDir, 'resume.svg'), makeSvg(resumePath, 5.5), 'utf8');

console.log('Successfully generated public/brands/ SVG tiles');
