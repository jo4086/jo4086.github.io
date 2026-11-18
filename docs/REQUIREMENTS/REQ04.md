# REQ04 Maple Insight 기술 사례 포트폴리오

## 목적과 독자

[Maple Insight 프로젝트 상세 페이지](../../src/features/portfolio/ProjectStoryPage.tsx)를 입구로 삼아, 채용 담당자·비개발자에게는 설계 이유와 현재 결과를, 개발자에게는 코드·검증 근거를 제공한다. 기존 [설계 변화 글](../../src/content/posts/maple-insight-architecture-evolution.md)은 구조 발전의 전체 맥락을 맡고, 새 기술 사례는 API 타입, DB, Electron의 구체적 판단과 구현을 각각 깊이 다룬다.

## 요구사항과 수용 기준

- **REQ04-01 서사와 연결:** 프로젝트 소개에서 문제 → 설계 판단 → 실제 구현 → 확인한 결과 → 남은 범위를 읽을 수 있다. 설계 변화 글과 개별 사례로 이동하고, 사례에서 프로젝트 소개와 관련 사례로 돌아올 수 있다. 기존 블로그의 경로·탐색·디자인을 따른다.
- **REQ04-02 구조 발전:** 초기 공유 타입에서 도메인·계약 중심 모노레포로 바뀐 계기와 책임 경계를 Git 기록과 패키지 구조로 설명한다. 기존 REQ03 글을 재사용하고 같은 연혁을 새 글마다 반복하지 않는다.
- **REQ04-03 Nexon API 타입 사례:** `api-types`를 신규 API를 같은 규칙으로 **수동 추가하기 쉬운 구조**로 소개한다. `contract.ts`의 엔드포인트·파라미터 목록, `params.ts`의 요청 타입, `raw.ts`의 원본 응답 타입, `index.ts`의 내보내기를 실제 ability 사례와 다른 API 사례로 보여준다. 공식 문서 링크, 기존 예시, 패키지 진입점·export를 활용하는 추가 과정을 설명한다. Raw와 내부 Contract는 패키지가 다르며, 변경 자동 감지·자동 코드 수정 기능으로 소개하지 않는다.
- **REQ04-04 DB 설계 사례:** `@maple/db`의 Prisma 스키마·repository·관리 API와 `@maple/data-admin`의 실행 스크립트 책임을 구분한다. PostgreSQL의 `app`, `ranking`, `game_data`, `equipment` 스키마와 대표 모델 관계를 코드·ERD로 검증한 범위에서 설명한다. 개별 트랜잭션과 Electron의 미래 승인 publish를 혼동하지 않는다.
- **REQ04-05 Electron 사례:** 별도 데스크톱 도구를 둔 이유, Renderer → Preload → IPC/Main → 서비스 → DB·로컬 파일 경계, CSV 가져오기·검증·버전 비교와 직업·스킬 데이터 화면을 실제 코드·검증 기록·스크린샷으로 설명한다. 아이콘 추출은 별도 입력 경로로 표시한다. 완료·부분 구현·계획을 단계별로 구분한다.
- **REQ04-06 AI 활용과 검증:** 작성자가 내린 구조·책임 판단, AI가 도운 코드 작성, 수동 지시로 시작하는 API 추가, 코드·테스트·실행 기록을 통한 확인을 구분한다. 팀 협업, 자동 동기화, 측정하지 않은 속도·재사용률·운영 성과를 주장하지 않는다.
- **REQ04-07 그림과 접근성:** 준비된 이미지 중 사실과 읽기 목적에 맞는 자료만 선택한다. 이미지마다 역할·촬영 시점 또는 근거·현재 상태·대체 설명을 붙이고, 핵심 관계는 그림 없이도 이해할 수 있게 설명한다. 모바일에서 글자와 흐름을 읽을 수 있어야 한다.
- **REQ04-08 검증:** 공개 전 원본 코드·Git 기록·담당 REVIEW와 글의 핵심 주장, 이미지 속 주장, 링크를 대조한다. 구현 단계에는 `pnpm check`, `pnpm build`, 관련 데스크톱·모바일 Playwright와 직접 화면 확인을 수행한다. 공개 URL 검증은 배포 후 별도로 기록한다.

## 범위와 근거

- 콘텐츠 대상은 기존 프로젝트 상세 페이지와 블로그 기술 사례다. 새로운 API 구현, Maple Insight 원본 코드 수정, 자동 문서 감시 시스템, 새 배포 방식은 이번 요구사항에 포함하지 않는다.
- [분석 자료 인덱스](../portfolio/maple-insight/README.md), [개발 경험](../portfolio/maple-insight/development-history.md), [아키텍처 발전](../portfolio/maple-insight/architecture-evolution.md), [패키지 분석](../portfolio/maple-insight/packages.md), [구현 상태](../portfolio/maple-insight/status-and-gaps.md)를 출발점으로 삼는다. 이미지와 Electron 참고자료도 같은 인덱스에서 찾는다.
- 원본 프로젝트 `~/projects/maple_repo`의 현재 코드·Git 기록과 담당 앱·패키지 REVIEW를 사실 확인의 기준으로 삼는다. 분석 문서나 스크린샷만으로 동작 완료를 판정하지 않는다.
- [콘텐츠 설계](../SPEC/REQ04/content-architecture.md)가 사례별 읽기 흐름과 자료 선택을, [로드맵](../ROADMAP.md)이 실행 순서와 Phase 상태를 맡는다.

## 공개 전 판단할 항목

- 새 사례를 각기 독립 글로 발행할 때의 최종 제목과 공개 순서.
- 사용자가 추가한 스크린샷의 촬영 날짜·공개 가능 범위와 화면 속 데이터의 비식별화 필요 여부.
- API 명세와 이미지 설명을 공개할 시점에 최신 공식 문서·원본 코드와 다시 대조할 범위.
