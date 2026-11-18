import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

import { type ProjectStory, projectStories } from './projectStories'
import { TechnicalCaseOverview } from './TechnicalCaseOverview'

const sections = [
  { id: 'overview', label: '한눈에 보기' },
  { id: 'problem', label: '풀려는 문제' },
  { id: 'process', label: '만든 방식' },
  { id: 'architecture', label: '구조 이해하기' },
  { id: 'flow', label: '작업 흐름' },
  { id: 'status', label: '현재 결과' },
  { id: 'sources', label: '더 읽기' },
]

const sectionClass = 'scroll-mt-8 border-t border-line py-14 outline-none sm:py-20'
const sectionTitle =
  'mt-3 max-w-[740px] text-[clamp(27px,3vw,38px)] leading-tight font-extrabold tracking-[-.05em]'
const bodyText = 'max-w-[720px] text-[15px] leading-[1.9] text-muted sm:text-base'

function goToSection(id: string) {
  const section = document.getElementById(id)
  section?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  section?.focus({ preventScroll: true })
}

function SectionLinks({ onSelect }: { onSelect?: () => void }) {
  return (
    <ol className="space-y-1">
      {sections.map((section, index) => (
        <li key={section.id}>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold text-muted hover:bg-soft hover:text-accent-deep"
            type="button"
            onClick={() => {
              goToSection(section.id)
              onSelect?.()
            }}
          >
            <span className="w-5 text-[10px] font-bold tabular-nums text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            {section.label}
          </button>
        </li>
      ))}
    </ol>
  )
}

function StateTag({ state }: { state: string }) {
  const className =
    state === '확인된 범위'
      ? 'bg-[#e6f3ed] text-[#276349]'
      : state === '계획'
        ? 'bg-[#f1eef8] text-[#65518b]'
        : state === '미확인'
          ? 'bg-[#f5f1e9] text-[#775f39]'
          : 'bg-[#fff1df] text-[#8b5d22]'

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${className}`}>{state}</span>
  )
}

function ArchitectureMap({ story }: { story: ProjectStory }) {
  return (
    <figure className="mt-8">
      <div className="grid gap-3 rounded-[20px] border border-line bg-[#f4f8fc] p-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch sm:p-6">
        {story.architecture.map((node, index) => (
          <div className="contents" key={node.label}>
            <div className="min-w-0 rounded-2xl border border-[#ccdae7] bg-white p-5 shadow-[0_8px_25px_#173b5e0a]">
              <span className="text-[11px] font-extrabold tracking-[.12em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-extrabold tracking-[-.03em]">{node.label}</h3>
              <p className="mt-2 text-[13px] leading-6 text-muted">{node.detail}</p>
            </div>
            {index < story.architecture.length - 1 && (
              <span
                className="grid place-items-center text-xl font-bold text-accent max-sm:rotate-90"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      {story.sharedLayer && (
        <div className="mt-3 rounded-2xl border border-[#a9c4d8] bg-[#e8f1f8] p-5 sm:p-6">
          <h3 className="text-[15px] font-extrabold text-accent-deep">{story.sharedLayer.label}</h3>
          <p className="mt-2 max-w-[760px] text-sm leading-7 text-[#425d75]">
            {story.sharedLayer.detail}
          </p>
        </div>
      )}
      <figcaption className="mt-4 max-w-[760px] text-sm leading-7 text-muted">
        {story.architectureNote}
      </figcaption>
    </figure>
  )
}

function FlowMap({ story }: { story: ProjectStory }) {
  return (
    <figure className="mt-8">
      <ol className={`grid gap-3 ${story.flow.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-5'}`}>
        {story.flow.map((step, index) => (
          <li
            className={`relative flex min-w-0 flex-col rounded-2xl border p-5 md:min-h-[165px] ${step.state === '계획' ? 'border-dashed border-[#b9aed1] bg-[#f8f6fc]' : 'border-line bg-white'}`}
            key={step.label}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] font-extrabold tracking-[.12em] text-accent">
                STEP {String(index + 1).padStart(2, '0')}
              </span>
              {step.state && <StateTag state={step.state} />}
            </div>
            <h3 className="mt-5 text-base font-extrabold tracking-[-.03em]">{step.label}</h3>
            <p className="mt-2 text-[13px] leading-6 text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 max-w-[760px] text-sm leading-7 text-muted">
        {story.flowNote}
      </figcaption>
    </figure>
  )
}

export function ProjectStoryPage({ slug }: { slug: 'maple-insight' | 'codex-workspace' }) {
  const story = projectStories[slug]
  const mobileTocRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    document.title = `${story.title} | JO4086`
    window.scrollTo(0, 0)
  }, [story.title])

  return (
    <div className="min-h-screen bg-page">
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:bg-white focus:p-3"
        type="button"
        onClick={() => document.getElementById('project-main')?.focus()}
      >
        본문으로 건너뛰기
      </button>
      <div className="mx-auto flex w-[calc(100%-36px)] max-w-[1380px] items-center justify-between gap-4 border-b border-line py-4 sm:w-[calc(100%-64px)]">
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-accent-deep hover:underline"
          to="/projects"
        >
          <ArrowLeft size={16} aria-hidden="true" /> 프로젝트 목록
        </Link>
        <Link className="text-sm font-extrabold tracking-[-.05em]" to="/" aria-label="JO4086 홈">
          JO4086<span className="text-accent">.</span>
        </Link>
      </div>

      <main
        id="project-main"
        tabIndex={-1}
        className="mx-auto w-[calc(100%-36px)] max-w-[1380px] pb-28 outline-none sm:w-[calc(100%-64px)] lg:grid lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-14"
      >
        <article className="min-w-0">
          <section
            id="overview"
            className="scroll-mt-8 pb-14 pt-16 outline-none sm:pb-20 sm:pt-24"
            tabIndex={-1}
          >
            <p className="text-[11px] font-extrabold tracking-[.2em] text-accent">{story.kicker}</p>
            <h1 className="mt-4 text-[clamp(43px,6vw,78px)] leading-[1.05] font-extrabold tracking-[-.07em]">
              {story.title}
            </h1>
            <p className="mt-7 max-w-[860px] text-[clamp(19px,2.3vw,27px)] leading-[1.6] font-semibold tracking-[-.025em] text-[#304b64]">
              {story.lead}
            </p>
            <div className="mt-9 inline-flex flex-wrap items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-[13px] text-muted">
              <span className="font-bold text-ink">누구를 위한 작업인가요?</span>
              <span>{story.audience}</span>
            </div>
            <Link
              className="mt-9 flex w-fit items-center gap-2 text-sm font-bold text-accent-deep hover:underline"
              to="/projects"
            >
              다른 프로젝트 보기 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>

          <details
            ref={mobileTocRef}
            className="mb-8 rounded-xl border border-line bg-white px-4 py-3 lg:hidden"
          >
            <summary className="cursor-pointer text-sm font-bold">이 페이지의 목차</summary>
            <nav className="mt-3 border-t border-line pt-3" aria-label="프로젝트 목차">
              <SectionLinks onSelect={() => mobileTocRef.current?.removeAttribute('open')} />
            </nav>
          </details>

          <section id="problem" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              01 / PROBLEM
            </span>
            <h2 className={sectionTitle}>어떤 문제를 풀고 있나요?</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="text-sm font-extrabold text-accent-deep">상황</h3>
                <p className={`mt-3 ${bodyText}`}>{story.situation}</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="text-sm font-extrabold text-accent-deep">선택</h3>
                <p className={`mt-3 ${bodyText}`}>{story.decision}</p>
              </div>
            </div>
          </section>

          <section id="process" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              02 / PROCESS
            </span>
            <h2 className={sectionTitle}>어떻게 만들었나요?</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="text-sm font-extrabold text-accent-deep">나의 역할</h3>
                <p className={`mt-3 ${bodyText}`}>{story.ownership}</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="text-sm font-extrabold text-accent-deep">AI와 협업한 방식</h3>
                <p className={`mt-3 ${bodyText}`}>{story.aiWorkflow}</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-[#b9d2e4] bg-[#eaf3f9] p-6 sm:p-8">
              <p className="text-[11px] font-extrabold tracking-[.12em] text-accent">
                두 프로젝트의 연결
              </p>
              <p className="mt-3 max-w-[800px] text-[15px] leading-[1.9] text-[#304b64]">
                {story.connection}
              </p>
              <Link
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-deep hover:underline"
                to={`/projects/${story.connectionSlug}`}
              >
                {story.connectionTitle} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section id="architecture" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              03 / ARCHITECTURE
            </span>
            <h2 className={sectionTitle}>{story.architectureTitle}</h2>
            <p className={`mt-5 ${bodyText}`}>{story.architectureIntro}</p>
            <ArchitectureMap story={story} />
            {story.dataStudio && (
              <div className="mt-10 border-t border-line pt-10">
                <h3 className="text-[23px] font-extrabold tracking-[-.04em]">
                  왜 Electron을 별도 앱으로 만들었나요?
                </h3>
                <p className={`mt-4 ${bodyText}`}>{story.dataStudio.rationale}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                    <p className="text-[11px] font-extrabold tracking-[.12em] text-accent">
                      WEB · 역할 구상
                    </p>
                    <h4 className="mt-3 text-base font-extrabold">사이트 관리자</h4>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {story.dataStudio.siteAdmin}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#a9c4d8] bg-[#eaf3f9] p-5 sm:p-6">
                    <p className="text-[11px] font-extrabold tracking-[.12em] text-accent">
                      DESKTOP · 구현 중
                    </p>
                    <h4 className="mt-3 text-base font-extrabold">Electron Data Studio</h4>
                    <p className="mt-2 text-sm leading-7 text-muted">{story.dataStudio.electron}</p>
                  </div>
                </div>
                <figure className="mt-8">
                  <img
                    className="mx-auto block h-auto w-full max-w-[600px]"
                    src="/diagrams/maple-insight-data-studio.svg"
                    alt={story.dataStudio.diagramAlt}
                    width={480}
                    height={1090}
                  />
                  <figcaption className="mt-4 max-w-[760px] text-sm leading-7 text-muted">
                    {story.dataStudio.diagramSummary}
                  </figcaption>
                </figure>
                <p className={`mt-5 ${bodyText}`}>{story.dataStudio.result}</p>
                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-deep hover:underline"
                  href="https://github.com/jo4086/maple-insight/blob/main/tools/maple-skill-extractor/README.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  스킬 이미지 추출기 검증 기록 <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            )}
            {story.slug === 'maple-insight' && <TechnicalCaseOverview />}
          </section>

          <section id="flow" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              04 / FLOW
            </span>
            <h2 className={sectionTitle}>{story.flowTitle}</h2>
            <p className={`mt-5 ${bodyText}`}>{story.flowIntro}</p>
            <FlowMap story={story} />
          </section>

          <section id="status" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              05 / STATUS
            </span>
            <h2 className={sectionTitle}>지금 어디까지 왔나요?</h2>
            <p className={`mt-5 ${bodyText}`}>
              소스와 문서에서 확인한 범위입니다. 실제 운영이나 설치 여부와 같은 추가 검증은 구분해
              적었습니다.
            </p>
            <ul className="mt-8 grid gap-3">
              {story.facts.map((fact) => (
                <li
                  className="flex flex-col gap-3 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  key={fact.label}
                >
                  <div>
                    <h3 className="text-[15px] font-extrabold">{fact.label}</h3>
                    <p className="mt-1 text-[13px] leading-6 text-muted">{fact.detail}</p>
                  </div>
                  <div className="shrink-0">
                    <StateTag state={fact.state} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="sources" className={sectionClass} tabIndex={-1}>
            <span className="text-[11px] font-extrabold tracking-[.16em] text-accent">
              06 / SOURCES
            </span>
            <h2 className={sectionTitle}>근거를 더 읽고 싶다면</h2>
            <p className={`mt-5 ${bodyText}`}>
              이 페이지는 프로젝트 문서를 쉬운 말로 요약했습니다. 자세한 구현과 검증 범위는 아래
              문서에서 확인할 수 있습니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {story.slug === 'maple-insight' && (
                <Link
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-accent-deep hover:bg-soft"
                  to="/blog/maple-insight-architecture-evolution"
                >
                  아키텍처 발전 과정 <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              {story.slug === 'codex-workspace' && (
                <Link
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-accent-deep hover:bg-soft"
                  to="/blog/codex-workspace-engineering"
                >
                  Skill과 Hook 설계 사례 <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-accent-deep hover:bg-soft"
                href={story.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                {story.sourceTitle} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-accent-deep hover:bg-soft"
                href={story.extraUrl}
                target="_blank"
                rel="noreferrer"
              >
                {story.extraTitle} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-accent-deep hover:bg-soft"
                href="/portfolio.pdf"
                download
              >
                포트폴리오 PDF <Download size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
        </article>

        <aside className="hidden lg:block" aria-label="페이지 목차 영역">
          <nav
            className="sticky top-8 mt-24 rounded-xl border border-line bg-white p-3"
            aria-label="프로젝트 목차"
          >
            <p className="px-3 pb-2 pt-1 text-[11px] font-extrabold tracking-[.12em] text-accent">
              ON THIS PAGE
            </p>
            <SectionLinks />
          </nav>
        </aside>
      </main>
    </div>
  )
}
