# REQ02 포트폴리오 PDF와 프로젝트 상세 경험

## 목적

한 장의 포트폴리오 PDF에서 Maple Insight와 Codex Workspace를 간결하게 소개하고, 각 프로젝트 이름을 선택하면 이 사이트의 상세 페이지에서 설계와 구현 범위를 쉽게 이해할 수 있게 한다. [PDF 참고 양식](../../screenshots/manual/resume-design-reference.pdf)의 정보 순서를 참고하되, 실제 내용과 읽기 흐름은 두 프로젝트에 맞게 구성한다. 두 프로젝트는 AI를 적극 활용한 개인 프로젝트이며, Maple Insight에서 겪은 역할별 지침 관리 문제가 Codex Workspace로 이어진 관계를 설명한다.

## 독자와 핵심 흐름

채용 담당자·비개발자·개발자가 PDF를 읽는다. 관심이 생긴 프로젝트의 링크를 열면 **무슨 문제를 다루는지 → 어떻게 풀었는지 → 지금 어디까지 구현했는지 → 근거는 무엇인지**를 순서대로 확인한다. 기술 세부 사항은 접거나 별도 링크로 더 읽을 수 있다.

## 요구사항과 수용 기준

- **REQ02-01 PDF 소개:** `jo4086`과 GitHub 링크, 짧은 소개, 기술, Maple Insight와 Codex Workspace의 핵심 설명을 담는다. 이메일·전화번호와 확인되지 않은 기간·성과 수치는 넣지 않는다.
- **REQ02-02 PDF 링크:** 각 프로젝트에는 `https://jo4086.github.io/#/projects/maple-insight`와 `https://jo4086.github.io/#/projects/codex-workspace`로 이동하는 명확한 클릭 링크를 둔다. 실제 배포 URL에서 두 링크를 열어 확인한다.
- **REQ02-03 상세 페이지:** 각 프로젝트는 서로 다른 고유 경로와 제목을 가지며, 문제·대상·설계 판단·구현 범위·남은 범위·근거 링크를 제공한다. 사이트의 기존 Projects 목록에서도 접근할 수 있다.
- **REQ02-04 쉬운 설명:** 전문 용어를 처음 사용할 때 일상 언어로 풀어 쓰고, 아키텍처와 주요 흐름을 텍스트만이 아닌 라벨·화살표·단계가 있는 시각 자료로 설명한다. 그림을 보지 않아도 같은 의미를 읽을 수 있다.
- **REQ02-05 사실성:** 원본 문서의 검증 완료, 부분 구현, 계획을 분리한다. 독립적으로 확인하지 않은 동작을 완성 기능이나 정량 성과로 표현하지 않는다.
- **REQ02-06 연결과 접근성:** PDF 링크는 화면과 인쇄물에서 식별할 수 있고, 페이지의 도식은 대체 설명과 읽기 순서를 제공한다. 모바일에서도 가로 스크롤 없이 핵심 내용을 읽을 수 있다.
- **REQ02-07 검증:** 문서 출처와 링크를 확인하고, 구현 단계에서 `pnpm check`, `pnpm build`, 데스크톱·모바일 Playwright 및 직접 화면 확인을 수행한다. PDF는 실제 파일에서 텍스트 추출·링크 클릭·인쇄 결과를 확인한다.
- **REQ02-08 기여와 관계:** 두 프로젝트가 개인 프로젝트이고 AI를 활용했다는 점을 밝힌다. Maple Insight의 패키지·백엔드·프런트엔드 구조와 공통 타입 경계에 대한 작성자의 설계 판단을 설명한다. 초기 대화·예시 코드, 이후 README·AGENTS, 그리고 Skill·Hook을 갖춘 Codex Workspace로 이어진 맥락을 제시한다.

## 자료와 경계

- [포트폴리오 문안 초안](../portfolio/README.md), [Maple Insight 분석](../portfolio/maple-insight/README.md), [Codex Workspace 분석](../portfolio/codex-workspace/README.md)을 출발점으로 사용한다.
- [PDF 명세](../SPEC/REQ02/pdf.md)와 [상세 페이지 명세](../SPEC/REQ02/project-pages.md)가 표현과 동작을 구체화한다.
- 기존 [REQ01](./REQ01.md)의 라우팅·사이트 탐색과 [현재 아키텍처](../architecture.md)를 유지한다. 이 REQ는 두 프로젝트의 콘텐츠와 PDF 연결을 추가하는 작업이다.
- 작업 순서는 **PDF 초안 → 상세 페이지 → 최종 PDF**다. 배포는 별도 요청이 있어야 수행하며, 배포 전에는 공개 URL의 실제 동작을 검증 완료로 표시하지 않는다.

## 공개 전 확인이 필요한 정보

- 개발 기간과 공개 가능한 화면·코드 자료의 범위
- [자기소개](../portfolio/self-introduction.md)와 [스타트업에 기대하는 점](../portfolio/startup-expectations.md)의 본인 확인
