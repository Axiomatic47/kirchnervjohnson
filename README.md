# kirchnervjohnson.com

*Kirchner v. Johnson*, No. 1:25-cv-02735-ACR (D.D.C.). The site will carry the filings in the case
with every citation linked to the source it cites, for evaluation by prospective counsel and for coordination with
organizations — not for litigating the case in public. The front page says so; the review is at `/review`; About, Legal and
Contact carry the rest. Built and not yet launched (noindex, robots disallow-all).

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
- The pages are in place (home, review, about, legal, contact); the owner reads the wording of `src/lib/site.ts`, `app/legal/page.tsx`,
  `app/about/page.tsx` and `app/contact/page.tsx` before launch, and the contact address there is the one to publish.

## The immunity timeline

`/research/immunity-timeline` sets the actual history of immunity, in all its categories, beside the six-step origin story at
endqi.org — a proposed correction, shared with Campaign Zero, carried on this site, on kirchner.ink and on lawsofexistence.com.
The content is one file, `public/research/immunity-timeline.json`, the same reviewed file on every site; the page renders it and
adds nothing, and the route answers 404 until the file exists. `npm run validate-timeline` is the build gate.

## Case Review — the Studio's window on the site

`/review` is the case in review mode (a `?casereview=` deep link on `/` forwards there): the filings listed as the Studio lists them (docket order descending,
attachments under their main), the document under review on the left, the cited source at its page on the right.
The window is the Studio's own module, **vendored byte for byte** under `public/casereview/vendor/` and run as a
native ES module; the site differs in skin alone (`app/review/casereview.css`). The data is the lane as the Studio
serves it, bundled under `public/casereview/data/` by `scripts/import-casereview.mjs` and served behind the Studio's
own API routes (`public/_redirects`, `public/serve.json`). Publication is the registry's per-row `publish` field,
fail-closed. The served PDFs under `public/uploads/` are not tracked until the owner's hosting decision.

```
npm run casereview:check     # every build: vendored files = the record; pdf.js files and fonts = the Studio fixture's pin; the bundle whole
npm run casereview:sync      # on the device: re-vendor from ~/Git/ourstudio at its HEAD and prove it (blobs, pin, harness)
npm run casereview:import    # on the device: the bundle from the running Studio (127.0.0.1:8765); --from <dir> for the export
```

The whole of it: `docs/CASE_REVIEW_SITE.md`.
