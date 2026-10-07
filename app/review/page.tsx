// app/review/page.tsx — the window's path until 2026-10-06, kept so every link written while it lived here still opens:
// the front page is the window now (app/page.tsx), and this page forwards there with the deep link carried whole
// (?casereview=… and any hash). A static export has no server redirect of its own; the script runs as the page parses,
// before anything paints, and the link below is the way for a reader without script. A forwarding page is never for the
// index, launched or not.
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Review',
  robots: { index: false, follow: false },
};

const forward = `(function(){try{location.replace('/'+location.search+location.hash);}catch(e){}})();`;

export default function ReviewForward() {
  return (
    <main className="min-h-screen flex items-center">
      <script dangerouslySetInnerHTML={{ __html: forward }} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Case review</p>
        <p className="mt-4 text-ink-2">
          The case review is the front page now — <Link href="/" className="text-accent-ink underline">open it there</Link>.
        </p>
      </div>
    </main>
  );
}
