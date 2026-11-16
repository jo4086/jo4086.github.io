# Maple Insight 포트폴리오 분석 자료

아래 분석 문서 6개는 2026-11-16 Maple Insight 저장소 기준의 **포트폴리오 제작용 사실 자료**를 이 저장소에 옮긴 사본이다. 제품 명세나 단계 상태의 원본을 대체하지 않는다. 현재 상태가 바뀌면 [원본 저장소](https://github.com/jo4086/maple-insight), [루트 로드맵](https://github.com/jo4086/maple-insight/blob/main/ROADMAP.md), [현재 목표](https://github.com/jo4086/maple-insight/blob/main/GOAL.md), 각 앱·패키지의 검증 기록을 다시 확인한다.

## 읽는 순서

| 문서 | 포트폴리오 제작에 쓰는 정보 |
| --- | --- |
| [프로젝트와 아키텍처](./architecture.md) | 문제 정의, 모노레포 경계, 시스템 구조 |
| [핵심 흐름](./flows.md) | 검색, 수집, 게임 데이터 관리의 실제·계획 흐름 |
| [앱별 분석](./applications.md) | back, frontend, ingestor, electron의 책임과 구현 근거 |
| [패키지 분석](./packages.md) | 계약, DB, 정적 데이터, 생성기, 계산 로직의 역할 |
| [구현 상태와 미완성 영역](./status-and-gaps.md) | 검증된 성과와 아직 주장하면 안 되는 기능 |
| [포트폴리오 구성 가이드](./portfolio-brief.md) | 사례 선택, 화면·코드 근거, 표현 시 주의점 |

## 개발 경험과 설계 판단

| 문서 | 내용 |
| --- | --- |
| [개발 경험 기록](./development-history.md) | 도구 선택과 AI 활용 방식의 변화에 관한 작성자 경험 |
| [아키텍처 발전 과정](./architecture-evolution.md) | 공통 타입 공유에서 도메인·계약 중심 패키지 구조로 바뀐 과정과 Git 기록 |

## 해석 기준

- **구현**은 관련 코드가 존재함을 뜻한다. 실제 환경에서 기능이 끝까지 작동했다는 뜻은 아니다.
- **검증 완료**는 담당 문서에 종료 근거가 있는 단계에만 사용한다.
- **부분 구현**과 **계획**은 공개 서비스의 제공 기능처럼 표현하지 않는다.
- 수치는 해당 검증 기록의 시점과 대상을 함께 적는다. 현재 운영 수치나 성능 개선률로 일반화하지 않는다.

우선 확인할 원본은 [프로젝트 소개](https://github.com/jo4086/maple-insight/blob/main/README.md), [SPEC](https://github.com/jo4086/maple-insight/blob/main/SPEC.md), [ROADMAP](https://github.com/jo4086/maple-insight/blob/main/ROADMAP.md), [GOAL](https://github.com/jo4086/maple-insight/blob/main/GOAL.md), [Electron 단계 상태](https://github.com/jo4086/maple-insight/blob/main/apps/electron/docs/GOAL/README.md), [DB 단계 상태](https://github.com/jo4086/maple-insight/blob/main/packages/database/db/docs/ROADMAP.md)다.
