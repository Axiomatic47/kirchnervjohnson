import type { Metadata } from 'next';
import './globals.css';

export const SITE_ORIGIN = 'https://kirchnervjohnson.com';
export const SITE_NAME = 'Kirchner v. Johnson';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: 'Kirchner v. Johnson, No. 1:25-cv-02735-ACR (D.D.C.): the record of the case with every citation linked to its source, for evaluation by prospective counsel and for coordination with organizations.',
  // not launched: nothing here is for the index yet — the one flag to drop at launch, with public/robots.txt (README)
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // applied before first paint so a dark visitor never sees a light flash (CSP allows inline script)
  const themeScript = `(function(){try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}catch(e){}})();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
