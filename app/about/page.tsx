// app/about/page.tsx — what this site is for, what the case is, how the review works, what is not here, who the
// author is. Docket facts from src/lib/site.ts; the filings themselves are in the review.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '../_components/SiteShell';
import { Article, H2, P, UL } from '../_components/legal';
import { SITE } from '@/lib/site';
import { hasImmunityTimeline } from '@/lib/immunity-timeline.server';

export const metadata: Metadata = {
  title: 'About',
  description: `What ${SITE.host} is for, what the case is, how the review works and what is not here.`,
};

export default function About() {
  const timeline = hasImmunityTimeline();
  return (
    <SiteShell>
      <Article eyebrow="About" title="About this site" lead={<p>{SITE.purpose}</p>}>
        <H2 id="purpose">What the site is for</H2>
        <P>
          Two readers are meant to find this site useful. The first is counsel evaluating the case for prospective representation, who
          needs the record whole, in order, and checkable — every filing, every exhibit, every authority cited, each at the page cited.
          The second is an organization coordinating with the plaintiff, which needs the same record and the same ability to check it.
        </P>
        <P>
          It is not a forum for litigating the case in public. There is no commentary here, no argument beyond what the filings make, and
          no comment section. {SITE.notice} The court decides, and the filings on both sides are presented as filed, in the same way.
        </P>

        <H2 id="case">The case</H2>
        <P>
          <em>Kirchner v. Johnson</em>, No. {SITE.caseNo}, in the {SITE.court}, assigned to {SITE.judge}; filed {SITE.filed}, with a jury
          demand. The complaint as first filed is captioned {SITE.captionAsFiled}. Later parties, and the pleadings that govern now, are
          as named in the record itself. The plaintiff appears pro se.
        </P>
        <P>
          The complaint and every later filing — the parties&rsquo; motions, memoranda, declarations, exhibits and the court&rsquo;s orders — are
          in <Link href="/review?casereview=doc%3DDDC-001" className="underline">the review</Link>, where the complaint opens first; what the case
          alleges and what the defendants answer is read there, in the parties&rsquo; own words.
        </P>

        <H2 id="review">How the review works</H2>
        <P>
          The review is a window in three parts. At the far left is the docket: the filings in descending order with their attachments
          under them, and below them the authorities the filings cite — case law, statutes, rules, the Constitution, other case records,
          secondary sources. In the left pane is the document under review, with every citation it makes drawn as a box on the page. In the
          right pane is whatever a box opens: the cited source at the cited page, with the passage boxed where the page carries it.
        </P>
        <UL>
          <li><strong>Served</strong> means the document is hosted on this site, byte for byte the record copy.</li>
          <li><strong>Linked</strong> means it is not hosted here, and the pane names the official source where it is read.</li>
          <li><strong>Held</strong> means it is not published here yet; the entry is kept so that a citation to it still says what it points at.</li>
        </UL>
        <P>
          The boxes, the links and the status words are the author&rsquo;s own verification tools, kept current against the record as the case
          proceeds; they are not the court&rsquo;s and they decide nothing. The official record is the court&rsquo;s docket, and where a page here and
          the docket disagree, the docket governs. Five early filings carry a filer&rsquo;s copy rather than the court&rsquo;s stamped copy and are
          marked so in their titles.
        </P>

        <H2 id="not-here">What is not here</H2>
        <UL>
          <li>Nothing under seal or subject to a protective order. Publication follows the record&rsquo;s own word on each document.</li>
          <li>No commentary on the case, no characterization of any party beyond the filings&rsquo; own, and no comments from readers.</li>
          <li>No accounts, no forms, no analytics, no cookies and no third-party scripts. The documents render in your browser.</li>
        </UL>

        <H2 id="author">The author</H2>
        <P>
          The site is published by {SITE.author}, the plaintiff, of {SITE.location}. His writing and research, including the history of
          official immunity from which the case&rsquo;s immunity arguments are drawn, are at{' '}
          <a href={SITE.authorSite} className="underline" rel="me noopener">kirchner.ink</a>.
          {timeline && <> A timeline of that history, with every entry resting on the record, is <Link href="/research/immunity-timeline" className="underline">here as well</Link>.</>}
        </P>

        <H2 id="reach">Reaching the author</H2>
        <P>
          Prospective counsel and organizations will find what helps on the <Link href="/contact" className="underline">contact page</Link>. Writing
          creates no attorney–client relationship; an engagement is made in writing or not at all.
        </P>
      </Article>
    </SiteShell>
  );
}
