// app/review/page.tsx — the case in review mode: the filings listed at the far left as the Studio lists them (docket
// order descending, attachments under their main), the document under review on the left, the cited source at its
// page on the right. The window is the Studio's, vendored (public/casereview/vendor); this page is its host and the
// one-row head above it. The bundle it reads (public/casereview/data) is the lane as the Studio serves it, published
// by the registry's word (scripts/import-casereview.mjs).
import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { CaseReviewMount } from './CaseReviewMount';
import './casereview.css';

export const metadata: Metadata = {
  title: 'Case Review',
  description: 'Kirchner v. Johnson, No. 1:25-cv-02735-ACR (D.D.C.): the filings with every citation linked to its source, in two panes.',
  robots: { index: false, follow: false },
};

type ImportStamp = { default_doc?: string | null; registry_version?: string | null; documents?: number; tables?: number; imported?: string };

function readStamp(): ImportStamp {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'casereview', 'data', '_IMPORT.json'), 'utf8')); }
  catch { return {}; }
}

export default function ReviewPage() {
  const stamp = readStamp();
  return (
    <main className="cr-host">
      <header className="cr-head">
        <Link href="/" aria-label="kirchnervjohnson.com">kirchnervjohnson.com</Link>
        <span className="cr-caption">Kirchner <span className="v">v.</span> Johnson</span>
        <span className="cr-no">No. 1:25-cv-02735-ACR · D.D.C.</span>
        <span className="cr-mode">Case review</span>
      </header>
      <CaseReviewMount defaultDoc={stamp.default_doc ?? null} />
    </main>
  );
}
