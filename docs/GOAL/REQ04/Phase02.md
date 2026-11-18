# REQ04-Phase02 완료 조건: Maple Insight 기술 사례 작성

[로드맵](../../ROADMAP.md) · [Phase 계획](../../ROADMAP/REQ04/Phase02.md) · [요구사항](../../REQUIREMENTS/REQ04.md) · [콘텐츠 설계](../../SPEC/REQ04/content-architecture.md)

- [x] Maple Insight 상세 페이지에서 API, DB, Electron 세 사례로 이동하고 각 글에서 프로젝트와 관련 글로 돌아올 수 있다. [검증](../../REVIEW/REQ04/Phase02.md).
- [x] API 글은 네 파일 규칙, 상위 공개 경로, Raw→매퍼→내부 Contract, 수동 추가·미검증 범위를 구분한다. [API 글](../../../src/content/posts/maple-insight-api-types.md).
- [x] DB 글은 `data-admin`과 `db`의 책임, 네 스키마와 대표 관계, 개별 transaction과 미구현 publish를 구분한다. [DB 글](../../../src/content/posts/maple-insight-database.md).
- [x] Electron 글은 IPC와 DB·로컬 파일 경계, 버전 비교·직업 편집·스킬 아이콘의 각 검증 수준을 화면과 함께 설명한다. [Electron 글](../../../src/content/posts/maple-insight-electron-data-studio.md).
- [x] 선정 이미지에 출처·촬영일·대체 설명을 붙이고 모바일에서도 관계와 글자를 읽을 수 있다. [검증](../../REVIEW/REQ04/Phase02.md).
- [x] `pnpm check`, `pnpm build`, 관련 데스크톱·모바일 Playwright 및 직접 화면 확인 결과를 REVIEW에 기록한다. [검증](../../REVIEW/REQ04/Phase02.md).

원본 Maple Insight 코드와 배포 상태는 이 단계에서 변경하지 않는다. 발행 시점의 외부 명세·공개 URL 검증은 [Phase03](../../ROADMAP/REQ04/Phase03.md)에서 다룬다.
