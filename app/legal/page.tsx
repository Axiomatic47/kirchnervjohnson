// app/legal/page.tsx — the notices in one place: what the allegations are and are not, what the record here is, no advice
// and no relationship, prospective counsel, nothing sealed, accuracy; then the terms of use, privacy, and copyright and
// reuse. Sections carry anchors (#notices, #terms, #privacy, #copyright). The voice is the author's.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '../_components/SiteShell';
import { Article, H2, H3, P, UL } from '../_components/legal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal',
  description: `Notices, terms of use, privacy, and copyright and reuse for ${SITE.host}.`,
};

export default function Legal() {
  return (
    <SiteShell>
      <Article
        eyebrow="Legal"
        title="Notices, terms, privacy"
        dated
        lead={<p>What must be said about a site that carries the record of a pending case: what the allegations are, what this record is and is not, and on what terms the material may be read and used.</p>}
      >
        <H2 id="notices">Notices</H2>

        <H3>The allegations</H3>
        <P>
          {SITE.notice} A complaint states what a plaintiff alleges; an answer or a motion states what a defendant contends; an order states
          what the court has decided. Nothing on this site should be read as a finding of fact or law against any person, and no inference
          about any party should be drawn from the fact that a document was filed.
        </P>

        <H3>The record, and the official record</H3>
        <P>
          The documents here are the filings in <em>{SITE.name}</em>, No. {SITE.caseNo} ({SITE.courtShort}), presented as filed, with the
          court&rsquo;s stamp where the court has stamped them; five early filings are a filer&rsquo;s copy and say so in their titles. The
          authorities the filings cite are presented from official or public-domain sources, or linked to the official source where they are
          not hosted here. The links, boxes and status words of the review are the author&rsquo;s verification tools and not the court&rsquo;s. The
          official record of the case is the docket of the {SITE.court}, available through PACER; where this site and the docket disagree,
          the docket governs.
        </P>

        <H3>Not legal advice; no attorney–client relationship</H3>
        <P>
          Nothing on this site is legal advice. The author is the plaintiff and appears pro se; he is not a lawyer and does not offer legal
          services. Reading the site, following a link, or writing to the author creates no attorney–client, agency, or other relationship.
          An engagement of counsel, if one comes, is made in writing between the parties to it and not by anything said here.
        </P>

        <H3>Prospective counsel</H3>
        <P>
          Counsel considering representation are welcome to read the record here and to write. The author treats initial communications
          from prospective counsel as confidential to the extent the law allows, and asks the same in return; e-mail is not a secure channel,
          and nothing that must stay privileged should be sent through it. No obligation arises on either side from an inquiry.
        </P>

        <H3>Nothing sealed</H3>
        <P>
          Nothing under seal, subject to a protective order, or otherwise restricted by the court appears on this site. Whether a document is
          served here, linked, or held is decided document by document on the record&rsquo;s own word, and a held document is named only so that a
          citation to it still says what it points at.
        </P>

        <H3>Not a public litigation forum</H3>
        <P>
          The site is for evaluation by prospective counsel and for coordination with organizations. The author does not litigate the case here or
          in public; questions about the case are answered by reference to the filings, and the filings speak for themselves.
        </P>

        <H3>Accuracy and corrections</H3>
        <P>
          The record is kept current against the docket as the case proceeds, and every link is checked against the page it cites. Errors are
          possible. A mistaken link, a wrong page, a document that should not be here, or any other discrepancy should be reported to{' '}
          <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>, and will be corrected.
        </P>

        <H3>No affiliation</H3>
        <P>
          {SITE.host} is published by {SITE.author}, an individual, and is not affiliated with, endorsed by, or an official source of the
          {' '}{SITE.court}, any other court, or any party, organization, or institution named in the record.
        </P>

        <H2 id="terms">Terms of use</H2>
        <P>
          These terms govern your use of {SITE.host}. By using the site you accept them; the notices above and the privacy and copyright
          sections below are part of them.
        </P>
        <H3>What the site is</H3>
        <P>
          The site presents the public record of a pending case for evaluation by prospective counsel and for coordination with
          organizations. Reading is free. There are no accounts, subscriptions or sales. The author may change, add to, or remove material at
          any time, and will as the case proceeds.
        </P>
        <H3>How you may use the material</H3>
        <UL>
          <li>Read, print and download any document the site serves, for evaluation, scholarship, journalism, teaching, or your own use.</li>
          <li>Link to any page, including a deep link to a document at a page.</li>
          <li>Share the record with colleagues, co-counsel, or an organization evaluating the case.</li>
          <li>Quote the author&rsquo;s filings with attribution to the docket.</li>
        </UL>
        <H3>What you may not do</H3>
        <UL>
          <li>Present any document here as a certified or official copy; the official copy is the court&rsquo;s.</li>
          <li>Alter a document and present it as the record, or remove a court stamp, a filer&rsquo;s-copy mark, or an attribution.</li>
          <li>Use the author&rsquo;s contact details to build lists, send unsolicited bulk messages, or impersonate the author.</li>
          <li>Crawl or download at a rate that burdens the site, probe or interfere with the site or its hosting, or use the site for anything unlawful.</li>
        </UL>
        <H3>No warranty; limitation of liability</H3>
        <P>
          The site is provided as is. To the fullest extent the law allows, {SITE.author} is not liable for any indirect, incidental, or
          consequential loss arising from use of the site or reliance on its contents. The record should be confirmed against the docket before
          it is relied on.
        </P>
        <H3>Governing law</H3>
        <P>
          These terms are governed by the laws of the State of Minnesota, United States, without regard to its conflict-of-laws rules. Disputes
          about the site belong in the state or federal courts sitting in Minnesota. Nothing in these terms concerns the case itself, which is
          before the {SITE.court}.
        </P>
        <H3>Changes</H3>
        <P>Changes take effect when posted here, with the date above updated. Continued use after a change is acceptance of it.</P>

        <H2 id="privacy">Privacy</H2>
        <P>The short version: the site handles almost nothing about you.</P>
        <UL>
          <li>
            <strong>Nothing you type.</strong> There are no accounts, forms, comments or sign-ups. The only way to reach the author is e-mail,
            and what you send by e-mail is handled like any other correspondence.
          </li>
          <li>
            <strong>No analytics, no cookies, no third-party scripts.</strong> The site sets no cookie, counts nothing, and loads no script,
            font, or pixel from any other party.
          </li>
          <li>
            <strong>Your browser.</strong> The review window and the document viewer run entirely in your browser; documents are fetched from
            this site and rendered locally. Nothing about what you read is sent anywhere.
          </li>
          <li>
            <strong>Hosting logs.</strong> The site is hosted on Netlify. Like any web host, Netlify may record technical details of requests
            (IP address, browser, pages requested, time) in short-lived server logs for security and operations. The author does not receive
            or analyse per-visitor logs.
          </li>
          <li>
            <strong>E-mail.</strong> Messages sent to {SITE.email} are delivered to the author&rsquo;s mailbox and kept as long as the
            correspondence is useful. They are not shared except as needed to respond, as an engagement of counsel requires, or where the law
            requires.
          </li>
        </UL>
        <P>
          The site is not directed at children and knowingly collects nothing from them. Because the site stores nothing that identifies you,
          there is nothing to access, correct, or delete beyond e-mail you have sent, which the author will delete on request.
        </P>

        <H2 id="copyright">Copyright and reuse</H2>
        <UL>
          <li>
            <strong>The filings</strong> are public records of the court and are reproduced here as filed. The author&rsquo;s own filings and
            writing are his copyright, © {new Date().getFullYear()} {SITE.author}; quotation with attribution to the docket is welcome, and
            republication in full is permitted for the purposes the terms allow. Filings by other parties are reproduced as part of the public
            record and remain their authors&rsquo;.
          </li>
          <li>
            <strong>Exhibits</strong> are reproduced as filed, as part of the record, and no more; where an exhibit carries a third party&rsquo;s
            copyright, that copyright remains theirs.
          </li>
          <li>
            <strong>Authorities</strong> — case law, statutes, rules, regulations, the Constitution and government works — are in the public domain
            or presented from official sources; secondary sources are hosted only where their terms allow, and otherwise linked.
          </li>
          <li>
            <strong>Software.</strong> The review window and the citation checker that keeps it current are the author&rsquo;s own; the document
            viewer uses PDF.js, an open-source library from Mozilla, licensed under the Apache License 2.0; the site is built with Next.js and
            hosted on Netlify.
          </li>
        </UL>
        <P>
          Permission requests, notices and corrections go to <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>; see also{' '}
          <Link href="/contact" className="underline">Contact</Link>.
        </P>
      </Article>
    </SiteShell>
  );
}
