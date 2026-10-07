import Link from 'next/link';
import { SiteShell } from './_components/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <div className="max-w-3xl py-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">404</p>
        <h1 className="mt-3 font-serif text-3xl">There is nothing at this address.</h1>
        <p className="mt-4 text-ink/80">
          <Link href="/" className="text-accent-ink underline">Back to the front page</Link> · <Link href="/review" className="text-accent-ink underline">The case in review</Link>
        </p>
      </div>
    </SiteShell>
  );
}
