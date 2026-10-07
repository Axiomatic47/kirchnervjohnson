// app/_components/legal.tsx — the prose primitives of the About, Legal and Contact pages: the article frame with its
// dated head, section heads with anchors, paragraphs and lists. The voice is the author's throughout.
import Link from 'next/link';
import { SITE } from '@/lib/site';

export function Article({ eyebrow, title, lead, dated = false, children }: { eyebrow: string; title: string; lead?: React.ReactNode; dated?: boolean; children: React.ReactNode }) {
  return (
    <article className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.16em] text-accent-ink mb-3" style={{ fontWeight: 600 }}>{eyebrow}</p>
      <h1 className="font-serif tracking-tight leading-[1.12]" style={{ fontSize: 'clamp(30px, 4.2vw, 44px)', fontWeight: 620 }}>{title}</h1>
      {dated && <p className="text-sm text-muted mt-3">Last updated {SITE.legalUpdated}</p>}
      {lead && <div className="font-serif text-lg leading-relaxed text-ink/90 mt-6">{lead}</div>}
      <div className="mt-8 space-y-4 leading-relaxed text-ink/90">{children}</div>
      <p className="mt-12 pt-6 border-t border-rule text-sm text-muted">
        Questions about these pages: <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>. See also{' '}
        <Link href="/about" className="underline">About</Link>, <Link href="/legal" className="underline">Legal</Link> and{' '}
        <Link href="/contact" className="underline">Contact</Link>.
      </p>
    </article>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="font-serif text-2xl leading-tight pt-8 scroll-mt-24" style={{ fontWeight: 560 }}>{children}</h2>;
}
export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-sans text-xs uppercase tracking-[0.14em] text-muted pt-4" style={{ fontWeight: 600 }}>{children}</h3>;
}
export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2">{children}</ul>;
}
