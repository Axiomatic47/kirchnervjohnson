// app/_components/Markdown.tsx — markdown for the timeline's prose (italic case names, bold, links, inline code). The
// same renderer kirchner.ink uses for its archive prose, reduced: no cite: scheme and no math here, since this site has
// no book pages. The timeline body imports `Md` by this path on every site.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Md({ children, inline = false }: { children: string; inline?: boolean }) {
  if (inline) {
    return (
      <span className="[&_p]:inline">
        <ReactMarkdown allowedElements={['p', 'em', 'strong', 'code']} unwrapDisallowed>{children}</ReactMarkdown>
      </span>
    );
  }
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => <a href={href} className="underline text-accent-ink" rel="noopener">{children}</a>,
        code: ({ children }) => <code className="font-mono text-[0.9em] bg-well px-1 rounded">{children}</code>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
