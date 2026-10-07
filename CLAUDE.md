# kirchnervjohnson.com — realm charter

The public site for *Kirchner v. Johnson*, No. 1:25-cv-02735-ACR (D.D.C.). It will host the review
architecture: the filings with every citation linked to its source, on the model built for the books
on kirchner.ink and lawsofexistence.com — for evaluation by prospective counsel and for coordination with
organizations, not for litigating the case in public (owner 2026-10-06). The pages: `/` (home: the purpose, the
notice, the way in), `/review` (the window), `/about`, `/legal` (notices · terms · privacy · copyright), `/contact`;
the site's facts and the two sentences every page says are `src/lib/site.ts`. Not yet launched.

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
- The window is at `/review` with the site's nav in its head bar; the front page is `/` (a `?casereview=` state on `/`
  forwards to the window). The site stays `noindex` until launch; the public mode lives on lawsofexistence.com.
- **Every page says what the site is for and that every allegation is an allegation** (`SITE.purpose`, `SITE.notice` —
  the footer, the home page, the notices). Wording changes there are the owner's.
- Read `docs/CASE_REVIEW_SITE.md` before touching any of it.

## The immunity timeline (owner's word 2026-10-06: on this site, on kirchner.ink and on lawsofexistence.com)

- `/research/immunity-timeline` is the actual history of immunity in all its categories, shared outward as the record
  (owner 2026-10-07: the timeline to share, not a comparison against anyone else's — the comparison block is no longer
  drawn). ONE content file, `public/research/immunity-timeline.json`,
  the same reviewed file on every site (every fact from the book or a shelf copy; the drafters write it, the sites render
  it, nobody here edits a fact); absent → the route answers 404 and nothing links to it.
- `src/lib/immunity-timeline.ts` (the shape), `src/lib/immunity-timeline.server.ts`, `scripts/validate-timeline.mjs` (the
  build gate: ids, years, the closed category and kind sets, quote pins, links, `source.book_unit` as `<note>/<seq>`
  beginning with the entry's `book_note`, an older file's comparison cross-references, and no coordination vocabulary in
  reader-facing text; the rail's TYPE and CATEGORY chips SELECT (each row begins at All; several in a row add together; the two rows combine;
  the selected chips are the filled ones; the selection is the query string `?type=…&category=…`, so a view can be sent); the book is TSUP after a key line; a citation links to the
  book's review page on kirchner.ink at its cited unit when the data names one, the note to the text page), `app/research/immunity-timeline/{TimelineBody,TimelineFilter}.tsx` and
  `timeline.css` are **byte-identical with kirchner.ink's** — a change lands on both (and goes to lawsofexistence.com by
  hand-off; a new import name, field, category or kind, palette token or UTILITY CLASS NAME in the module is said to that
  site by name before the cut, since its scoped sheet maps each by hand); `page.tsx` is this site's shell and `app/_components/Markdown.tsx` its reduced markdown renderer. The book's
  pages are not on this site, so the shell passes the absolute `bookBase` on kirchner.ink.

