// src/lib/site.ts — the site's own facts, in one place: who publishes it, what case it carries, what it is for and what
// must be said on every page. Docket facts are as the court's record has them; the two sentences every reader must see
// (purpose, notice) are the owner's word of 2026-10-06 and are rendered on the home page, the footer and the notices.
export const SITE = {
  host: 'kirchnervjohnson.com',
  origin: 'https://kirchnervjohnson.com',
  name: 'Kirchner v. Johnson',
  author: 'Joseph Kirchner',
  email: 'joseph@kirchner.ink',
  location: 'Edina, Minnesota',
  authorSite: 'https://kirchner.ink',
  court: 'United States District Court for the District of Columbia',
  courtShort: 'D.D.C.',
  caseNo: '1:25-cv-02735-ACR',
  judge: 'Judge Ana C. Reyes',
  filed: 'August 19, 2025',
  /** the caption of the complaint as first filed (ECF 1); later parties are as named in the operative pleadings */
  captionAsFiled:
    'Joseph Kirchner, plaintiff, against Mike Johnson, in his individual and official capacity as Speaker of the United States House of Representatives; Pam Bondi, in her individual and official capacity as Attorney General of the United States; the United States House of Representatives; and Does 1–20',
  purpose:
    'This site exists for two readers: counsel evaluating the case for prospective representation, and organizations coordinating with the plaintiff. It is not a forum for litigating the case in public.',
  notice:
    'Every allegation here is an allegation. All claims are subject to adjudication by an Article III judge, and by a jury where one is demanded; nothing has been decided except as an order of the court says.',
  legalUpdated: 'October 6, 2026',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/review', label: 'The case in review' },
  { href: '/about', label: 'About' },
  { href: '/legal', label: 'Legal' },
  { href: '/contact', label: 'Contact' },
] as const;
