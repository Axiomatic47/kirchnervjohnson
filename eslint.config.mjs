import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// public/ holds the Studio's vendored Case Review window and the pdf.js build (never edited here) and the shims that
// mirror the deck's modules; out/ is the export. Neither is this repo's code to lint.
const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['out/**', '.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'] },
];

export default config;
