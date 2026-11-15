import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router'

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-white/95">
        <div className="mx-auto flex min-h-[76px] w-[calc(100%-36px)] max-w-[1280px] items-center gap-9 sm:w-[calc(100%-64px)] max-[680px]:flex-wrap max-[680px]:justify-between max-[680px]:gap-0 max-[680px]:pt-3">
          <NavLink
            to="/"
            className="whitespace-nowrap text-xl font-extrabold tracking-[-.06em] text-ink max-[680px]:text-lg"
            aria-label="JO4086 홈"
          >
            JO<span>4086</span>
            <span className="text-accent">.</span>
          </NavLink>
          <nav
            className="mx-auto flex h-[76px] items-center gap-9 max-[680px]:order-3 max-[680px]:m-0 max-[680px]:h-[42px] max-[680px]:w-full max-[680px]:justify-between max-[680px]:gap-3"
            aria-label="주요 메뉴"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `inline-flex h-full items-center border-b-2 text-sm font-semibold max-[680px]:text-xs ${isActive ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            className="whitespace-nowrap rounded-lg border border-line px-3.5 py-2 text-[13px] font-bold text-accent-deep hover:bg-soft max-[680px]:px-2.5 max-[680px]:py-1.5 max-[680px]:text-[11px]"
            href="https://github.com/jo4086"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 프로필, 새 탭"
          >
            GitHub ↗
          </a>
        </div>
      </header>
      <Suspense
        fallback={
          <main
            className="mx-auto min-h-[55vh] w-[calc(100%-36px)] max-w-[1160px] pt-20 text-muted sm:w-[calc(100%-64px)]"
            role="status"
          >
            페이지를 불러오는 중...
          </main>
        }
      >
        <Outlet />
      </Suspense>
      <footer className="mt-auto border-t border-line text-xs text-subtle">
        <div className="mx-auto flex min-h-[76px] w-[calc(100%-36px)] max-w-[1280px] items-center justify-between gap-4 sm:w-[calc(100%-64px)] max-[680px]:min-h-[78px] max-[680px]:flex-col max-[680px]:items-start max-[680px]:justify-center max-[680px]:gap-1">
          <span>© {new Date().getFullYear()} JO4086</span>
          <span>만드는 과정과 배운 점을 기록합니다.</span>
        </div>
      </footer>
    </div>
  )
}
