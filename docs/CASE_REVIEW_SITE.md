# Case Review on the site — the Studio's window, vendored; the lane, bundled

The owner's word (2026-10-01): the case page on the website is a replica of the Studio's Case Review window —
"documents listed just like they are locally in descending order with the same exact structure … the website only
differing in skin, not in logic." This file says how that is kept true here and how it is operated.

## One logic

The window is the Studio's own module, run as a native ES module from `public/` — never bundled, never edited here:

| on the site | in the Studio (`~/Git/ourstudio`) | what |
|---|---|---|
| `public/casereview/vendor/casereview.js` | `ourstudio_frontend/ui/js/deck/casereview.js` | the window: the filings tree, the two panes, the stepper, the footers, the ⋯ menu, the search, the deep link |
| `public/casereview/vendor/casereview_core.js` | `…/deck/casereview_core.js` | the contract as code: the fold, the locate, the tree model (`navRows`, `navView`), the right pane's words (`saysFor`), the state string |
| `public/casereview/vendor/casereview_pdf.js` | `…/deck/casereview_pdf.js` | the PDF pane, used twice |
| `public/lib/pdfjs/` | `ourstudio_frontend/ui/lib/pdfjs/` | pdf.js **4.10.38** and its fourteen standard fonts — the build every reading-order rule was tuned on |

`public/casereview/vendor/VENDOR.json` records the Studio commit and the sha256 of every vendored file, plus the
pdf.js pin copied from the Studio fixture's `pdfjs` section (`tests/fixtures/casereview_fold.json`).
`scripts/sync-casereview.mjs`:

```
npm run casereview:check        # every build: the files match the record; the pdf.js files and fonts match the pin; every name the
                                #   window imports from a shim is one the shim exports (a new import fails here, in words, not on the page);
                                #   then the bundle's stamp (the Studio commit its export ran at, the checker label, the checker's source sha
                                #   once P91a lands) printed beside the record's commit — different commits are a fact to see, not a fault
npm run casereview:sync         # on the device: copy from the Studio at its HEAD, rewrite the record, then prove it —
                                #   blobs at the recorded commit, the fixture's pin, the Studio harness run there
```

A rule change lands in the Studio first (studio-spec + frontend review), then syncs out; the sites never fork a rule.
A sync after days apart is also a lane read: when the registry has moved under the bundle (a served file's sha, a publish word, a
new checker field), take a fresh export first and import from it, so the bundle and the window move together.
The pdf.js build moves only by one Studio patch that moves the pin and the files together.

The three Studio modules the window imports and the site does not have are **shims** beside it (host code, the only
code the site owns about the window): `base.js` (`$`, `esc`), `../filing/ctxmenu.js` (the shared menu as a plain
menu — the items that open the Studio's notes store are not drawn), `reviews.js` (the review composer, a no-op).
The host (`app/review/CaseReviewMount.tsx`) marks the surface (`document.body.dataset.mode = 'casereview'`, the rule
under which the window writes its deep link), gives the URL a default document when it names none, and calls
`mountCaseReview()`. The skin is `app/review/casereview.css`: the Studio's class names, tracks and placements with the
site's tokens (left pane blue, right pane brass).

**The deep link is the Studio's exact form** — `?casereview=doc=<id>&cite=<page>/<n>[/<k>]&q=<text>&page=<pdf
page>&right=<id>&rpage=<pdf page>` — written by the window on every step with `replaceState`, restored at mount.

## The data: a bundle of the served API

The window reads the Studio's three read-only routes. The site serves them static behind rewrites
(`public/_redirects` for Netlify, `public/serve.json` for the local static server), so the window's requests are the
Studio's own:

```
/api/casereview/docs         → /casereview/data/docs.json          the registry + per-table link counts
/api/casereview/links/<id>   → /casereview/data/links/<id>.json    one table, every row as the checker served it
/api/casereview/file/<id>    → /uploads/kirchner-v-johnson/<slug>.pdf the PDF, named by a URL-safe slug of its id
                                                                   (an explicit rule per id the slug changes; the splat for the rest)
```

`scripts/import-casereview.mjs` writes the bundle from the checker's EXPORT (the ruled path — the same code path as
the API, run from a bare Studio checkout, no server) or from the running Studio (`http://127.0.0.1:8765`, the
work_station project; the same bytes by construction) and copies the
served PDFs from the case root, **sha-gated against the registry** — a file whose sha256 is not the registry's is not
served. It prunes what is no longer served, writes `files.json` (id → served path, sha, bytes, pages, mode) and
`_IMPORT.json` (the stamp: source, registry version, counts, the default document, the vendored Studio commit, and the export's own
stamp whole — the Studio commit the export ran at, the checker label `checker`, `checker_source_sha256` (P91a: one sha256 over
the four checker modules, pinned with the label by the Studio's suite) and `mirrors_sha256` (P94: one sha256 over the machine-read
bytes of every document a quoted row targets, signed before the first mirror read and after the last, a move refusing the export); a bundle's stamp names the reading it carries, and the vendor check
prints it beside the record's commit).

```
# the export (ourstudio 3436c4c7, checker P86): the lane's served JSON to disk — docs.json, links/<id>.json, files.json, _EXPORT.json
cd ~/Git/ourstudio && env -u PYTHONPATH python3 -m ourstudio_frontend.filing.case_review export \
  /Users/everest/Git/work_station/1_DCC_1-25-cv-02735-ACR <out_dir> [--force]     # ~60 s; refuses a lane that moves during the run
node scripts/import-casereview.mjs --from <out_dir>   # the bundle from the export (the stamp carries the export's lane signature and checker)
npm run casereview:import                             # the same bundle from the Studio API when it runs (byte-identical: measured 29/29 files)
node scripts/import-casereview.mjs --check            # every build: the bundle is whole, every served file present and the registry's
node scripts/import-casereview.mjs --out <dir> …      # a dry run elsewhere, for a compare
```

**Publication is the registry's word.** docs.json carries a per-row `publish` field (v0.25, 2026-10-01): `serve`
(the PDF is hosted here), `link` (not hosted; `publish_url` names the official source), `hold` (not published; the row
is kept so a citation to it still says what it points at). The importer fails closed: a row without the field is
`hold`, whatever its kind. The admins write the field from the owner's content gates; the owner decides the case-law
class and the hosting size. Today (v0.25b): serve 985 · link 7 · hold 57.

**What a lane correction does and does not reach.** The two are easy to confuse and the difference decides what a reader sees. The
checker's `passage` — its own oracle text, read from the shelf mirror — is DROPPED (`ROW_DROP`: `by`, `note`, `passage`), because the
window boxes passages from the PDF's own text layer. A passage correction therefore never reaches a reader on any site; it reaches them
through the Studio's verification. The row's `target_quote` — the quoted matter the pane PRINTS in its status line — is served, and a
correction to it does arrive: on 2026-10-06 three rows lost a break hyphen copied from a superseded mirror ('consti-tuting' →
'constituting'), two tables moved, and the pane now prints the court's word. Measure which field moved before saying whether a landing is
visible here, and measure it through a dry run (`--from <export> --out <dir>`, comparing `<dir>/casereview/data/…`) rather than from the
export alone.

**What the bundle leaves out** (the author's voice everywhere the reader reads; record and links only): the lane's
seat fields, the drafters' and admins' working notes, the checker's passage texts (the window boxes passages from the
PDF's own text layer), filesystem paths, mirror paths, shelf aliases. The checker's structured answers (violations,
warnings, coverage, stale render, `k`, `unit_id`, pdf pages, section-map resolutions, and since 2026-10-05 `target_columns` — the pages of a quoted row's target span the checker
reads as two-column, which the window's miss wording reads when its own gutter read finds nothing) ride unchanged. The five
filings the court has not stamped (ECF 11, 12, 12-1, 14, 15) carry `filer_copy` and the mark in their title.

**P95 — the dropped-ligature class (the checker half at Studio 66eea8d4 / fixed at 361cd2f9 as P95a, the viewer half at fc13e4ae — the pair's sha this site vendored and exported at, 2026-10-09):** the Court's PDFs from about 2013–2014 map ﬁ/ﬂ/ﬃ to a single
'f' in the file's own font map, so the text layer reads 'confrmed' where the print reads 'confirmed'. The checker measures it as a
document fact and the export ships it as data: on the docs payload `ligature_drop` (bool) and `ligature_drop_density` (dictionary-
repairable f-forms per 1,000 words of the store the oracles read) — both named in `DOC_KEEP`, so the bundle's docs.json is the
Studio's shape (18 documents flagged at v0.25m); on every row that has a target document `target_ligature_drop` (true only when the
target is flagged; null on the unquoted rows, as `target_columns` is), which rides through the row deny-list untouched; and the
passage's `retry` gains the label "g" (dropped ligatures, document-level) — the passage is dropped here, so that label never reaches
a reader. The window's retry (g) keys on the ROW field alone, never on the docs payload, so the vendored window behaves the same in
the Studio and on the sites whether or not a site carries the two doc keys; the viewer half of P95 (the retry ladder in
`casereview_core.js`) is in the window vendored at fc13e4ae, and fires on no served row until the drafters re-cut their quotes to the
print's spelling (a168bcf6's compare over the 64 flagged rows: line-identical before and after). `casereview:sync` refuses while the Studio's vendored sources carry uncommitted
changes (another seat's half in the shared checkout): the window is vendored from blobs at a commit, never from a working tree. When the
shared checkout's HEAD has moved past the sha a sync is ordered at, point the sync and the export at a throw-away worktree of that sha
(`STUDIO_DIR=<worktree> npm run casereview:sync`; the export run from the worktree) — the record then names the ordered commit and the
harness runs there; remove the worktree after.

**A host policy** (`--serve-groups Filings[,…]`, lawsofexistence.com's addition, 2026-10-01): the registry's `serve` is the
lane's word on what MAY be published; which groups a site actually hosts is the owner's hosting decision per site. A
serve row outside the listed groups is not hosted there — `link` when the registry names an http(s) `publish_url`, else
`hold` — the row kept, the window saying so, the policy stamped in `_IMPORT.json.host_policy` and printed by the check.
Without the flag every serve row is hosted. The `_redirects` rules are written as a marked block (`# casereview BEGIN …
END`) merged into the file, so a host whose `_redirects` carries other generated rules keeps them. One importer, both sites.

**Hosting size.** The served PDFs under `public/uploads/` are **not tracked in git** until the owner's word: the
filings alone are 1.0 GB, the full serve set 1.6 GB (lawsofexistence.com carries its 436 filings in git). A Netlify
build with served rows and no files fails the bundle check — by design: nothing published is served from nowhere.

## What a reader gets

`/review` — the window's page; the front page `/` is the site's (the purpose, the notice, the way in), and a `?casereview=`
state on `/` forwards to the window — opens the newest filing with a link table on the left (ECF 77 today; the rule, not the number), the right
pane empty with its invitation line; the far-left list is the Studio's tree (groups; mains ECF 77 … 1 descending;
attachments ascending under their main, folded; the filter; collapse-all; the rail; "hide before ECF 47" on). A
boxed citation opens its source on the right at the cited page with the passage boxed; the right pane says what it
shows and what it cannot. A `link` target has no file here and the pane says "not hosted on this site; at <the
official source>" with the link; a `hold` target "not published on this site yet" — said before any fetch, from the
row's `publish` field (the Studio's `publishedAway`, vendored at 60864af9); a held document opened on the left says
the same in its footer.

**Where a row opens** (the Studio's rule of 2026-10-01, vendored at 1d000044): a table-of-contents entry moves within the pane it
was clicked in and opens nothing in the other; a citation in the left opens its source on the right; a citation clicked in the
right pane opens in the right, the left never moving — the right pane draws its own citation boxes when its document has a
table (a document without one answers 404 on the static links route, which the window reads as no table), and the way back is
the left's unmoved citation.

**The right pane's tab bar** (the Studio's rule of 2026-10-02, vendored at 85c2e4ca): up to five tabs on the right pane — at
most four locked at their document and page by "lock to tab bar" in the pane's menu, standing left in lock order while the
reviewer explores from the left, and one exploring tab, rightmost, that every link opens into. The bar is remembered in the
browser per case, never in the data; the deep link's `right=` names the exploring tab as before.

The under-construction page came down on the owner's word (2026-10-06); the same evening the site's own pages went in — home,
about, legal, contact — with the window at `/review` and the site's nav in its head bar. The site stays `noindex` (the layout)
with `robots.txt` disallowing all until launch. A build without the served PDFs fails the bundle check,
so an integrate cannot publish the window before the hosting decision.

## Verifying a change

1. `npm run build` — typecheck, the vendor check, the bundle check, the export.
2. `npx serve out -l 4999 --no-clipboard` (a private port; the Studio's pinned 3400/3401 are never used by hand) and
   open `http://127.0.0.1:4999/review`; `curl -I http://127.0.0.1:4999/api/casereview/docs` must answer JSON, the
   file route a PDF with `206` on a Range request.
3. Offscreen: the Studio's `tools/ui_snap/snap` against the page with a state strip in the prep script (canvases
   render blank offscreen — assert the tree rows, the boxes and the footer words, not pixels).
4. A Studio change: `npm run casereview:sync`, then 1–3 again.
