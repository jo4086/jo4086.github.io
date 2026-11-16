# REQ03 Maple Insight 설계 변화 상세 글과 출력용 PDF

## 목적

[자기소개 초안](../portfolio/self-introduction.md)과 [Maple Insight 프로젝트 상세 페이지](../../src/features/portfolio/ProjectStoryPage.tsx)에서 짧게 소개한 설계 판단을 블로그 글에서 구체적으로 설명한다. 독자는 프로젝트의 결과뿐 아니라 공통 타입 공유에서 도메인·데이터 계약 중심 구조로 바꾼 이유와 과정을 확인할 수 있어야 한다. 같은 글을 읽기 쉬운 PDF로 출력해 프로필의 상세 기술 사례 자료로 사용할 수 있게 한다.

## 범위와 수용 기준

- **REQ03-01 공개 글:** [아키텍처 발전 과정](../portfolio/maple-insight/architecture-evolution.md)을 출발점으로 `src/content/posts/`에 Maple Insight의 구조 변화 글을 작성한다. 초기 구조, 기능별 패키지 분리, 도메인·계약 중심 재구성의 계기와 판단을 읽는 순서대로 설명한다.
- **REQ03-02 이해와 근거:** 비개발자도 각 단계에서 무엇이 달라졌는지 이해할 수 있도록 역할과 데이터 흐름을 시각 자료 및 텍스트로 함께 설명한다. 주요 구조 주장에는 해당 Git 기록이나 저장소 자료를 연결하고, 구현·진행 중·계획을 구분한다.
- **REQ03-03 연결:** Maple Insight 프로젝트 상세 페이지에서 글로 이동할 수 있고, 글에서 프로젝트 상세 페이지와 관련 근거로 돌아갈 수 있다. 블로그 목록·카테고리·관련 프로젝트 탐색에서도 글을 찾을 수 있다.
- **REQ03-04 출력용 PDF:** 공개 글과 동일한 핵심 내용을 가진 PDF를 제공한다. 화면·A4 인쇄에서 글과 도식이 잘리지 않고, 텍스트 선택·복사 및 링크 사용이 가능해야 한다. 사이트에서 PDF를 찾고 내려받을 수 있다.
- **REQ03-05 사실성과 기여:** 개인 프로젝트에서 작성자가 판단한 패키지 경계와 AI가 도운 구현 과정을 구분한다. 측정하지 않은 성능 향상·재사용률이나 팀 협업 성과는 주장하지 않는다.
- **REQ03-06 검증:** 글과 PDF의 링크·내용·읽기 순서를 확인한다. 코드·설정 변경 시 `pnpm check`, `pnpm build`, 관련 데스크톱·모바일 Playwright와 직접 화면 확인을 수행하고 결과를 REVIEW에 기록한다. 공개 URL 확인은 배포 후 수행한다.

## 자료와 경계

- [아키텍처 발전 과정](../portfolio/maple-insight/architecture-evolution.md)의 단계별 Git 기록과 [프로젝트 분석](../portfolio/maple-insight/README.md)을 사실 확인의 출발점으로 삼는다. 원본 문서의 서술을 그대로 공개하지 않고 블로그 독자에게 맞는 글로 다듬는다.
- [개발 경험 기록](../portfolio/maple-insight/development-history.md)의 pnpm·Turborepo 선택과 AI 활용 경험은 필요한 맥락만 사용한다. 별도 주제의 글을 이번 Phase 완료 조건에 포함하지 않는다.
- 기존 한 페이지 [포트폴리오 PDF](../../public/portfolio.pdf)와 REQ02의 미완료 검증은 유지한다. 이 REQ의 PDF는 상세 기술 사례를 읽고 출력하기 위한 별도 자료다.
- 실행 순서와 현재 상태는 [로드맵](../ROADMAP.md), 이번 작업의 완료 조건은 [REQ03-Phase01 GOAL](../GOAL/REQ03/Phase01.md)에 둔다.
