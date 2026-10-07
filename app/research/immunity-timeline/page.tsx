// app/research/immunity-timeline/page.tsx — the actual history of immunity, in all its categories, set beside the
// six-step origin story at endqi.org (owner's word 2026-10-06: on this site, on kirchner.ink and on lawsofexistence.com;
// shared with Campaign Zero as a proposed correction to their timeline). The content is
// public/research/immunity-timeline.json, the same reviewed file on every site (src/lib/immunity-timeline.ts is the shape,
// scripts/validate-timeline.mjs the gate); the body is TimelineBody.tsx, byte-identical on every site; this file is this
// site's shell around it — the case's head bar, the way back to the review. No content → 404.
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadImmunityTimeline } from '@/lib/immunity-timeline.server';
import { TIMELINE_PAGE_PATH } from '@/lib/immunity-timeline';
import { TimelineBody } from './TimelineBody';
import './timeline.css';

export function generateMetadata(): Metadata {
  const t = loadImmunityTimeline();
  if (!t) return { title: 'Immunity timeline', robots: { index: false, follow: false } };
  return { title: t.title, description: t.standfirst.replace(/[*_`]/g, '').slice(0, 300), alternates: { canonical: TIMELINE_PAGE_PATH } };
}

export default function ImmunityTimelinePage() {
  const t = loadImmunityTimeline();
  if (!t || t.entries.length === 0) notFound();
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Link href="/" className="text-sm text-muted no-underline hover:underline">kirchnervjohnson.com</Link>
          <span className="font-serif text-lg tracking-wide">Kirchner <span className="text-muted">v.</span> Johnson</span>
          <span className="text-sm text-muted">No. 1:25-cv-02735-ACR · D.D.C.</span>
          <span className="ml-auto text-xs uppercase tracking-[0.16em] text-accent-ink">Timeline</span>
        </div>
      </header>
      <div className="flex-1 mx-auto w-full max-w-5xl px-5 sm:px-8 py-8 sm:py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink no-underline mb-6">← The case in review</Link>
        <TimelineBody t={t} bookBase={`https://kirchner.ink/work/${t.provenance.book_slug}`} />
      </div>
      <footer className="border-t border-rule">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-5 text-xs text-muted">kirchnervjohnson.com</div>
      </footer>
    </main>
  );
}
