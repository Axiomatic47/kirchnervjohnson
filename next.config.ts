import type { NextConfig } from 'next';

// Static export: the whole site is plain HTML/CSS/JS under out/, served by Netlify with no
// framework runtime. Headers and redirects live in netlify.toml. The same shape as kirchner.ink,
// so the review architecture built there ports here unchanged.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  // the Studio's SITES preview reaches the dev server as 127.0.0.1 (dev only)
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // `next dev` would otherwise append a vendor block to CLAUDE.md on every start
  agentRules: false,
};

export default nextConfig;
