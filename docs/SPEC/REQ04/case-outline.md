# REQ04 기술 사례 작성 개요와 근거 선택

[콘텐츠 설계](./content-architecture.md) · [Phase01 계획](../../ROADMAP/REQ04/Phase01.md) · [검증 기록](../../REVIEW/REQ04/Phase01.md)

기준은 2026-11-16의 Maple Insight 로컬 `main` 커밋 `34ce9f22703283594d2b9aa3d831d11ec63b92b5`다. 아래의 **구현 완료**는 해당 코드 경계의 존재를, **검증 완료**는 담당 REVIEW에 적힌 범위의 테스트를 뜻한다. 현재 서비스를 새로 실행하거나 외부 API·DB를 호출해 재검증한 결과는 아니다.

## 프로젝트 페이지와 구조 발전

프로젝트 페이지의 짧은 입구는 “외부 응답의 형식, 제품 내부 계약, 버전별 게임 데이터 관리 책임을 왜 나눴는가?”로 잡는다. 공통 타입 → 기능별 공유 → 도메인·계약별 분리의 연혁과 Git 근거는 기존 [설계 변화 글](../../../src/content/posts/maple-insight-architecture-evolution.md)에 맡긴다. 새 글마다 이 연혁을 반복하지 않고, 독자가 필요한 지점에서 해당 글로 이동한다. 기존 [Git 근거 정리](../../portfolio/maple-insight/architecture-evolution.md)의 세 커밋 `7d1dd19`, `c2f7289`, `e0a429f`는 로컬 Git에서 존재를 확인했다.

## API 타입 — 외부 명세를 같은 규칙으로 수동 반영하기

**문제·판단:** 외부 응답을 화면 계약으로 쓰면 필드명·빈 값 처리의 책임이 섞인다. 원본 응답 타입은 `api-types`, 제품 내부 형식은 `contracts`에 둔다. 신규 API는 사용자의 작업 지시와 공식 명세 확인에서 시작하며, 현재 자동 명세 감시·자동 코드 수정 기능은 없다. [감시 제안 문서](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/docs/electron/nexon-open-api-spec-monitoring.md)는 계획의 근거로만 쓴다.

**대표 구현·근거:** [`ability`의 네 파일](https://github.com/jo4086/maple-insight/tree/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/src/ability)에서 `contract.ts`는 `/character/ability`와 필수 `ocid`·선택 `date`, `params.ts`는 요청 타입, `raw.ts`는 응답 타입, `index.ts`는 재내보내기를 정의한다. [상위 index](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/src/index.ts)와 [빌드 entry](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/tsup.config.ts), [package exports](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/package.json)가 공개 경로를 잇는다. 로컬 `api-types`에서 네 파일을 모두 가진 엔드포인트 디렉터리 28개를 계수했다. 다른 범주의 [ranking/overall](https://github.com/jo4086/maple-insight/tree/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/ranking/src/overall)도 같은 파일 구성을 쓴다.

**경계·상태:** [백엔드 ability 매퍼](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/back/src/domain/character/mappers/ability.mapper.ts)는 `AbilityRaw`를 `CharacterAbility`로 변환한다. **구현 완료:** 타입 파일·export·매퍼 경계. **확인 필요:** 공식 Nexon 명세와 모든 필드의 최신 일치, 실제 API 호출 결과, 새 엔드포인트 추가 절차의 재현 테스트. `ranking/overall`의 `optionalParams`와 `params.ts` 선택성에 차이가 있어 “모든 정의가 명세와 일치”라고 쓰지 않는다.

**글 순서:** 데이터 형식이 섞이는 문제 → ability 네 파일과 상위 export → Raw→매퍼→내부 계약 → 수동 추가 순서 → 확인된 범위와 명세 재확인. 기존 REQ03 글은 경계가 생긴 배경으로 한 번만 연결한다.

## DB — 실행 명령과 저장 책임을 나눈 이유

**문제·판단:** 데이터 입력 경로와 저장·조회 로직을 한 패키지에 섞지 않는다. [`@maple/data-admin`의 seed 실행점](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/data-admin/src/seed-game-data-bundle.ts)은 [`@maple/db/admin` API](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/src/admin/index.ts)를 호출한다. `@maple/db`는 Prisma schema, repository, 관리 API를 소유한다. 두 [패키지](https://github.com/jo4086/maple-insight/tree/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database)의 `package.json`에서도 `data-admin` → `db` 의존성을 확인했다.

**대표 관계·상태:** [Prisma schema](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/prisma/schema.prisma)는 `app`, `ranking`, `game_data`, `equipment` 네 PostgreSQL 스키마를 선언한다. `game_data`의 `GameDataVersion → GameJob → GameSkill → GameSkillLevel`, `equipment`의 `EquipmentItem → WeaponType?`, `app`의 `CharacterGroup → CharacterGroupMember → Ocid`를 대표 관계로 고른다. **구현 완료:** schema·CLI·repository. **검증 기록:** [DB 패키지 REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/docs/REVIEW.md)의 개별 작업 범위. **계획:** Electron의 승인된 DB dry-run·publish. 일부 repository의 `$transaction` 호출을 모든 DB 관리 작업의 원자성으로 일반화하지 않는다.

**글 순서:** 관리 명령과 저장 API의 분리 → 네 schema의 역할 → `GameJob`·`GameSkill` 관계 한 가지 → 개별 transaction의 범위 → Electron publish와 구분한 남은 일. [DB 패키지 아키텍처 PNG](../../portfolio/maple-insight/images/database/database-package-architecture.png)의 `app = 계정·설정` 문구는 현재 모델을 대표하지 않고, `Transactions (데이터 일관성 보장)`도 전체 작업에 적용되는 듯 보인다. 원본 그림은 공개 보류하고 검증된 관계만 다시 그린다.

## Electron — IPC 경계와 화면별 검증 수준

**문제·판단:** 웹 관리자에서 로컬 게임 원본의 변환·검증·비교를 모두 맡지 않도록 별도 도구를 둔 설계 의도다. 웹 admin import는 미연결 초안이다. [Preload API](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/preload/index.ts)의 `window.api.listJobData` → [Main IPC 검증](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/job-data.ts) → [job-data 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/jobs/job-data.ts)가 대표 요청이다. 서비스는 DB의 직업·무기 조회와 로컬 edit workbench를 사용한다.

**화면과 상태:** 버전 비교의 추가·변경·삭제는 [Phase03 REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REVIEW/Phase03.md)의 fixture·native 검증 범위에서 **검증 완료**다. 직업 정보·인라인 편집 UI는 [독립 요청 REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REQUESTS/job-data-tab.md)의 모의 브라우저 검증이 있고, 현재 [Phase04](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/GOAL/README.md)는 **부분 구현·부분 검증**이다. 스킬 목록·아이콘은 [Electron REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REVIEW.md)의 읽기 전용 조회와 특정 전직 추출·표시 범위에서만 설명한다. 전체 직업 자동 추출·Windows 설치본·PNG의 DB 저장은 **계획** 또는 미검증이다. Phase05 DB publish와 Phase06 생성도 **계획**이다.

사용자가 제공한 Electron 아키텍처 그림은 실제 Electron·DB·백엔드 연결을 분석해 작성한 자료다. 원본 코드와 대조한 화면별 경계는 다음과 같다.

| 화면           | 확인된 DB 경계                                                                                                                                                                                                  | 별도 로컬 경계                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 버전 비교 03   | [Runtime](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/app/runtime.ts)이 DB의 등록 버전·상태를 확인한다.                                        | [raw diff 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/diff/raw-data-diff-service.ts)는 버전별 로컬 JSON 파일의 추가·변경·삭제를 비교한다. DB 행 간 diff로 설명하지 않는다. |
| 직업 편집 07   | [job-data 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/jobs/job-data.ts)는 `@maple/db`에서 버전별 직업과 무기 목록을 조회한다. | 편집 변경 기록은 로컬 edit workbench를 사용한다. 이 화면을 DB publish 완료로 소개하지 않는다.                                                                                                                                                                |
| 스킬 아이콘 12 | [skill-data IPC](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/skill-data.ts)가 `@maple/db/admin`에서 스킬·레벨 행을 조회한다.               | [이미지 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/skills/skill-images.ts)는 버전별 로컬 PNG를 읽는다. 아이콘이 DB에 저장됐다는 뜻은 아니다.                              |

**글 순서:** 웹 관리자와 로컬 도구의 책임 판단 → Renderer·Preload·IPC·서비스·DB/파일 경계 → 버전 비교 검증 화면 → 직업 편집의 부분 구현 → 별도 스킬 이미지 입력 경로 → 미완성 publish. IPC 도식은 [기존 참고 흐름](../../portfolio/maple-insight/references/electron-ipc-data-flow.md)의 `job-data:list`를 바탕으로 모바일에서도 읽히는 단순 그림으로 다시 그린다.

## 이미지 선택과 공개 조건

추가된 PNG 29개는 사용자가 2026-11-17 하루에 직접 촬영했다고 확인한 제작 자료다. Electron 화면은 공개 배포본이 아니라 `pnpm dev`로 실행한 앱에서 현재 구현을 내부 테스트하며 찍었다. 사용자가 제공한 Electron 그림은 실제 연결을 분석한 것이고, DB는 DBeaver에도 연결되어 있다. 화면별 DB 조회와 로컬 파일 경로는 위 코드 대조 결과로 설명한다. 화면 속 코드와 Nexon 공식 문서의 원출처는 각각 별도로 표시한다. PNG 자체에는 촬영 시점 정보를 담은 텍스트 또는 시간 메타데이터가 없고, 파일 수정일 `2026-11-16`은 촬영일의 근거가 아니다. 선택한 화면에서 암호나 토큰은 보이지 않았다. API 1장, DB ERD 1장, Electron 3장을 사이트 자산으로 복사하고 모바일에서는 원본 해상도를 유지한 스크롤 영역으로 제공한다. Electron 화면 상단의 프로필 표시는 화면에서 가린다.

| 자료                                                                                                  | 결정           | 근거와 캡션·모바일 조건                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [API 네 파일 화면](../../portfolio/maple-insight/images/api-types/02-api-types-ability-example.png)   | 사용           | 네 파일 화면을 원본 크기로 탐색하고 핵심 contract·params를 짧은 텍스트 코드로 재구성했다.                                                        |
| [내부 계약 화면](../../portfolio/maple-insight/images/api-types/06-normalized-domain-contract.png)    | 공개 보류      | 매퍼 경계는 원본 코드 링크와 텍스트 흐름으로 설명했다. 539px 원본 확대는 사용하지 않는다.                                                        |
| [game_data ERD](../../portfolio/maple-insight/images/database/03-game-data.png)                       | 사용           | Prisma의 대표 관계와 대조했다. 모바일에서는 `game_skills`·`game_jobs`가 먼저 보이도록 탐색 위치를 잡고 텍스트 관계를 함께 둔다.                  |
| [버전 비교 화면](../../portfolio/maple-insight/images/electron/03-version-comparison-added.png)       | 사용           | 원본 크기 내부 스크롤로 제공한다. DB 등록 버전을 선택하고 로컬 raw JSON을 비교한 개발 화면으로 설명한다.                                         |
| [직업 인라인 편집](../../portfolio/maple-insight/images/electron/07-job-inline-edit.png)              | 사용           | DB의 직업·무기 목록 조회와 로컬 편집 작업본을 구분한다. Phase04의 부분 UI로 소개한다.                                                            |
| [스킬 아이콘 표시](../../portfolio/maple-insight/images/electron/12-skill-icon-extraction-result.png) | 사용           | DB 스킬 목록과 별도 로컬 PNG 연결을 구분한다. 화면의 집계 숫자를 현재 성과로 재인용하지 않는다.                                                  |
| [DB 패키지 아키텍처](../../portfolio/maple-insight/images/database/database-package-architecture.png) | 공개 보류      | `app` 설명과 전체 transaction 표현이 현재 코드보다 넓다. 확인된 `data-admin → db → PostgreSQL`만 새 도식으로 표현한다.                           |
| [Electron 아키텍처](../../portfolio/maple-insight/images/electron/electron-architecture-overview.png) | 원본 공개 보류 | 큰 그림의 모바일 글자가 작다. `job-data:list` 경계로 범위를 좁혀 텍스트·SVG로 재구성한다.                                                        |
| [Nexon 문서 캡처](../../portfolio/maple-insight/images/api-types/03-nexon-api-overview.png) 외 2장    | 공개 보류      | 2026-11-17 촬영 사실과 별개로 발행 시점 명세의 최신성을 확인해야 한다. 세로 2048px 전체 화면은 모바일에서 읽히지 않아 공식 문서 링크로 대체한다. |
| 그 밖의 ERD·Electron 화면·코드 캡처                                                                   | 공개 보류      | 현재 글에서 답하는 질문과 캡션 근거가 정해지지 않았다. 필요해질 때 한 장씩 사실·출처·가독성을 다시 판단한다.                                     |

## 이동 경로와 공개 전 확인

`Projects → Maple Insight 상세 → 설계 변화 글 / API / DB / Electron`을 기본 경로로 한다. 세 새 글은 기존 블로그 frontmatter의 `relatedProjects: [maple-insight]`와 고유 slug를 사용한다. 글 끝에 프로젝트 소개와 관련 사례 링크를 두고, 기존 설계 변화 글에서도 세 사례로 이동한다. 프로젝트 페이지에는 사례당 문제·판단·현재 결과를 짧게 적고, 본문의 코드·근거는 글에 둔다.

- 촬영자는 사용자, 촬영일은 2026-11-17로 확인했다. Electron 화면의 DB 조회·로컬 파일 경계는 위 표에 따라 캡션에 밝히고, 개발 실행 화면을 배포된 제품으로 표현하지 않는다.
- 공식 Nexon API의 현재 파라미터·응답 필드와 공개 링크는 발행 직전에 대조한다. 외부 명세의 최신성은 이 로컬 검토에서 판정하지 않는다.
- 이미지의 게임 데이터·아이콘과 출처 표기, 작은 글자의 모바일 가독성을 공개 자산 제작 후 다시 확인한다.
- 원본 저장소의 Phase04와 DB 상태가 바뀌면 고정 커밋의 설명을 최신 상태 주장으로 바꾸기 전에 다시 검증한다.
