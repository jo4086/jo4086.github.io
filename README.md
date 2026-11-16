# jo4086.github.io

GitHub Pages에서 운영할 개인 포트폴리오 및 블로그 프로젝트입니다. 프로젝트의 기술적 과정과 개발·기술 탐구·일상 기록을 한 정적 사이트에서 보여줍니다. React, TypeScript, Vite를 사용하며 별도 백엔드나 데이터베이스는 없습니다.

Home, Projects, Blog, About 화면과 Markdown 게시글 탐색이 구현되어 있습니다. 초기 게시글은 사이트 구축 과정과 기록 공간을 소개합니다. `main`에 푸시하면 [GitHub Actions 워크플로](./.github/workflows/deploy.yml)가 빌드 결과를 GitHub Pages에 배포합니다.

## 개발 명령

| 명령                   | 용도                           |
| ---------------------- | ------------------------------ |
| `pnpm install`         | 의존성 설치                    |
| `pnpm dev`             | 로컬 개발 서버 실행            |
| `pnpm build`           | TypeScript 검사 및 배포용 빌드 |
| `pnpm preview`         | 빌드 결과 로컬 미리보기        |
| `pnpm typecheck`       | TypeScript 타입 검사           |
| `pnpm lint`            | ESLint 검사                    |
| `pnpm lint:fix`        | ESLint 오류 자동 수정          |
| `pnpm check`           | TypeScript 및 ESLint 검사      |
| `pnpm check:deps`      | 의존성 peer 검사               |
| `pnpm format`          | Prettier 코드 포맷팅           |
| `pnpm format:check`    | Prettier 포맷팅 검사           |
| `pnpm test:e2e`        | Playwright E2E 테스트 실행     |
| `pnpm test:e2e:ui`     | Playwright UI 모드 실행        |
| `pnpm test:e2e:report` | Playwright 테스트 리포트 열기  |

## 문서

- [아키텍처](./docs/architecture.md): 현재 디렉터리 책임, 의존 방향, 라우팅·콘텐츠 결정
- [REQ01 요구사항](./docs/REQUIREMENTS/REQ01.md): UI 범위와 수용 기준
- [UI SPEC](./docs/SPEC/REQ01/ui.md): 화면과 탐색 동작
- [로드맵](./docs/ROADMAP.md): Phase 상태와 순서
- [GOAL](./docs/GOAL/REQ01/Phase01.md): 이번 구현의 완료 조건
- [REVIEW](./docs/REVIEW/REQ01/Phase01.md): 검증 결과와 남은 항목
- [UI 흐름 예시](./screenshots/manual/portfolio-blog-ui-flow.png): 화면 구성 참고 이미지
- [에이전트 규칙](./AGENTS.md): 작업 범위, Skill 활용, 검증 및 문서 관리 기준
- [자기소개 작성 양식](./screenshots/references/self-introduction.png): 이미지에 제시된 성향 선택 및 자기소개 항목에 맞춰 내용 작성
- [스타트업 기대사항 작성 양식](./screenshots/references/startup-expectations.png): 이미지에 제시된 선택 항목 및 작성 양식에 맞춰 내용 작성
- [Maple Insight 포트폴리오 분석](https://github.com/jo4086/maple-insight/blob/main/docs/portfolio/README.md): 아키텍처, 데이터 흐름, 앱·패키지, 구현 상태와 사례 구성 가이드
- [포트폴리오 문안](./docs/portfolio/README.md): 이력서 형식의 프로젝트 요약과 상세 문서 링크
- [포트폴리오 PDF](./public/portfolio.pdf): Maple Insight와 Codex Workspace 요약, 사이트 상세 페이지 링크
- [REQ02 포트폴리오 제작 계획](./docs/REQUIREMENTS/REQ02.md): PDF와 두 프로젝트 상세 페이지의 요구사항·SPEC·단계별 완료 조건
- [REQ03 상세 기술 글](./docs/REQUIREMENTS/REQ03.md): Maple Insight 설계 변화 블로그 글과 출력용 PDF의 범위·완료 조건

## 현재 작업 순서

[로드맵](./docs/ROADMAP.md)이 Phase 상태의 기준입니다. 기존 포트폴리오 PDF의 인쇄·읽기 순서와 배포 후 링크 검증은 [REQ02-Phase03](./docs/GOAL/REQ02/Phase03.md)에 남아 있습니다. 현재 작업 대상은 [REQ03-Phase01](./docs/GOAL/REQ03/Phase01.md)의 Maple Insight 아키텍처 변화 블로그 글과 프로필용 상세 PDF입니다. 이후 REQ02의 남은 검증을 재개합니다.
