# kirchnervjohnson.com

*Kirchner v. Johnson*, No. 1:25-cv-02735-ACR (D.D.C.). The site will carry the filings in the case
with every citation linked to the source it cites. Today it is an under-construction page.

Static Next.js export (the same stack as kirchner.ink, so the review architecture built there
ports here), hosted on Netlify. No server runtime, no third-party scripts, system fonts only.

## Local

```bash
nvm use            # Node 22 (.nvmrc)
npm install
npm run dev        # http://localhost:3000
npm run build      # typecheck + static export into out/
npm run lint
```

## Netlify — creating the project (once)

1. Netlify → **Add new project → Import an existing project → GitHub** → pick
   `Axiomatic47/kirchnervjohnson`.
2. Build settings are read from `netlify.toml` (command `npm run build`, publish `out`,
   Node 22) — nothing to type. Deploy.
3. **Domain management → Add a domain → `kirchnervjohnson.com`.** Either move the domain's
   nameservers to Netlify DNS (the panel shows the four `dnsX.p0X.nsone.net` names), or at the
   registrar point the apex at Netlify's load balancer (`A 75.2.60.5`, or the ALIAS/ANAME the
   panel names) and `www` at `<site-name>.netlify.app` (CNAME). `www` redirects to the apex
   (`netlify.toml`).
4. HTTPS is provisioned automatically once DNS resolves (Let's Encrypt).

Every push to `main` is a production deploy.

## At launch

- `public/robots.txt`: replace `Disallow: /` with `Allow: /` and add `Sitemap: https://kirchnervjohnson.com/sitemap.xml`.
- `app/layout.tsx`: drop `robots: { index: false, follow: false }`.
- Replace the under-construction page.
