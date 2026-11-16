# REQ03-Phase01 완료 조건: Maple Insight 설계 변화 글과 출력용 PDF

[로드맵](../../ROADMAP.md) · [요구사항](../../REQUIREMENTS/REQ03.md) · [Maple Insight 아키텍처 발전 과정](../../portfolio/maple-insight/architecture-evolution.md)

- [x] 블로그 글에서 초기 공통 타입 공유 → 기능별 패키지 분리 → 도메인·데이터 계약 중심 재구성의 문제·판단·결과를 순서대로 설명하고, 단계별 Git 근거를 연결한다. [검증 기록](../../REVIEW/REQ03/Phase01.md).
- [x] 각 단계의 책임과 데이터 흐름을 비개발자도 읽을 수 있는 시각 자료와 같은 의미의 텍스트로 제공한다. [검증 기록](../../REVIEW/REQ03/Phase01.md).
- [x] 개인 설계 판단과 AI를 활용한 구현 과정을 구분하며, 검증되지 않은 수치·완료 상태를 주장하지 않는다. [검증 기록](../../REVIEW/REQ03/Phase01.md).
- [x] 프로젝트 상세 페이지와 블로그 글을 양방향으로 연결하고, 블로그 탐색에서 글을 찾을 수 있다. [검증 기록](../../REVIEW/REQ03/Phase01.md).
- [ ] 글과 동일한 핵심 내용을 가진 별도 PDF를 만들어 사이트에서 내려받을 수 있게 한다. 실제 PDF에서 텍스트·링크·A4 인쇄·읽기 순서를 확인한다.
- [x] 코드·설정 변경에 대해 `pnpm check`, `pnpm build`, 관련 데스크톱·모바일 Playwright와 직접 화면 확인을 수행한다. [검증 기록](../../REVIEW/REQ03/Phase01.md).
- [x] 결과와 미확인 항목을 REVIEW에 기록하고, 구현으로 바뀐 콘텐츠·라우팅 소유권이 있으면 현재 아키텍처 문서를 갱신한다. [검증 기록](../../REVIEW/REQ03/Phase01.md).

공개 URL에서의 동작은 배포 후 확인한다. PDF의 남은 직접 검증은 [REVIEW](../../REVIEW/REQ03/Phase01.md)에 기록한다.
