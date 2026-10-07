// app/contact/page.tsx — how to reach the plaintiff, and what helps: for counsel evaluating representation, for organizations
// coordinating, and for anyone reporting an error in the record. No form; e-mail only, so nothing is stored here.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '../_components/SiteShell';
import { Article, H2, P, UL } from '../_components/legal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `How to reach the plaintiff in ${SITE.name}: for prospective counsel, for organizations, and for corrections.`,
};

export default function Contact() {
  return (
    <SiteShell>
      <Article eyebrow="Contact" title="Reaching the author" lead={<p>The plaintiff can be reached by e-mail. There is no form, so nothing you send is stored by this site.</p>}>
        <p className="font-serif text-xl">
          <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
          <span className="block text-sm text-muted font-sans mt-1">{SITE.author} · {SITE.location}</span>
        </p>

        <H2 id="counsel">For prospective counsel</H2>
        <P>
          If you are evaluating the case for representation, the record is <Link href="/review" className="underline">here</Link> whole, and the
          complaint opens first. What helps in a first message:
        </P>
        <UL>
          <li>Where you are admitted, and whether you practise in the {SITE.courtShort}</li>
          <li>What you would want to read first, if it is not the complaint — the author will point to it by docket entry and page.</li>
          <li>Anything you need for a conflicts check; the parties are as named in the operative pleadings.</li>
        </UL>
        <P>
          Initial communications are treated as confidential to the extent the law allows, and the same is asked in return. E-mail is not a secure
          channel; nothing that must stay privileged should be sent through it. Writing creates no attorney–client relationship and no obligation on
          either side; an engagement is made in writing or not at all.
        </P>

        <H2 id="organizations">For organizations</H2>
        <P>
          If your organization is considering coordination with the plaintiff — as amicus, in policy or academic work, or otherwise — write with the
          organization&rsquo;s name, the purpose, and what you would need from the record. The record is public and may be shared within your
          organization for evaluation.
        </P>

        <H2 id="press">Press</H2>
        <P>
          The author does not litigate the case in public. Questions about the case are answered by reference to the filings, which speak for
          themselves; the docket is the official record.
        </P>

        <H2 id="corrections">Corrections</H2>
        <P>
          A mistaken link, a wrong page, a document that should not be here, or any discrepancy between a page here and the docket: write with the
          docket entry and the page, and it will be corrected.
        </P>
      </Article>
    </SiteShell>
  );
}
