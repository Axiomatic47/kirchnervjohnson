import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">404</p>
        <h1 className="mt-3 font-serif text-3xl">There is nothing at this address.</h1>
        <p className="mt-4 text-ink-2">
          <Link href="/" className="text-accent-ink underline">Back to the front page</Link>
        </p>
      </div>
    </main>
  );
}
