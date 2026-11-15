import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="mx-auto w-[calc(100%-36px)] max-w-[750px] pt-[90px] pb-[130px] sm:w-[calc(100%-64px)] max-[680px]:pt-16">
      <p className="text-[11px] font-extrabold tracking-[.16em] text-accent">
        404 · PAGE NOT FOUND
      </p>
      <h1 className="my-4 text-[clamp(36px,4vw,54px)] leading-[1.15] font-extrabold tracking-[-.055em]">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="max-w-[680px] text-[17px] leading-[1.8] text-muted">
        주소를 확인하거나 홈에서 다시 둘러보세요.
      </p>
      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-ink px-[18px] text-[13px] font-bold text-white hover:bg-accent-deep"
        to="/"
      >
        <ArrowLeft size={17} aria-hidden="true" /> 홈으로 돌아가기
      </Link>
    </main>
  )
}
