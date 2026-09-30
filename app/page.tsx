// The under-construction page. One static page, no client script: what the site is, and what it
// will carry when it opens.
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-5 flex items-baseline justify-between gap-6">
          <span className="font-serif text-lg tracking-wide">Kirchner <span className="text-muted">v.</span> Johnson</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted">Under construction</span>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-ink">United States District Court for the District of Columbia</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">
            Kirchner <span className="text-muted">v.</span> Johnson
          </h1>
          <p className="mt-2 font-serif text-lg text-muted">No. 1:25-cv-02735-ACR</p>

          <div className="mt-10 h-px w-16 bg-accent" />

          <p className="mt-8 max-w-prose text-lg leading-relaxed">
            This site is under construction.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-ink-2">
            When it opens it will carry the filings in the case with every citation linked to the
            source it cites — the exhibit page, the docket entry, the opinion, the statute — so that a
            reader can check the record page by page.
          </p>
        </div>
      </section>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-5 text-xs text-muted">kirchnervjohnson.com</div>
      </footer>
    </main>
  );
}
