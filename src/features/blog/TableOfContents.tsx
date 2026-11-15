import { type Heading } from './posts'

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  function goToHeading(id: string) {
    const element = document.getElementById(id)
    element?.scrollIntoView({ block: 'start' })
    element?.focus({ preventScroll: true })
  }

  if (headings.length === 0) return null

  return (
    <nav
      className={`toc-content sticky top-8 max-[1350px]:static ${className}`}
      aria-label="이 글의 목차"
    >
      <h2 className="mb-4 text-xs font-extrabold max-[1350px]:hidden">이 글의 목차</h2>
      <ol className="border-l border-line pl-3">
        {headings.map((heading) => (
          <li key={heading.id} className={`mb-3 leading-6 ${heading.level === 3 ? 'pl-2' : ''}`}>
            <button
              className="text-left text-[11px] leading-6 text-muted hover:text-accent"
              type="button"
              onClick={() => goToHeading(heading.id)}
            >
              {heading.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
