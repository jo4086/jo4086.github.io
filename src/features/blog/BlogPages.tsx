import { ArrowLeft, ArrowRight, Download, Menu, X } from 'lucide-react'
import { type ReactNode, useRef } from 'react'
import Markdown from 'react-markdown'
import { Link, useParams, useSearchParams } from 'react-router'
import remarkGfm from 'remark-gfm'

import { NotFoundPage } from '../../pages/NotFoundPage'
import { getProject } from '../portfolio/projects'

import { BlogSidebar } from './BlogSidebar'
import { type Heading, getHeadings, getPost, posts } from './posts'
import { TableOfContents } from './TableOfContents'
import '../../styles/markdown.css'

const backLink = 'inline-flex items-center gap-2 text-[13px] font-bold text-muted hover:underline'
const postTagClass = 'rounded-md bg-[#edf3f8] px-2 py-1 text-[10px] font-semibold text-[#45637d]'

function BlogFrame({ children, detail = false }: { children: ReactNode; detail?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <main
      className={`mx-auto min-h-[720px] w-[calc(100%-36px)] min-[900px]:grid min-[900px]:w-[calc(100%-64px)] ${detail ? 'max-w-[1500px] min-[900px]:grid-cols-[215px_minmax(0,1fr)] min-[900px]:gap-10' : 'max-w-[1380px] min-[900px]:grid-cols-[240px_minmax(0,1fr)] min-[900px]:gap-[58px]'}`}
    >
      <aside className="hidden border-r border-line py-10 pr-5 min-[900px]:block">
        <BlogSidebar />
      </aside>
      <div className="min-w-0 pt-12 pb-24 max-[900px]:pt-8">
        <button
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-bold text-accent-deep min-[900px]:hidden"
          type="button"
          onClick={() => dialogRef.current?.showModal()}
        >
          <Menu size={17} aria-hidden="true" /> 블로그 탐색
        </button>
        {children}
      </div>
      <dialog
        className="ml-auto h-dvh max-h-none w-[min(88vw,340px)] border-0 bg-white p-0 shadow-[-12px_0_40px_#162c4426] backdrop:bg-[#13243e88]"
        ref={dialogRef}
        aria-label="블로그 탐색"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="h-full overflow-y-auto px-5 pt-5 pb-10">
          <div className="mb-6 flex items-center justify-between">
            <strong>블로그 탐색</strong>
            <button
              className="grid place-items-center border-0 bg-transparent p-1.5"
              type="button"
              aria-label="탐색 닫기"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <BlogSidebar onNavigate={() => dialogRef.current?.close()} />
        </div>
      </dialog>
    </main>
  )
}

function formatDate(date: string): string {
  return date.replaceAll('-', '.')
}

export function BlogListPage() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim().toLocaleLowerCase()
  const category = params.get('category') ?? ''
  const tag = params.get('tag') ?? ''
  const archive = params.get('archive') ?? ''
  const recent = params.get('view') === 'recent'

  let visible = posts.filter((post) => {
    if (category && post.category !== category && !post.category.startsWith(`${category}/`))
      return false
    if (tag && !post.tags.includes(tag)) return false
    if (archive && !post.date.startsWith(archive)) return false
    if (
      query &&
      !`${post.title} ${post.summary} ${post.tags.join(' ')}`.toLocaleLowerCase().includes(query)
    )
      return false
    return true
  })
  if (recent) visible = visible.slice(0, 5)

  const title = query
    ? `“${params.get('q')}” 검색 결과`
    : category || tag || archive || (recent ? '최근 글' : '전체 글')

  return (
    <BlogFrame>
      <div className="border-b border-line pb-8">
        <p className="text-[11px] font-extrabold tracking-[.16em] text-accent">NOTES & STORIES</p>
        <h1 className="mt-3 mb-2 text-[clamp(36px,4vw,50px)] font-[820] tracking-[-.05em]">
          {title}
        </h1>
        <p className="text-sm text-muted">개발과 기술 탐구, 일상에서 남긴 기록을 모았습니다.</p>
        <span className="mt-6 block text-[11px] font-bold text-subtle">
          {visible.length}개의 글
        </span>
      </div>
      <div>
        {visible.map((post) => (
          <article className="border-b border-line px-1 py-7" key={post.slug}>
            <div className="flex justify-between gap-3 text-[11px] font-bold text-accent">
              <span>{post.category.replaceAll('/', ' · ')}</span>
              <time className="font-normal text-subtle" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            <h2 className="mt-3 mb-2 text-[clamp(19px,2.2vw,24px)] leading-[1.35] font-extrabold tracking-[-.035em]">
              <Link
                className="group inline-flex items-center gap-3 hover:text-accent-deep"
                to={`/blog/${post.slug}`}
              >
                {post.title}
                <ArrowRight
                  className="opacity-0 group-hover:opacity-100 max-[680px]:hidden"
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </h2>
            <p className="mb-4 text-[13px] leading-7 text-muted">{post.summary}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((item) => (
                <span className={postTagClass} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="px-4 py-12 text-center text-muted">
          <strong className="mb-2 block text-ink">일치하는 글이 없습니다.</strong>
          <p>검색어나 필터를 바꿔 보세요.</p>
          <Link
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-accent-deep hover:underline"
            to="/blog"
          >
            전체 글 보기 <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      )}
    </BlogFrame>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFoundPage />

  const headings = getHeadings(post.body)
  const headingByLine = new Map<number, Heading>(headings.map((heading) => [heading.line, heading]))
  const relatedProjects = post.relatedProjectSlugs
    .map(getProject)
    .filter((project) => project !== undefined)

  return (
    <BlogFrame detail>
      <div className="mx-auto max-w-[760px] min-[1350px]:grid min-[1350px]:max-w-none min-[1350px]:grid-cols-[minmax(0,760px)_175px] min-[1350px]:justify-center min-[1350px]:gap-[clamp(28px,3vw,52px)]">
        <article className="min-w-0">
          <Link className={backLink} to="/blog">
            <ArrowLeft size={15} aria-hidden="true" /> 전체 글
          </Link>
          <header className="mt-8 mb-9">
            <p className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              {post.category.replaceAll('/', ' / ')}
            </p>
            <h1 className="mt-3 mb-4 text-[clamp(33px,3.6vw,48px)] leading-[1.25] font-[830] tracking-[-.05em] [word-break:keep-all] max-[680px]:text-[34px]">
              {post.title}
            </h1>
            <p className="text-base leading-7 text-muted">{post.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] text-subtle">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.tags.join(' · ')}</span>
            </div>
            {post.pdfPath && (
              <a
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-bold text-accent-deep hover:bg-soft"
                href={post.pdfPath}
                download
              >
                PDF로 읽기 <Download size={16} aria-hidden="true" />
              </a>
            )}
          </header>
          {headings.length > 0 && (
            <details className="mobile-toc mb-9 rounded-lg border border-line bg-white px-4 py-3 min-[1350px]:hidden">
              <summary className="flex cursor-pointer justify-between text-[13px] font-bold">
                이 글의 목차{' '}
                <span className="text-[11px] text-subtle">{headings.length}개 항목</span>
              </summary>
              <div className="mt-4">
                <TableOfContents headings={headings} />
              </div>
            </details>
          )}
          <div className="markdown-body break-words text-[15px] leading-[1.95] text-[#304359]">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, children }) => (
                  <h2 id={headingByLine.get(node?.position?.start.line ?? 0)?.id} tabIndex={-1}>
                    {children}
                  </h2>
                ),
                h3: ({ node, children }) => (
                  <h3 id={headingByLine.get(node?.position?.start.line ?? 0)?.id} tabIndex={-1}>
                    {children}
                  </h3>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.body}
            </Markdown>
          </div>
          {relatedProjects.length > 0 && (
            <section className="mt-14 border-t border-line pt-7">
              <h2 className="mb-3 text-base font-extrabold">관련 프로젝트</h2>
              {relatedProjects.map((project) => (
                <Link
                  className="flex items-center justify-between rounded-lg border border-line p-4 font-bold hover:border-[#b8ccdc] hover:text-accent"
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                >
                  {project.name}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </section>
          )}
          <Link className={`${backLink} mt-11`} to="/blog">
            <ArrowLeft size={15} aria-hidden="true" /> 다른 글 보기
          </Link>
        </article>
        <aside className="hidden border-l border-line pt-20 pl-5 min-[1350px]:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </BlogFrame>
  )
}
