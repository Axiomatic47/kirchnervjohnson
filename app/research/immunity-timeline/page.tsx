// app/research/immunity-timeline/page.tsx — the actual history of immunity, in all its categories, shared outward as the
// record (owner's words 2026-10-06 and 10-07: on this site, on kirchner.ink and on lawsofexistence.com; the timeline is to
// share, not a comparison against anyone else's, so the comparison block came off the page). The content is
// public/research/immunity-timeline.json, the same reviewed file on every site (src/lib/immunity-timeline.ts is the shape,
// scripts/validate-timeline.mjs the gate); the body is TimelineBody.tsx, byte-identical on every site; this file is this
// site's shell around it — the site chrome and the way home. No content → 404.
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../_components/SiteShell';
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
    <SiteShell wide>
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink no-underline mb-6">← Home</Link>
      <TimelineBody t={t} bookBase={`https://kirchner.ink/work/${t.provenance.book_slug}`} contactHref="/contact" />
    </SiteShell>
  );
}
