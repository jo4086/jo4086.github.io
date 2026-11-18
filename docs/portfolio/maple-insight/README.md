# Maple Insight 포트폴리오 분석 자료

아래 분석 문서와 개발 경험 기록은 2026-11-16 Maple Insight 저장소를 기준으로 정리한 **포트폴리오 제작용 참고자료**다. 기존 분석 자료에 작성자의 설계 설명과 관련 문서의 검증 근거를 보완했으며, 제품 명세나 단계 상태의 원본을 대체하지 않는다. 현재 상태가 바뀌면 [원본 저장소](https://github.com/jo4086/maple-insight), [루트 로드맵](https://github.com/jo4086/maple-insight/blob/main/ROADMAP.md), [현재 목표](https://github.com/jo4086/maple-insight/blob/main/GOAL.md), 각 앱·패키지의 검증 기록을 다시 확인한다.

## 읽는 순서

| 문서                                            | 포트폴리오 제작에 쓰는 정보                           |
| ----------------------------------------------- | ----------------------------------------------------- |
| [프로젝트와 아키텍처](./architecture.md)        | 문제 정의, 모노레포 경계, 시스템 구조                 |
| [핵심 흐름](./flows.md)                         | 검색, 수집, 게임 데이터 관리의 실제·계획 흐름         |
| [앱별 분석](./applications.md)                  | back, frontend, ingestor, electron의 책임과 구현 근거 |
| [패키지 분석](./packages.md)                    | 계약, DB, 정적 데이터, 생성기, 계산 로직의 역할       |
| [구현 상태와 미완성 영역](./status-and-gaps.md) | 검증된 성과와 아직 주장하면 안 되는 기능              |
| [포트폴리오 구성 가이드](./portfolio-brief.md)  | 사례 선택, 화면·코드 근거, 표현 시 주의점             |

## 개발 경험과 설계 판단

| 문서                                              | 내용                                                                   |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| [개발 경험 기록](./development-history.md)        | 도구 선택과 AI 활용 방식의 변화에 관한 작성자 경험                     |
| [아키텍처 발전 과정](./architecture-evolution.md) | 공통 타입 공유에서 도메인·계약 중심 패키지 구조로 바뀐 과정과 Git 기록 |

## 시각 자료

기술 사례를 설명할 때 사용하는 참고 이미지다. 이미지는 실제 구현 근거를 보조하며, 기능의 완료 여부나 현재 동작 상태를 단독으로 증명하지 않는다.

| 자료                        | 경로                              | 활용 목적                                                              |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| Nexon Open API 및 타입 설계 | [api-types/](./images/api-types/) | 외부 API 명세, Raw 타입, 정규화 계약 및 오류 처리 구조                 |
| Database 아키텍처 및 ERD    | [database/](./images/database/)   | DB 패키지 책임 분리, 실제 디렉터리 구조, PostgreSQL 스키마별 ERD       |
| Electron 관리 도구          | [electron/](./images/electron/)   | 버전 비교, 직업 데이터 관리, 스킬 추출 및 조회 화면, Electron 아키텍처 |

### 주요 아키텍처 이미지

| 이미지                                                                          | 설명                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Database 패키지 아키텍처](./images/database/database-package-architecture.png) | `@maple/data-admin` → `@maple/db` → PostgreSQL 의존성        |
| [DB 패키지 구조](./images/database/database-db-structure.png)                   | Prisma, Repository, Admin API 등 실제 디렉터리 구조          |
| [Data Admin 패키지 구조](./images/database/database-admin-structure.png)        | Seed 및 Export 실행 스크립트 구조                            |
| [Electron 아키텍처](./images/electron/electron-architecture-overview.png)       | Renderer, Preload, Main Process, DB 및 로컬 파일 관리의 관계 |

## 기술 참고자료

| 문서                                                               | 활용 목적                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------ |
| [Electron 아키텍처](./references/electron-architecture.md)         | 프로세스별 책임, DB 연동, Workbench 및 버전 관리 설계  |
| [Electron IPC 데이터 흐름](./references/electron-ipc-data-flow.md) | IPC 채널 등록, 입력 검증, Service 호출 및 DB 조회 경로 |

참고자료는 분석 및 포트폴리오 작성의 근거로 사용한다. 실제 구현과 차이가 발견되면 원본 코드와 최신 검증 기록을 우선한다.

## 자료 활용 원칙

이 디렉터리는 Maple Insight 포트폴리오 제작을 위한 분석 및 참고자료를 관리한다.

- `README.md`는 자료의 인덱스 역할을 한다.
- 분석 문서는 프로젝트의 구조, 개발 과정, 구현 상태를 이해하기 위한 자료다.
- `references/`는 실제 코드에 근거한 상세 기술 설명을 제공한다.
- `images/`는 UI 스크린샷, 아키텍처 다이어그램, ERD 등의 시각 자료를 보관한다.
- 포트폴리오 제작 요구사항과 실행 계획은 블로그 프로젝트의 기존 `docs/REQUIREMENTS/`, `docs/SPEC/`, `docs/GOAL/` 및 관련 문서 체계에서 관리한다.

이 디렉터리의 자료는 작업 지시문이 아니며, 필요한 범위에서 선택적으로 참조한다.

## 해석 기준

- **구현**은 관련 코드가 존재함을 뜻한다. 실제 환경에서 기능이 끝까지 작동했다는 뜻은 아니다.
- **검증 완료**는 담당 문서에 종료 근거가 있는 단계에만 사용한다.
- **부분 구현**과 **계획**은 공개 서비스의 제공 기능처럼 표현하지 않는다.
- 수치는 해당 검증 기록의 시점과 대상을 함께 적는다. 현재 운영 수치나 성능 개선률로 일반화하지 않는다.

우선 확인할 원본은 [프로젝트 소개](https://github.com/jo4086/maple-insight/blob/main/README.md), [SPEC](https://github.com/jo4086/maple-insight/blob/main/SPEC.md), [ROADMAP](https://github.com/jo4086/maple-insight/blob/main/ROADMAP.md), [GOAL](https://github.com/jo4086/maple-insight/blob/main/GOAL.md), [Electron 단계 상태](https://github.com/jo4086/maple-insight/blob/main/apps/electron/docs/GOAL/README.md), [DB 단계 상태](https://github.com/jo4086/maple-insight/blob/main/packages/database/db/docs/ROADMAP.md)다.
