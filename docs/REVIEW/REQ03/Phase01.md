# REQ03-Phase01 검증 기록

[GOAL](../../GOAL/REQ03/Phase01.md) · [요구사항](../../REQUIREMENTS/REQ03.md)

- [x] [블로그 글](../../../src/content/posts/maple-insight-architecture-evolution.md)에 초기 `types`, 종류별 패키지, 책임별 패키지의 세 단계와 해당 Git 커밋 링크를 담았다. Maple Insight 로컬 저장소에서 세 커밋과 당시 `packages/` 목록을 대조했다.
- [x] [단계 변화 SVG](../../../public/diagrams/maple-insight-architecture-stages.svg)와 [계약 경계 SVG](../../../public/diagrams/maple-insight-contract-boundary.svg)를 추가했다. 두 번째 그림의 백엔드 매퍼·프런트엔드 계약 사용·Electron 패키지 사용은 실제 소스와 `package.json`에서 확인했다. 두 그림 모두 대체 텍스트와 이어지는 본문 설명이 있다.
- [x] 작성자의 설계 판단과 AI를 활용한 구현을 구분하고, 성능·재사용률과 통합 완료를 확인된 성과로 쓰지 않았다.
- [x] Maple Insight 상세 페이지에서 글로, 글에서 프로젝트 상세 페이지로 이동한다. 데스크톱·모바일에서 SVG 로드, PDF 다운로드, 가로 넘침 없음과 관련 프로젝트 링크를 확인했다. [데스크톱 화면](../../../screenshots/playwright/chromium-maple-insight-article.png), [모바일 화면](../../../screenshots/playwright/mobile-chromium-maple-insight-article.png).
- [x] [PDF](../../../public/maple-insight-architecture-evolution.pdf)는 같은 Markdown에서 [내보내기 스크립트](../../../scripts/export-post-pdf.mjs)로 만들었다. 파일 구조에서 A4 크기 5쪽, 접근성 구조 태그, 링크 주석 10개와 블로그·프로젝트·Git URL을 확인했다. Chromium 인쇄 미디어 화면에서 글과 두 도식의 표시를 확인했다.
- [ ] PDF 파일 자체의 텍스트 추출·선택, 스크린 리더 읽기 순서, 페이지별 인쇄 잘림을 독립적으로 확인한다. 현재 환경에는 PDF 추출기와 스크린 리더가 없고, 헤드리스 Chromium은 생성 PDF를 뷰어 대신 다운로드했다. 구조 태그와 인쇄 미디어 확인만으로 이 항목을 완료 처리하지 않는다.
- [x] `pnpm check`, `pnpm build`, Playwright 전체 14개 테스트가 통과했다. 첫 전체 실행에서 새 글이 늘어난 만큼 기존 글 개수 테스트가 실패했고, 기대값을 갱신한 뒤 전체 재실행에서 14개가 통과했다. SVG 2개 XML 파싱, 로컬 Markdown 링크 검사 0건, `git diff --check`도 통과했다.
- [x] 블로그 PDF 메타데이터, SVG·PDF 자산 위치, 내보내기 스크립트의 소유권을 [현재 아키텍처](../../architecture.md)에 기록했다.
- [ ] 공개 GitHub Pages의 글·PDF URL은 배포 후 확인한다. 현재 브랜치의 변경은 배포하지 않았다.

기존 [REQ02-Phase03](../REQ02/Phase03.md)의 포트폴리오 PDF 검증은 이 PDF와 별개이며, [로드맵](../../ROADMAP.md)에 대기 상태로 남아 있다.
