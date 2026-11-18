---
slug: maple-insight-database
title: 데이터 관리 명령과 저장 책임을 나눈 이유
date: '2026-11-18'
summary: data-admin, db 패키지와 네 PostgreSQL 스키마의 역할을 Prisma 모델과 실행점으로 확인합니다.
category: 개발/아키텍처
tags: [Maple Insight, PostgreSQL, Prisma]
relatedProjects: [maple-insight]
---

게임 데이터는 버전, 직업, 스킬, 장비처럼 서로 다른 생명주기를 가집니다. 관리 명령이 DB 모델과 조회 규칙까지 모두 소유하면 입력 방법이 바뀔 때 저장 코드도 함께 흔들립니다. Maple Insight에서는 **명령을 실행하는 곳**과 **데이터를 저장·조회하는 곳**을 분리했습니다.

## 실행점에서 DB 패키지까지

[`@maple/data-admin`의 seed 실행점](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/data-admin/src/seed-game-data-bundle.ts)은 [`@maple/db/admin`](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/src/admin/index.ts)의 관리 API를 호출합니다. `@maple/db`가 Prisma 스키마와 repository를 소유하고, `data-admin`은 시드와 내보내기 같은 명령의 진입점입니다. 두 패키지의 의존성도 이 방향으로 연결됩니다.

```text
관리 명령 (@maple/data-admin)
  → 관리 API·repository (@maple/db)
  → PostgreSQL
```

이것은 패키지 책임의 흐름입니다. 모든 관리 명령이 한 트랜잭션으로 실행된다는 뜻은 아닙니다.

## 네 스키마가 구분하는 데이터

[Prisma schema](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/prisma/schema.prisma)는 다음 네 PostgreSQL 스키마를 선언합니다.

| 스키마      | 대표 모델과 역할                                            |
| ----------- | ----------------------------------------------------------- |
| `app`       | `Ocid`, `SearchHistory`, `CharacterGroup` 등 앱 사용 데이터 |
| `ranking`   | 랭킹 기록 데이터                                            |
| `game_data` | 버전, 직업, 스킬과 레벨 데이터                              |
| `equipment` | 장비와 무기 분류 데이터                                     |

![game_data 스키마의 버전, 직업, 스킬, 스킬 레벨 모델 관계를 보여 주는 작성자 ERD 캡처](/cases/maple-insight/database/game-data-erd.png)

위 ERD는 작성자가 2026년 11월 17일 촬영한 DBeaver 자료입니다. 이 사례에서 필요한 관계만 텍스트로 읽으면 **`GameDataVersion` → `GameJob` → `GameSkill` → `GameSkillLevel`**입니다. 버전별 직업과 그 아래 스킬 데이터를 구분하는 모델 경계가 보입니다. `equipment`에는 `EquipmentItem`과 선택적인 `WeaponType` 관계도 있습니다.

## 확인한 범위와 다음 작업

원본 코드에서 schema, CLI 실행점, repository, 일부 개별 `$transaction` 호출을 확인했습니다. 기존 [DB 패키지 REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/database/db/docs/REVIEW.md)는 그때 수행한 작업별 검증 기록입니다. 모델이 존재한다는 사실과 전체 제품의 모든 데이터 입력이 끝났다는 주장은 다릅니다.

Electron에서 편집한 데이터를 검토한 뒤 DB에 승인 반영하는 흐름은 후속 단계입니다. 현재 [Electron Data Studio 사례](/#/blog/maple-insight-electron-data-studio)의 직업 편집 화면은 DB 조회와 로컬 작업본을 함께 사용하지만, 그 화면을 DB publish 완료 증거로 사용하지 않습니다. 작성자가 만든 전체 DB 구조 PNG는 `app`의 책임과 트랜잭션 범위가 실제 코드보다 넓게 읽혀 이 글의 자료에서 제외했습니다.

[프로젝트 소개](/#/projects/maple-insight) · [설계 변화 글](/#/blog/maple-insight-architecture-evolution) · [API 타입 사례](/#/blog/maple-insight-api-types)
