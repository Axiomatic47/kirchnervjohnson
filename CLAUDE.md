# kirchnervjohnson.com — realm charter

The public site for *Kirchner v. Johnson*, No. 1:25-cv-02735-ACR (D.D.C.). It will host the review
architecture: the filings with every citation linked to its source, on the model built for the books
on kirchner.ink and lawsofexistence.com. Today: an under-construction page.

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
- Under construction: `robots.txt` disallows all and the layout sets `noindex`; both flip at launch
  (README).
