# Electron 아키텍처 참고: DB와 로컬 파일의 경계

이 문서는 사용자가 Maple Insight의 Electron·DB·백엔드 연결을 분석해 제작하고 2026-11-17 촬영한 [아키텍처 이미지](../images/electron/electron-architecture-overview.png)를 읽기 위한 참고자료다. 이미지는 개발 중인 앱의 구조를 설명하며, 각 화면의 기능 완료 여부는 [REQ04 사례 개요](../../../SPEC/REQ04/case-outline.md)와 원본의 GOAL/REVIEW로 판단한다. 아래 코드 경로는 2026-11-16 원본 커밋 `34ce9f22703283594d2b9aa3d831d11ec63b92b5`에서 대조했다.

## 요청 경계

Renderer는 `window.api`를 통해 요청하고, [Preload](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/preload/index.ts)가 `ipcRenderer.invoke`로 Main의 채널에 전달한다. [Main 등록점](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/register.ts)은 기능별 핸들러를 등록한다. 각 핸들러가 요청을 검증하고 서비스·DB API·로컬 파일 작업을 호출한다. 이 경계는 Renderer가 DB나 파일 시스템을 직접 다룬다는 뜻이 아니다.

| 화면             | 확인된 DB 경로                                                                                                                                                                                              | 로컬 파일·남은 범위                                                                                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 버전 비교        | [Runtime](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/app/runtime.ts)이 `@maple/db`의 등록 버전과 상태를 조회한다.                         | [raw diff 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/diff/raw-data-diff-service.ts)는 관리 루트의 버전별 JSON 파일을 비교·저장한다. 비교 대상은 DB 행이 아니다.           |
| 직업 정보·편집   | [job-data 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/jobs/job-data.ts)가 `@maple/db`의 버전별 직업·무기 목록을 조회한다. | edit workbench는 로컬 변경 기록을 사용한다. [Phase04 상태](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/GOAL/README.md)는 부분 구현·부분 검증이며, DB publish는 뒤 단계다.                       |
| 스킬 목록·아이콘 | [skill-data 핸들러](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/skill-data.ts)는 `@maple/db/admin`에서 스킬·레벨 행을 읽는다.          | [이미지 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/skills/skill-images.ts)는 버전별 로컬 PNG를 읽고, 추출기는 별도 WZ 입력을 사용한다. PNG를 DB에 저장한다는 뜻은 아니다. |

## 그림을 사용할 때

전체 그림은 Renderer → Preload → Main/IPC → 서비스 → DB 또는 파일의 책임 분리를 보여준다. `@maple/db`와 로컬 edit workbench는 서로 다른 저장 경로다. 웹 백엔드의 캐릭터 조회 경로와 Electron의 로컬 관리 경로를 하나의 실행 요청으로 연결하지 않는다. 그림의 “복구”는 현재 구현된 직업 복구 미리보기·선택 복사의 범위에서만 설명한다.

원본 PNG의 글자는 모바일 전체 폭에서 읽기 어렵다. 공개 글에는 필요한 요청 하나를 분리한 그림과 같은 의미의 텍스트를 사용한다. 실제 앱의 실행·DB 연결을 이번 문서 작성에서 새로 검증한 것은 아니며, 사용자가 2026-11-17 `pnpm dev`로 실행하며 촬영한 화면과 원본 코드·기존 REVIEW의 검증 범위를 구분한다.
