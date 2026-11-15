# jo4086.github.io

GitHub Pages에서 운영할 개인 포트폴리오 및 블로그 프로젝트입니다. 프로젝트의 기술적 과정과 개발·기술 탐구·일상 기록을 한 정적 사이트에서 보여줍니다. React, TypeScript, Vite를 사용하며 별도 백엔드나 데이터베이스는 없습니다.

Home, Projects, Blog, About 화면과 Markdown 게시글 탐색이 구현되어 있습니다. 초기 게시글은 사이트 구축 과정과 기록 공간을 소개합니다. GitHub Pages 배포 자동화는 아직 구현되지 않았습니다.

## 개발 명령

| 명령                        | 용도                           |
| --------------------------- | ------------------------------ |
| `pnpm install`              | 의존성 설치                    |
| `pnpm dev`                  | 로컬 개발 서버 실행            |
| `pnpm check`                | TypeScript 및 ESLint 검사      |
| `pnpm check:deps`           | 의존성 peer 검사               |
| `pnpm build`                | TypeScript 검사 및 배포용 빌드 |
| `pnpm exec playwright test` | 데스크톱·모바일 브라우저 검증  |

## 문서

- [아키텍처](./docs/architecture.md): 현재 디렉터리 책임, 의존 방향, 라우팅·콘텐츠 결정
- [REQ01 요구사항](./docs/REQUIREMENTS/REQ01.md): UI 범위와 수용 기준
- [UI SPEC](./docs/SPEC/REQ01/ui.md): 화면과 탐색 동작
- [로드맵](./docs/ROADMAP.md): Phase 상태와 순서
- [GOAL](./docs/GOAL/REQ01/Phase01.md): 이번 구현의 완료 조건
- [REVIEW](./docs/REVIEW/REQ01/Phase01.md): 검증 결과와 남은 항목
- [UI 흐름 예시](./screenshots/manual/portfolio-blog-ui-flow.png): 화면 구성 참고 이미지
- [에이전트 규칙](./AGENTS.md): 작업 범위, Skill 활용, 검증 및 문서 관리 기준
