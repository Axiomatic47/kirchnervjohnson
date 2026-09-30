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

## Local development in OurStudio

The repo carries `studio-site.json`, the manifest the Studio's **SITES** rail mode reads (it scans
`~/Git` for manifests every 30 s; no registration step). Two launch modes, ports pinned so the
family's sites never collide (jk 3100/3101, ink 3200/3201, loe 3300/3301, this site 3400/3401):

| mode | what runs | frame |
|---|---|---|
| **static** (the development mode here) | `npm run build`, then `npx serve out -l 3401` — the export served with clean URLs and byte ranges, exactly what Netlify serves | `http://localhost:3401/` |
| dev | `npx next dev -p 3400` — hot reload while editing a page | `http://localhost:3400/` |

Start, stop and restart from the SITES page; the build log and the framed site are there. Nothing
else should listen on 3400 or 3401. `serve` is a devDependency so `npx serve` resolves offline.

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
