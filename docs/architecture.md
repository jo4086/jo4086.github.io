# 아키텍처

현재 구현된 단일 Vite + React + TypeScript 정적 사이트의 구조와 주요 결정을 기록합니다. UI의 수용 기준과 세부 동작은 [REQ01](./REQUIREMENTS/REQ01.md)과 [UI SPEC](./SPEC/REQ01/ui.md)에 있습니다.

## 현재 구조와 의존 방향

```text
src/
├── main.tsx                 # React 시작과 HashRouter
├── App.tsx                  # 라우트 렌더링 진입점
├── router/                  # 경로 설정 및 블로그 지연 로드
├── layouts/SiteLayout.tsx   # 공통 내비게이션, Outlet, 푸터
├── pages/                   # Home, About, 404 화면
├── features/
│   ├── portfolio/           # 프로젝트 데이터, 필터, 목록·상세 화면
│   └── blog/                # 게시글 색인, 탐색, 목록·상세, 목차
├── content/posts/           # Markdown 게시글 원본
└── styles/
    ├── global.css           # Tailwind 진입점, 테마 토큰, 전역 기본값
    └── markdown.css         # 생성된 Markdown 본문의 후손 선택자
public/                     # 프로젝트 예시 이미지·흐름 미리보기와 포트폴리오 PDF
.github/workflows/deploy.yml # main 푸시 시 빌드와 Pages 배포
tests/e2e/                  # Playwright 탐색 검증
screenshots/
├── manual/                  # 사용자가 제공한 UI 참고 자료
└── playwright/              # 검증용 화면 캡처
```

`router/`는 페이지와 레이아웃을 등록합니다. `pages/`는 기능에 속하지 않는 화면을, `features/`는 포트폴리오와 블로그의 데이터·UI·동작을 소유합니다. 두 기능은 공개된 데이터 조회 함수로 관련 콘텐츠를 연결합니다. 공통 컴포넌트 디렉터리는 실제 재사용이 생길 때 만듭니다. 화면의 배치·간격·색상은 주로 Tailwind 유틸리티로 지정합니다. `styles/`에는 전역 기본값과 Markdown 렌더러가 생성하는 요소의 선택자만 둡니다.

## 라우팅과 배포

React Router v7 Declarative Mode의 `HashRouter`를 사용합니다. `/`, `/projects`, 기존 `/projects/:slug`, `/blog`, `/blog/:slug`, `/about`, `*` 경로는 공통 레이아웃 아래에 있습니다. `/projects/maple-insight`와 `/projects/codex-workspace`는 읽기 흐름을 위해 별도 경로에서 작은 복귀 링크와 프로젝트 목차만 사용합니다. 넓은 화면은 오른쪽 스티키 목차, 모바일은 접이식 목차를 두며, 목차 버튼은 URL 해시를 바꾸지 않고 해당 절로 스크롤·초점을 이동합니다. 블로그 화면은 지연 로드해 초기 번들에서 Markdown 렌더러를 분리합니다. `HashRouter`는 GitHub Pages에서 상세 경로의 직접 접속과 새로고침을 단순하게 지원하지만 URL에 `#`이 들어갑니다.

이 저장소는 사용자 사이트 `jo4086.github.io`이므로 Vite 기본 `base: '/'`를 유지합니다. Pages의 배포 원본은 GitHub Actions입니다. `main` 푸시(또는 PR 병합으로 발생한 푸시) 시 `.github/workflows/deploy.yml`이 pnpm 잠금 파일 기준으로 의존성을 설치하고 검사·빌드한 뒤 `dist/`를 Pages에 배포합니다. `pull_request` 배포 트리거는 두지 않아 병합 시 중복 실행을 피합니다. 빌드와 배포 작업을 분리해 Actions 로그에서 실패 단계를 확인할 수 있습니다.

## 콘텐츠와 탐색

프로젝트 목록은 `features/portfolio/projects.ts`의 TypeScript 데이터, Maple Insight·Codex Workspace의 설명과 도식 단계는 `features/portfolio/projectStories.ts`, 게시글은 `content/posts/*.md`의 frontmatter와 본문으로 관리합니다. 블로그는 Vite `import.meta.glob`으로 글을 읽고, `yaml`로 메타데이터를 파싱하며 `react-markdown`과 `remark-gfm`으로 본문을 표시합니다. 카테고리·태그·아카이브는 게시글에서 계산합니다. 검색·필터는 URL 쿼리에, 프로젝트와 글의 관련 링크는 slug에 기반합니다. 게시글의 선택적 `pdf` 메타데이터는 상세 화면의 PDF 다운로드 링크를 표시합니다. Maple Insight 설계 변화 글의 SVG는 `public/diagrams/`에 두고, 같은 Markdown 원고를 `scripts/export-post-pdf.mjs`로 인쇄해 `public/maple-insight-architecture-evolution.pdf`를 만듭니다. 기존 한 페이지 포트폴리오 PDF 원고는 `docs/portfolio/resume.html`, 배포 파일은 `public/portfolio.pdf`에 있습니다.

게시글 파일을 추가하거나 바꾸면 정적 사이트를 다시 빌드합니다. 현재 글 수에서는 본문을 빌드에 포함해도 충분하며, 글이 많아지면 본문 지연 로드나 빌드 시 색인 생성을 검토합니다.

## 화면 검증 자료

데스크톱·모바일 Playwright 테스트는 `tests/e2e/`에 있습니다. 화면 검토용 캡처는 `screenshots/playwright/`, 사용자 제공 이미지는 `screenshots/manual/`에 둡니다. 실패 시 trace와 자동 스크린샷은 무시되는 `test-results/`에 남깁니다.
