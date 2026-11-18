# 로드맵

Phase 상태의 원본은 이 문서다. 상세 완료 조건은 각 Phase의 GOAL에 둔다.

| Phase         | 범위                                                                                                                                                                                          | 상태    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| REQ01-Phase01 | 공통 UI, 포트폴리오·블로그 화면과 데이터 연결, 반응형 검증                                                                                                                                    | 완료    |
| REQ02-Phase01 | 두 프로젝트를 담은 한 페이지 PDF 초안과 링크 목표 확인 ([GOAL](./GOAL/REQ02/Phase01.md), [REVIEW](./REVIEW/REQ02/Phase01.md))                                                                 | 완료    |
| REQ02-Phase02 | 두 프로젝트 상세 페이지와 시각적 흐름 구현·검증 ([GOAL](./GOAL/REQ02/Phase02.md), [REVIEW](./REVIEW/REQ02/Phase02.md))                                                                        | 완료    |
| REQ02-Phase03 | PDF 최종 수정, 사이트 연결, 파일·배포 검증 ([GOAL](./GOAL/REQ02/Phase03.md), [REVIEW](./REVIEW/REQ02/Phase03.md))                                                                             | 대기    |
| REQ03-Phase01 | Maple Insight 설계 변화 블로그 글과 프로필용 상세 PDF ([GOAL](./GOAL/REQ03/Phase01.md))                                                                                                       | 진행 중 |
| REQ04-Phase01 | Maple Insight API·DB·Electron 사례의 코드·이미지·검증 근거 대조와 콘텐츠 개요 확정 ([계획](./ROADMAP/REQ04/Phase01.md), [GOAL](./GOAL/REQ04/Phase01.md), [REVIEW](./REVIEW/REQ04/Phase01.md)) | 완료    |
| REQ04-Phase02 | 기존 프로젝트 페이지 연결과 API·DB·Electron 기술 사례 글·시각 자료 작성 ([계획](./ROADMAP/REQ04/Phase02.md), [GOAL](./GOAL/REQ04/Phase02.md), [REVIEW](./REVIEW/REQ04/Phase02.md))            | 완료    |
| REQ04-Phase03 | 데스크톱·모바일 읽기, 링크·사실성·접근성 검증 및 공개 준비 ([계획](./ROADMAP/REQ04/Phase03.md))                                                                                               | 대기    |

REQ02의 범위와 수용 기준은 [요구사항](./REQUIREMENTS/REQ02.md), PDF와 페이지의 구체적 읽기 경험은 [PDF SPEC](./SPEC/REQ02/pdf.md)과 [상세 페이지 SPEC](./SPEC/REQ02/project-pages.md)에 있다. REQ01-Phase01의 완료 근거는 기존 [GOAL](./GOAL/REQ01/Phase01.md)과 [REVIEW](./REVIEW/REQ01/Phase01.md)를 따른다.

## 작업 순서 변경

REQ02-Phase03의 로컬 PDF 인쇄·스크린 리더 읽기 순서와 배포 후 공개 URL 검증이 남아 있다. 배포는 별도 요청이 필요하므로 완료로 표시하지 않는다. 먼저 [REQ03-Phase01](./GOAL/REQ03/Phase01.md)에서 자기소개와 프로젝트 페이지를 보완하는 설계 변화 글·출력용 PDF를 작성하고 검증한다. 그 뒤 REQ02-Phase03의 남은 확인을 재개한다. REQ03의 범위는 [요구사항](./REQUIREMENTS/REQ03.md)에 둔다.

REQ04는 [새 기술 사례의 요구사항](./REQUIREMENTS/REQ04.md)과 [콘텐츠 설계](./SPEC/REQ04/content-architecture.md)를 검토한 뒤 Phase01 자료 대조부터 시작한다. REQ03의 기존 글·PDF 검증과 REQ02의 남은 PDF 검증 상태는 이 계획으로 변경되지 않는다. REQ04-Phase02는 Phase01에서 근거와 자산 선택을 확정한 뒤, Phase03은 글과 페이지가 준비된 뒤 진행한다. 공개 배포는 별도 요청에 따른다.
