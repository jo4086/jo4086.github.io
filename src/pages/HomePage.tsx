import { ArrowRight, ArrowUpRight, BookOpen, Code2 } from 'lucide-react'
import { Link } from 'react-router'

import { posts } from '../features/blog/posts'
import { projects } from '../features/portfolio/projects'

export function HomePage() {
  const featuredProject = projects[0]

  return (
    <main className="mx-auto w-[calc(100%-36px)] max-w-[1160px] pt-[clamp(84px,13vh,150px)] pb-24 sm:w-[calc(100%-64px)] max-[680px]:pt-20 max-[680px]:pb-16">
      <section className="max-w-[830px]" aria-labelledby="home-title">
        <p className="text-[11px] font-extrabold tracking-[.16em] text-accent">
          PORTFOLIO & PERSONAL JOURNAL
        </p>
        <h1
          id="home-title"
          className="my-6 text-[clamp(46px,6.5vw,84px)] leading-[1.14] font-[820] tracking-[-.075em] max-[680px]:text-[clamp(42px,11vw,60px)]"
        >
          만들고, 탐구하고,
          <br />
          기록합니다<span className="text-accent">.</span>
        </h1>
        <p className="max-w-[590px] text-lg leading-[1.85] text-muted [word-break:keep-all] max-[680px]:text-[15px]">
          프로젝트에서 마주한 문제와 해결 과정을 정리하고, 기술을 넘어 일상의 관심사까지 글로 남기는
          공간입니다.
        </p>
        <div className="mt-9 flex flex-wrap gap-2.5">
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-ink px-[18px] text-[13px] font-bold text-white hover:bg-accent-deep"
            to="/projects"
          >
            프로젝트 보기 <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border border-line bg-white px-[18px] text-[13px] font-bold text-ink hover:bg-soft"
            to="/blog"
          >
            블로그 읽기 <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-[110px] mb-12 h-px bg-line max-[680px]:mt-[78px] max-[680px]:mb-8" />

      <section
        className="grid grid-cols-2 gap-[70px] max-[680px]:block"
        aria-label="사이트 둘러보기"
      >
        <div className="max-w-[450px]">
          <span className="grid size-[38px] place-items-center rounded-lg bg-[#e8f1f8] text-accent">
            <Code2 size={19} aria-hidden="true" />
          </span>
          <h2 className="mt-5 mb-2 text-[21px] font-extrabold tracking-[-.03em]">Projects</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            무엇을 만들었고, 어떤 선택을 했는지 살펴보세요.
          </p>
          {featuredProject && (
            <Link
              className="inline-flex items-center gap-2 text-[13px] font-bold text-accent-deep hover:underline"
              to={`/projects/${featuredProject.slug}`}
            >
              {featuredProject.name} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="max-w-[450px] max-[680px]:mt-9 max-[680px]:border-t max-[680px]:border-line max-[680px]:pt-9">
          <span className="grid size-[38px] place-items-center rounded-lg bg-[#e8f1f8] text-accent">
            <BookOpen size={19} aria-hidden="true" />
          </span>
          <h2 className="mt-5 mb-2 text-[21px] font-extrabold tracking-[-.03em]">Blog</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            개발, 기술 탐구 그리고 일상의 기록을 모았습니다.
          </p>
          {posts[0] && (
            <Link
              className="inline-flex items-center gap-2 text-[13px] font-bold text-accent-deep hover:underline"
              to={`/blog/${posts[0].slug}`}
            >
              최근 글 읽기 <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
