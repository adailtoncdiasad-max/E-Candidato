import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Brand SVG with elegant crest and ballot symbol
const svgStandard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B2B" />
      <stop offset="100%" stop-color="#07121D" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E5AB" />
      <stop offset="50%" stop-color="#D4A537" />
      <stop offset="100%" stop-color="#996515" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#D4A537" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background rounded rect -->
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)" stroke="#1E3A5F" stroke-width="8" />
  
  <!-- Outer Gold Laurel / Shield Accent -->
  <g filter="url(#glow)">
    <circle cx="256" cy="256" r="170" fill="none" stroke="url(#goldGrad)" stroke-width="10" stroke-dasharray="16 10" opacity="0.6"/>
  </g>

  <!-- Ballot Box / Shield Emblem -->
  <g transform="translate(136, 126)">
    <!-- Urn body -->
    <path d="M 40 90 L 200 90 L 185 220 L 55 220 Z" fill="#112233" stroke="url(#goldGrad)" stroke-width="8" stroke-linejoin="round"/>
    
    <!-- Urn top slot lid -->
    <rect x="25" y="70" width="190" height="24" rx="8" fill="url(#goldGrad)" stroke="#F3E5AB" stroke-width="3" />
    
    <!-- Vote Slot -->
    <rect x="80" y="78" width="80" height="8" rx="4" fill="#0B1B2B" />
    
    <!-- Ballot Paper entering slot -->
    <rect x="95" y="20" width="50" height="65" rx="6" fill="#F2EFE6" stroke="#D4A537" stroke-width="4" transform="rotate(-6 120 50)"/>
    
    <!-- Checkmark on Ballot Paper -->
    <path d="M 108 48 L 118 58 L 134 38" fill="none" stroke="#059669" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-6 120 50)"/>
    
    <!-- Star of Excellence at Urn Front -->
    <polygon points="120,135 125,150 141,150 128,159 133,174 120,165 107,174 112,159 99,150 115,150" fill="url(#goldGrad)" />
  </g>

  <!-- Text / Title E-Candidato at Bottom -->
  <text x="256" y="420" font-family="'Cinzel', 'Arial Black', serif" font-size="34" font-weight="900" fill="#F2EFE6" text-anchor="middle" letter-spacing="4">E-CANDIDATO</text>
  <text x="256" y="445" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#2E9C87" text-anchor="middle" letter-spacing="3">INTELIGÊNCIA ELEITORAL</text>
</svg>`;

// Maskable SVG with 20% safe-zone margin (Android standard)
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B2B" />
      <stop offset="100%" stop-color="#07121D" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E5AB" />
      <stop offset="50%" stop-color="#D4A537" />
      <stop offset="100%" stop-color="#996515" />
    </linearGradient>
  </defs>

  <!-- Full bleed background for Android masking -->
  <rect width="512" height="512" fill="url(#bgGrad)" />

  <!-- Inner content scaled inside the safe zone (80% box: ~60px margin) -->
  <g transform="translate(51, 51) scale(0.8)">
    <circle cx="256" cy="256" r="170" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-dasharray="16 10" opacity="0.6"/>

    <g transform="translate(136, 126)">
      <path d="M 40 90 L 200 90 L 185 220 L 55 220 Z" fill="#112233" stroke="url(#goldGrad)" stroke-width="8" stroke-linejoin="round"/>
      <rect x="25" y="70" width="190" height="24" rx="8" fill="url(#goldGrad)" stroke="#F3E5AB" stroke-width="3" />
      <rect x="80" y="78" width="80" height="8" rx="4" fill="#0B1B2B" />
      <rect x="95" y="20" width="50" height="65" rx="6" fill="#F2EFE6" stroke="#D4A537" stroke-width="4" transform="rotate(-6 120 50)"/>
      <path d="M 108 48 L 118 58 L 134 38" fill="none" stroke="#059669" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-6 120 50)"/>
      <polygon points="120,135 125,150 141,150 128,159 133,174 120,165 107,174 112,159 99,150 115,150" fill="url(#goldGrad)" />
    </g>

    <text x="256" y="420" font-family="'Cinzel', 'Arial Black', serif" font-size="34" font-weight="900" fill="#F2EFE6" text-anchor="middle" letter-spacing="4">E-CANDIDATO</text>
  </g>
</svg>`;

async function run() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgStandard, 'utf8');

  // Generate PNGs
  const standardBuffer = Buffer.from(svgStandard);
  const maskableBuffer = Buffer.from(svgMaskable);

  await sharp(standardBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(standardBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  await sharp(standardBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(standardBuffer).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(standardBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));

  console.log('Todos os ícones PWA e Android gerados com sucesso em /public!');
}

run().catch(console.error);
