# kirchnervjohnson.com — realm charter

The public site for *Kirchner v. Johnson*, No. 1:25-cv-02735-ACR (D.D.C.). It will host the review
architecture: the filings with every citation linked to its source, on the model built for the books
on kirchner.ink and lawsofexistence.com. The front page is that review; the site is not yet launched.

- **Stack:** Next.js static export (`out/`), Tailwind, system fonts, no client script beyond the
  theme flag; headers, redirects and the Node version in `netlify.toml`. The same shape as
  `~/Git/ink_site`, deliberately — a review component or importer written there should land here
  with paths changed and nothing else.
- **Deploys are the owner's.** Netlify builds `main` on push. Agents commit on `device/macbook`
  (once the branch exists) and the owner integrates; before the first Netlify project exists,
  `main` is where the scaffold lives.
- **Content is the record.** Filed documents and their citations come from the case tree's Case
  Review lane (`work_station/1_DCC…/_admin/case_review/` — docs.json + `links/LINKS_<DOC>.tsv`) by
  an importer, never by hand; the site never edits a lane file. Nothing sealed is ever published.
- **Voice:** the site speaks as its author. No coordination vocabulary on any page a reader sees.
- Not launched: `robots.txt` disallows all and the layout sets `noindex`; both flip at launch (README). The
  under-construction page came down on the owner's word (2026-10-06): what the site shows is what it deploys.

## Case Review (owner's word 2026-10-01: the site differs from the Studio in skin, not in logic)

- `public/casereview/vendor/*.js` and `public/lib/pdfjs/` are the Studio's files, vendored byte for byte and recorded in
  `VENDOR.json`. **Never edit them here.** A rule change lands in `~/Git/ourstudio` (studio-spec + frontend review) and
  comes here by `npm run casereview:sync`; `npm run casereview:check` fails the build on drift. The three shims beside
  them (`base.js`, `filing/ctxmenu.js`, `reviews.js`) and `app/review/` (the host, the skin) are this repo's code.
- The bundle under `public/casereview/data/` is written by `scripts/import-casereview.mjs` from the Studio's API or the
  checker's export — **never hand-edited**. Publication is the registry's per-row `publish` field (serve | link |
  hold), fail-closed; the site adds nothing the registry has not said. The served PDFs (`public/uploads/`) are
  sha-gated against the registry and untracked until the owner's hosting decision.
- pdf.js is the Studio's 4.10.38, pinned in the Studio fixture; the site never installs another build for this page.
- The window is the front page (`/`, owner's word 2026-10-06); `/review` forwards there with the deep link. The site
  stays `noindex` until launch; the public mode lives on lawsofexistence.com.
- Read `docs/CASE_REVIEW_SITE.md` before touching any of it.
