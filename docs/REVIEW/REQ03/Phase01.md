# REQ03-Phase01 검증 기록

[GOAL](../../GOAL/REQ03/Phase01.md) · [요구사항](../../REQUIREMENTS/REQ03.md)

- [x] [블로그 글](../../../src/content/posts/maple-insight-architecture-evolution.md)에 초기 `types`, 종류별 패키지, 책임별 패키지의 세 단계와 해당 Git 커밋 링크를 담았다. Maple Insight 로컬 저장소에서 세 커밋과 당시 `packages/` 목록을 대조했다.
- [x] [단계 변화 SVG](../../../public/diagrams/maple-insight-architecture-stages.svg), [계약 경계 SVG](../../../public/diagrams/maple-insight-contract-boundary.svg), [데이터 관리 SVG](../../../public/diagrams/maple-insight-data-studio.svg)를 추가했다. 백엔드 매퍼·프런트엔드 계약 사용, Electron 가져오기·버전 비교, C# 아이콘 추출과 목록 표시는 실제 소스와 담당 검증 기록을 대조했다. 웹 관리자 역할은 작성자의 설계 의도, DB 승인 반영은 계획으로 표시했다. 세 그림 모두 대체 텍스트와 이어지는 본문 설명이 있다.
- [x] 작성자의 설계 판단과 AI를 활용한 구현을 구분하고, 성능·재사용률과 통합 완료를 확인된 성과로 쓰지 않았다.
- [x] Maple Insight 상세 페이지에서 글로, 글에서 프로젝트 상세 페이지로 이동한다. 데스크톱·모바일에서 SVG 로드, PDF 다운로드, 가로 넘침 없음과 관련 프로젝트 링크를 확인했다. [데스크톱 화면](../../../screenshots/playwright/chromium-maple-insight-article.png), [모바일 화면](../../../screenshots/playwright/mobile-chromium-maple-insight-article.png).
- [x] [PDF](../../../public/maple-insight-architecture-evolution.pdf)는 같은 Markdown에서 [내보내기 스크립트](../../../scripts/export-post-pdf.mjs)로 다시 만들었다. 현재 파일을 PyPDF·PyMuPDF로 직접 확인한 결과 A4 크기 7쪽이며, 모든 쪽에서 본문 텍스트가 추출되고 외부 링크 주석 19개가 있다. 블로그·프로젝트·Git URL이 포함된다. 태그 트리에는 문서 제목, 소제목, 표, 대체 설명이 있는 그림 3개가 있다.
- [x] PDF의 7쪽을 이미지로 렌더링해 페이지별 글과 그림을 직접 살폈다. 글과 그림이 용지 밖으로 잘리거나 서로 겹친 부분은 보이지 않았고, 추출된 텍스트 블록도 모두 페이지 안에 있다. 텍스트 검색이 가능한 문자 레이어를 확인했다.
- [ ] PDF 뷰어에서 텍스트 선택과 스크린 리더의 실제 읽기 순서를 확인한다. 태그의 논리적 순서와 텍스트 추출은 확인했지만, 현재 환경에 스크린 리더가 없어 실제 낭독 결과를 검증하지 못했다.
- [x] 첫 구현 뒤 `pnpm check`, `pnpm build`, Playwright 전체 14개 테스트가 통과했다. Electron 설명을 보완한 뒤 `pnpm check`, `pnpm build`, 관련 Playwright 데스크톱·모바일 8개 테스트, SVG 3개 XML 파싱, `git diff --check`가 통과했다. 최초 로컬 Markdown 링크 검사도 오류 0건이었다.
- [x] 블로그 PDF 메타데이터, SVG·PDF 자산 위치, 내보내기 스크립트의 소유권을 [현재 아키텍처](../../architecture.md)에 기록했다.
- [ ] 공개 GitHub Pages의 글·PDF URL은 배포 후 확인한다. 현재 브랜치의 변경은 배포하지 않았다.

기존 [REQ02-Phase03](../REQ02/Phase03.md)의 포트폴리오 PDF 검증은 이 PDF와 별개이며, [로드맵](../../ROADMAP.md)에 대기 상태로 남아 있다.
