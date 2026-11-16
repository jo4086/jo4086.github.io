import { ArrowLeft, ArrowRight, ArrowUpRight, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

import { NotFoundPage } from '../../pages/NotFoundPage'
import { getPost } from '../blog/posts'

import { getProject, projects, projectTechnologies } from './projects'

const eyebrow = 'text-[11px] font-extrabold tracking-[.16em] text-accent'
const tag = 'rounded-md bg-[#edf3f8] px-2 py-1 text-[11px] font-semibold text-[#45637d]'
const backLink = 'inline-flex items-center gap-2 text-[13px] font-bold text-muted hover:underline'
const storySection = 'border-t border-line py-9'
const storyHeading = 'mt-3 mb-4 text-[26px] font-extrabold tracking-[-.035em]'

export function ProjectsPage() {
  const [technology, setTechnology] = useState('전체')
  const visible =
    technology === '전체' ? projects : projects.filter((item) => item.stack.includes(technology))

  return (
    <main className="mx-auto w-[calc(100%-36px)] max-w-[1160px] pb-28 sm:w-[calc(100%-64px)]">
      <div className="pt-[74px] max-[680px]:pt-14">
        <p className={eyebrow}>SELECTED WORK</p>
        <h1 className="my-4 text-[clamp(36px,4vw,54px)] leading-[1.15] font-extrabold tracking-[-.055em]">
          프로젝트
        </h1>
        <p className="max-w-[680px] text-[17px] leading-[1.8] text-muted">
          직접 만들고 있는 프로젝트와 그 과정에서 내린 기술적 선택을 소개합니다.
        </p>
      </div>
      <div className="mt-11 mb-6 flex flex-wrap gap-2" role="group" aria-label="기술 스택 필터">
        {['전체', ...projectTechnologies].map((item) => (
          <button
            className={`rounded-full border px-4 py-2 text-xs font-bold ${technology === item ? 'border-ink bg-ink text-white' : 'border-line bg-white text-muted hover:border-[#a9bfd1]'}`}
            type="button"
            key={item}
            aria-pressed={technology === item}
            onClick={() => setTechnology(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 min-[680px]:grid-cols-2">
        {visible.map((project) => (
          <article
            className="overflow-hidden rounded-[14px] border border-line bg-white"
            key={project.slug}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="block overflow-hidden bg-[#e8f0f8]"
              aria-label={`${project.name} 자세히 보기`}
            >
              <img
                className="aspect-video w-full object-cover"
                src={project.image}
                alt={`${project.name} 프로젝트 미리보기`}
              />
            </Link>
            <div className="px-7 pt-6 pb-7">
              <span className="text-[11px] font-extrabold text-accent">{project.status}</span>
              <h2 className="mt-2 mb-2 text-[23px] font-extrabold tracking-[-.035em]">
                <Link className="hover:text-accent" to={`/projects/${project.slug}`}>
                  {project.name}
                </Link>
              </h2>
              <p className="mb-5 text-[13px] leading-7 text-muted">{project.summary}</p>
              <div className="flex flex-wrap gap-2" aria-label="사용 기술">
                {project.stack.map((item) => (
                  <span className={tag} key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <Link
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-accent-deep hover:underline"
                to={`/projects/${project.slug}`}
              >
                자세히 보기 <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="px-4 py-12 text-center text-muted">이 기술에 해당하는 프로젝트가 없습니다.</p>
      )}
    </main>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage />

  const relatedPosts = project.relatedPostSlugs.map(getPost).filter((post) => post !== undefined)

  return (
    <main className="mx-auto w-[calc(100%-36px)] max-w-[1160px] pt-12 pb-24 sm:w-[calc(100%-64px)]">
      <Link className={backLink} to="/projects">
        <ArrowLeft size={15} aria-hidden="true" /> 프로젝트 목록
      </Link>
      <div className="mt-9 mb-9 flex items-end justify-between gap-7 max-[680px]:block">
        <div>
          <p className={eyebrow}>PROJECT · {project.status}</p>
          <h1 className="mt-2 mb-4 text-[clamp(40px,5vw,64px)] leading-[1.1] font-[820] tracking-[-.065em]">
            {project.name}
          </h1>
          <p className="max-w-[680px] text-[17px] leading-[1.8] text-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span className={tag} key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <a
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-white px-[18px] text-[13px] font-bold text-ink hover:bg-soft max-[680px]:mt-6"
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          GitHub 저장소 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <figure>
        <img
          className="aspect-[16/8.5] w-full rounded-[14px] border border-line bg-soft object-cover"
          src={project.image}
          alt={`${project.name} 화면 미리보기`}
        />
        <figcaption className="mt-2 text-right text-[11px] text-subtle">
          프로젝트 화면을 나타낸 예시 이미지
        </figcaption>
      </figure>
      <section className="mt-16" aria-labelledby="project-screenshots-title">
        <h2
          id="project-screenshots-title"
          className="mb-4 text-xl font-extrabold tracking-[-.03em]"
        >
          화면 살펴보기
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[680px]:grid-cols-2">
          {project.screenshots.map((screenshot) => (
            <figure key={screenshot.src}>
              <a
                className="block overflow-hidden rounded-[10px] border border-line bg-soft hover:border-[#a9bfd1]"
                href={screenshot.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${screenshot.caption} 크게 보기, 새 탭`}
              >
                <img
                  className="h-60 w-full object-cover object-top max-[680px]:h-[190px]"
                  src={screenshot.src}
                  alt={screenshot.caption}
                  loading="lazy"
                />
              </a>
              <figcaption className="mt-2 text-xs text-muted">{screenshot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <div className="mx-auto mt-[70px] w-full max-w-[800px] max-[680px]:mt-11">
        <section className={storySection}>
          <span className={eyebrow}>01 / OVERVIEW</span>
          <h2 className={storyHeading}>프로젝트 개요</h2>
          <p className="text-[15px] leading-[1.85] text-muted">{project.summary}</p>
        </section>
        <section className={storySection}>
          <span className={eyebrow}>02 / FEATURES</span>
          <h2 className={storyHeading}>주요 기능</h2>
          <ul className="grid gap-2.5">
            {project.features.map((feature) => (
              <li
                className="flex items-center gap-3 rounded-lg bg-soft px-4 py-3.5 text-sm"
                key={feature}
              >
                <Layers3 className="shrink-0 text-accent" size={17} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className={storySection}>
          <span className={eyebrow}>03 / ARCHITECTURE</span>
          <h2 className={storyHeading}>구조와 기술적 선택</h2>
          <p className="text-[15px] leading-[1.85] text-muted">{project.architecture}</p>
        </section>
        <section className={storySection}>
          <span className={eyebrow}>04 / PROBLEM SOLVING</span>
          <h2 className={storyHeading}>문제 해결 과정</h2>
          <div className="py-4">
            <strong className="text-[13px]">문제</strong>
            <p className="mt-2 text-[15px] leading-[1.85] text-muted">{project.challenge}</p>
          </div>
          <div className="border-t border-line py-4">
            <strong className="text-[13px]">접근</strong>
            <p className="mt-2 text-[15px] leading-[1.85] text-muted">{project.solution}</p>
          </div>
        </section>
        {relatedPosts.length > 0 && (
          <section className={storySection}>
            <span className={eyebrow}>05 / RELATED WRITING</span>
            <h2 className={storyHeading}>관련 글</h2>
            <ul className="border-t border-line">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    className="flex items-center justify-between border-b border-line py-4 font-bold hover:text-accent"
                    to={`/blog/${post.slug}`}
                  >
                    {post.title}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
