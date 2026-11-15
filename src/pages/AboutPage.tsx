import { ArrowUpRight } from 'lucide-react'

export function AboutPage() {
  return (
    <main className="mx-auto w-[calc(100%-36px)] max-w-[750px] pt-[90px] pb-[130px] sm:w-[calc(100%-64px)] max-[680px]:pt-16">
      <p className="text-[11px] font-extrabold tracking-[.16em] text-accent">ABOUT THIS SPACE</p>
      <h1 className="my-4 text-[clamp(36px,4vw,54px)] leading-[1.15] font-extrabold tracking-[-.055em]">
        안녕하세요.
      </h1>
      <p className="max-w-[680px] text-[17px] leading-[1.8] text-muted">
        이곳은 프로젝트를 만드는 과정과 그 안에서 배운 것을 남기는 포트폴리오이자 개인 블로그입니다.
      </p>
      <section className="mt-14 border-t border-line pt-7">
        <h2 className="mb-3.5 text-[22px] font-extrabold">무엇을 기록하나요?</h2>
        <p className="text-[15px] leading-[1.9] text-muted">
          프로젝트 페이지에는 기술적 선택과 문제 해결 과정을, 블로그에는 개발과 기술 탐구뿐 아니라
          취미와 일상의 이야기도 기록합니다.
        </p>
      </section>
      <section className="mt-14 border-t border-line pt-7">
        <h2 className="mb-3.5 text-[22px] font-extrabold">연결하기</h2>
        <p className="text-[15px] leading-[1.9] text-muted">
          코드와 진행 중인 작업은 GitHub에서 확인할 수 있습니다.
        </p>
        <a
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-accent-deep hover:underline"
          href="https://github.com/jo4086"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 방문하기 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
    </main>
  )
}
