# REQ01-Phase01 검증 기록

[GOAL](../../GOAL/REQ01/Phase01.md) · [요구사항](../../REQUIREMENTS/REQ01.md) · [UI SPEC](../../SPEC/REQ01/ui.md)

## 확인 결과

- [x] 공통 경로, Home·Projects·상세·Blog·상세·About·404가 표시된다. `tests/e2e/site.spec.ts`의 공통 탐색 및 게시글 탐색을 데스크톱·모바일에서 확인했다.
- [x] 프로젝트 기술 필터, 게시글 검색, 카테고리 접기·분류, 태그, 아카이브가 동작한다. Playwright 필터 검증 6개 테스트 중 해당 탐색 테스트가 통과했다.
- [x] Markdown 본문·목차 이동과 프로젝트·글 연결이 동작한다. 목차 항목 선택 뒤 본문 제목에 초점이 이동하는 것을 Playwright로 확인했다.
- [x] 넓은 화면의 좌측 탐색·본문·우측 목차와 모바일 접이식 목차·탐색 드로어를 확인했다. [데스크톱 글 상세](../../../screenshots/playwright/chromium-blog-detail.png), [모바일 글 상세](../../../screenshots/playwright/mobile-chromium-blog-detail.png), [Home](../../../screenshots/playwright/chromium-home.png), [Projects](../../../screenshots/playwright/chromium-projects.png)를 직접 확인했다.
- [x] `pnpm check`, `pnpm check:deps`, `pnpm build`가 모두 종료 코드 0으로 통과했다. Playwright 6개 테스트도 모두 통과했다.
- [x] [현재 아키텍처](../../architecture.md)와 [README](../../../README.md)를 구현된 상태로 갱신하고 이 검증 기록을 연결했다.

## 남은 범위

GitHub Pages 배포 자동화와 실제 개인 경력·추가 프로젝트 콘텐츠는 이 Phase에 포함하지 않았다. 현재 프로젝트와 게시글은 이 사이트의 구축 과정에 기반하며, 프로젝트 화면에 사용한 일부 미리보기는 예시 이미지로 표시했다.

Playwright 실행 시 `NO_COLOR`와 `FORCE_COLOR`가 함께 설정됐다는 도구 경고가 출력됐으나 테스트 결과에는 영향을 주지 않았다.

## 스타일 정리 후 재검증

`App.css`와 기존 CSS 진입점을 제거하고 화면 스타일을 Tailwind 유틸리티로 옮겼다. 전역 토큰·기본값과 Markdown 렌더링 선택자만 `src/styles/`에 분리했다. `pnpm check`, `pnpm check:deps`, `pnpm build`가 경고 없이 통과했고, Playwright 데스크톱·모바일 테스트 6개가 통과했다. Home과 블로그 상세 화면의 새 캡처를 직접 확인했다.
