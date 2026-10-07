// app/page.tsx — the front page: what this case is, what this site is for, and the way into the record. The purpose and
// the notice are the owner's word of 2026-10-06 (src/lib/site.ts) and are said here, in the footer of every page and in the
// legal notices. The review window itself lives at /review; a deep link written while the window stood at / (the hours of
// 6 October) still opens — the script below forwards a ?casereview= state there.
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { SiteShell, Eyebrow } from './_components/SiteShell';
import { SITE } from '@/lib/site';
import { hasImmunityTimeline } from '@/lib/immunity-timeline.server';

type Docs = { docs: { publish?: string; group?: string }[] };
type Stamp = { imported?: string; documents?: number; tables?: number; registry_version?: string | null };

function readRecord(): { total: number; serve: number; link: number; hold: number; tables: number; imported: string | null } {
  try {
    const docs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'casereview', 'data', 'docs.json'), 'utf8')) as Docs;
    const stamp = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'casereview', 'data', '_IMPORT.json'), 'utf8')) as Stamp;
    const n = (m: string) => docs.docs.filter((d) => d.publish === m).length;
    return { total: docs.docs.length, serve: n('serve'), link: n('link'), hold: n('hold'), tables: stamp.tables ?? 0, imported: stamp.imported ? stamp.imported.slice(0, 10) : null };
  } catch {
    return { total: 0, serve: 0, link: 0, hold: 0, tables: 0, imported: null };
  }
}

const forward = `(function(){try{if(/(^|[?&])casereview=/.test(location.search))location.replace('/review'+location.search+location.hash);}catch(e){}})();`;

const Card = ({ href, title, children }: { href: string; title: string; children: React.ReactNode }) => (
  <Link href={href} className="group block bg-card border border-rule rounded-lg shadow-card p-6 no-underline hover:border-accent transition-colors">
    <h2 className="font-serif text-xl leading-snug group-hover:text-accent-ink" style={{ fontWeight: 560 }}>{title}</h2>
    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">{children}</p>
    <span className="mt-4 inline-block text-sm text-accent-ink">Open →</span>
  </Link>
);

export default function Home() {
  const r = readRecord();
  const timeline = hasImmunityTimeline();
  return (
    <SiteShell wide>
      <script dangerouslySetInnerHTML={{ __html: forward }} />
      <section className="max-w-3xl">
        <Eyebrow>{SITE.court}</Eyebrow>
        <h1 className="font-serif tracking-tight leading-[1.08]" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 620 }}>
          Kirchner <span className="text-muted">v.</span> Johnson
        </h1>
        <p className="mt-3 font-serif text-lg text-muted">No. {SITE.caseNo} · {SITE.judge} · filed {SITE.filed} · jury demanded</p>
        <div className="mt-8 h-px w-16 bg-accent" />
        <p className="mt-8 font-serif text-xl leading-relaxed text-ink/90">{SITE.purpose}</p>
        <p className="mt-4 leading-relaxed text-ink/80">{SITE.notice}</p>
      </section>

      <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Where to go">
        <Card href="/review" title="The case in review">
          Every filing in the case, with every citation linked to the source it cites — the exhibit page, the docket entry, the
          opinion, the statute — in two panes, so that the record can be checked page by page.
        </Card>
        {timeline && (
          <Card href="/research/immunity-timeline" title="The history of immunity">
            The actual history of official immunity in all its categories, every entry resting on the record, set beside the
            six-step origin story that circulates.
          </Card>
        )}
        <Card href="/about" title="About this site">Who it is for, what the case is, how the review works, and what is not here.</Card>
        <Card href="/legal" title="Legal notices">The allegations and the record, the terms of use, privacy, copyright and reuse.</Card>
        <Card href="/contact" title="Contact">For prospective counsel and for organizations: how to reach the plaintiff, and what helps.</Card>
      </section>

      {r.total > 0 && (
        <section className="mt-14 max-w-3xl text-sm text-muted leading-relaxed border-t border-rule pt-6">
          <p>
            The record as reviewed here{r.imported ? ` on ${r.imported}` : ''}: {r.total.toLocaleString()} documents — {r.serve.toLocaleString()} served on this site,{' '}
            {r.link.toLocaleString()} linked at their official source, {r.hold.toLocaleString()} named but not published here — and {r.tables} link tables, one per
            filing that cites. The official record is the court&rsquo;s docket.
          </p>
        </section>
      )}
    </SiteShell>
  );
}
