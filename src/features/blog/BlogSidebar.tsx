import { Archive, ChevronDown, Clock3, FolderTree, Search, Tags } from 'lucide-react'
import { type FormEvent, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

import { type CategoryNode, getArchives, getCategories, getTags, posts } from './posts'

interface BlogSidebarProps {
  onNavigate?: () => void
}

const sideLink =
  'flex min-h-[34px] items-center gap-2 rounded-md px-2 py-1 text-xs text-[#4d6075] hover:bg-[#f4f7fa] hover:text-accent-deep'
const activeLink = 'bg-[#e9f1f8] font-bold text-accent-deep'
const sideSection = 'border-b border-line py-6 last:border-0'

function CategoryBranch({
  node,
  active,
  onNavigate,
}: {
  node: CategoryNode
  active: string
  onNavigate?: () => void
}) {
  const [expanded, setExpanded] = useState(active.startsWith(node.path))
  const path = `/blog?category=${encodeURIComponent(node.path)}`
  if (node.children.length === 0) {
    return (
      <li>
        <Link
          className={`${sideLink} ${active === node.path ? activeLink : ''}`}
          to={path}
          onClick={onNavigate}
        >
          <span>{node.label}</span>
          <small className="ml-auto text-[10px] text-subtle">{node.count}</small>
        </Link>
      </li>
    )
  }

  return (
    <li>
      <details
        className="category-group group"
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary className="flex min-h-[34px] cursor-pointer list-none items-center gap-2 px-2 py-1 text-xs font-bold [&::-webkit-details-marker]:hidden">
          <ChevronDown className="-rotate-90 group-open:rotate-0" size={14} aria-hidden="true" />
          <span>{node.label}</span>
          <small className="ml-auto text-[10px] text-subtle">{node.count}</small>
        </summary>
        <ul className="ml-4 border-l border-line pl-2">
          <li>
            <Link
              className={`${sideLink} text-[11px] ${active === node.path ? activeLink : ''}`}
              to={path}
              onClick={onNavigate}
            >
              {node.label} 전체
            </Link>
          </li>
          {node.children.map((child) => (
            <CategoryBranch key={child.path} node={child} active={active} onNavigate={onNavigate} />
          ))}
        </ul>
      </details>
    </li>
  )
}

export function BlogSidebar({ onNavigate }: BlogSidebarProps) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const queryRef = useRef<HTMLInputElement>(null)
  const currentQuery = params.get('q') ?? ''

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = new URLSearchParams(params)
    const query = queryRef.current?.value.trim() ?? ''
    if (query) next.set('q', query)
    else next.delete('q')
    navigate(`/blog${next.size ? `?${next}` : ''}`)
    onNavigate?.()
  }

  const activeCategory = params.get('category') ?? ''
  const activeTag = params.get('tag') ?? ''
  const activeArchive = params.get('archive') ?? ''

  return (
    <nav className="blog-sidebar-content sticky top-6" aria-label="블로그 탐색">
      <div className="mb-5 flex items-center justify-between text-xs font-extrabold tracking-[.04em]">
        BLOG INDEX{' '}
        <span className="text-[11px] text-subtle">{String(posts.length).padStart(2, '0')}</span>
      </div>
      <form
        className="flex h-[41px] items-center gap-2 rounded-md border border-line bg-white px-3 text-subtle focus-within:border-accent"
        role="search"
        onSubmit={submitSearch}
      >
        <label
          className="sr-only"
          htmlFor={onNavigate ? 'mobile-blog-search' : 'desktop-blog-search'}
        >
          게시글 검색
        </label>
        <Search size={16} aria-hidden="true" />
        <input
          className="min-w-0 flex-1 border-0 bg-transparent text-xs text-ink outline-none placeholder:text-subtle"
          key={currentQuery}
          type="search"
          id={onNavigate ? 'mobile-blog-search' : 'desktop-blog-search'}
          ref={queryRef}
          defaultValue={currentQuery}
          placeholder="글 검색..."
        />
        <button type="submit" className="sr-only">
          검색
        </button>
      </form>
      <div className="border-b border-line pt-4 pb-5">
        <Link
          className={`${sideLink} ${!params.toString() ? activeLink : ''}`}
          to="/blog"
          onClick={onNavigate}
        >
          <FolderTree size={16} aria-hidden="true" /> 전체 글{' '}
          <small className="ml-auto text-[10px] text-subtle">{posts.length}</small>
        </Link>
        <Link
          className={`${sideLink} ${params.get('view') === 'recent' ? activeLink : ''}`}
          to="/blog?view=recent"
          onClick={onNavigate}
        >
          <Clock3 size={16} aria-hidden="true" /> 최근 글
        </Link>
      </div>
      <div className={sideSection}>
        <h2 className="mb-3 ml-2 text-[11px] font-extrabold">카테고리</h2>
        <ul>
          {getCategories().map((node) => (
            <CategoryBranch
              key={node.path}
              node={node}
              active={activeCategory}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
      <div className={sideSection}>
        <h2 className="mb-3 ml-2 flex items-center gap-2 text-[11px] font-extrabold">
          <Tags size={15} aria-hidden="true" /> 태그
        </h2>
        <div className="flex flex-wrap gap-1.5 px-1">
          {getTags().map(({ label, count }) => (
            <Link
              key={label}
              className={`rounded-md border px-2 py-1 text-[10px] ${activeTag === label ? 'border-[#adc6db] text-accent-deep' : 'border-transparent bg-soft text-[#526c83] hover:border-[#adc6db]'}`}
              to={`/blog?tag=${encodeURIComponent(label)}`}
              onClick={onNavigate}
            >
              {label} <span className="text-subtle">{count}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={sideSection}>
        <h2 className="mb-3 ml-2 flex items-center gap-2 text-[11px] font-extrabold">
          <Archive size={15} aria-hidden="true" /> 아카이브
        </h2>
        <ul>
          {getArchives().map(({ month, count }) => (
            <li key={month}>
              <Link
                className={`${sideLink} ${activeArchive === month ? activeLink : ''}`}
                to={`/blog?archive=${month}`}
                onClick={onNavigate}
              >
                <span>{month}</span>
                <small className="ml-auto text-[10px] text-subtle">{count}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
