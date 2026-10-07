// app/_components/SiteShell.tsx — the chrome of every page but the review window (which is the Studio's and carries its
// own head): the head bar with the caption and the nav, the page well, and the footer that says on every page what the
// site is for and that every allegation is an allegation. Server-rendered; no script.
import Link from 'next/link';
import { SITE, NAV } from '@/lib/site';

export function SiteShell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <Link href="/" className="font-serif text-lg tracking-wide no-underline hover:underline">
            Kirchner <span className="text-muted">v.</span> Johnson
          </Link>
          <span className="text-sm text-muted">No. {SITE.caseNo} · {SITE.courtShort}</span>
          <nav aria-label="Primary" className="ml-auto flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
            {NAV.filter((n) => n.href !== '/').map((n) => (
              <Link key={n.href} href={n.href} className="text-muted no-underline hover:text-ink hover:underline">{n.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className={`flex-1 mx-auto w-full ${wide ? 'max-w-6xl' : 'max-w-5xl'} px-5 sm:px-8 py-8 sm:py-12`}>{children}</main>
      <footer className="border-t border-rule">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 grid gap-3 text-xs text-muted leading-relaxed">
          <p className="max-w-3xl">{SITE.purpose} {SITE.notice}</p>
          <p className="max-w-3xl">
            The record of this case is the court&rsquo;s docket; this site presents the filings as filed and is not affiliated with the court.
            Nothing here is legal advice, and reading it or writing to the author creates no attorney–client relationship.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {NAV.map((n) => <Link key={n.href} href={n.href} className="no-underline hover:underline">{n.label}</Link>)}
            <span className="ml-auto">© {new Date().getFullYear()} {SITE.author} · {SITE.host}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-[0.16em] text-accent-ink mb-3" style={{ fontWeight: 600 }}>{children}</p>
);
