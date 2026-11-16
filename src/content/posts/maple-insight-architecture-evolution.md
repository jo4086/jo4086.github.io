---
slug: maple-insight-architecture-evolution
title: Maple Insight의 공유 패키지는 왜 다시 나뉘었나
date: '2026-11-16'
summary: 공통 타입에서 시작한 모노레포가 외부 응답과 제품 계약, 게임 규칙의 책임을 구분하기까지의 설계 판단을 기록했습니다.
category: 개발/아키텍처
tags: [Maple Insight, 모노레포, 설계]
relatedProjects: [maple-insight]
pdf: /maple-insight-architecture-evolution.pdf
---

Maple Insight는 메이플스토리 캐릭터 정보와 버전별 게임 데이터를 다루는 개인 프로젝트입니다. 프런트엔드, 백엔드, Electron 도구가 늘어나면서 “여러 앱에서 쓰는 코드를 어디에 둘까?”라는 질문이 “각 데이터의 뜻과 책임을 누가 정할까?”로 바뀌었습니다. 이 글은 그 변화의 이유를 설명합니다. AI는 구현과 수정에 적극 활용했고, 패키지의 경계와 앱 구조를 바꾸는 판단에는 제가 직접 참여했습니다.

## 처음에는 함께 쓰는 타입이면 충분했다

처음 모노레포에는 앱과 `packages/types`가 있었습니다. 여러 저장소를 개별적으로 관리하는 대신 pnpm workspace와 Turborepo로 앱·공유 패키지를 한곳에서 다루려는 선택이었습니다. 이 단계의 목적은 중복되는 형식을 한 번 정의해 재사용하는 것이었습니다. 당시 [저장소 구조](https://github.com/jo4086/maple-insight/tree/7d1dd192facf112972e687036a7f640baafb3c22)를 보면 `packages/types`만 있었습니다.

기능이 늘자 공통 대상을 UI와 유틸리티까지 확장했습니다. [다음 시점의 패키지 목록](https://github.com/jo4086/maple-insight/tree/c2f7289d46a7bd0961045e4a83cddada541a0576/packages)에는 타입, UI, 유틸리티 등이 기능의 **종류별**로 나뉘어 있습니다. 재사용할 코드를 찾기에는 편했지만, 데이터가 외부 API에서 온 것인지, 우리 화면과 서버가 합의한 형식인지까지 알려주지는 못했습니다.

![공통 타입에서 기능별 공유를 거쳐 책임별 패키지로 바뀐 세 단계. 각 단계의 패키지 목록과 변경 이유가 아래로 이어진다.](/diagrams/maple-insight-architecture-stages.svg)

그림의 순서는 **공통 타입 공유 → UI·유틸리티 등 종류별 공유 → 데이터의 출처와 책임별 분리**입니다. 화살표는 실행 흐름이나 패키지 의존성이 아니라 설계 기준이 바뀐 순서를 나타냅니다.

## 코드 종류보다 데이터의 뜻이 중요해졌다

외부 API가 돌려주는 응답 형식을 화면에서 그대로 쓰면, 외부 필드 이름이나 빈 값 처리 방식이 제품의 데이터 규칙처럼 퍼질 수 있습니다. 반대로 원본 타입과 내부에서 쓰는 타입을 구별하면, 변환을 어느 지점에서 하는지 설명하기 쉬워집니다. 그래서 [도메인 중심으로 재구성한 패키지 목록](https://github.com/jo4086/maple-insight/tree/e0a429f668470c9359249b25bb7f6007bb2570b4/packages)에는 다음과 같은 책임을 나눴습니다.

| 영역                     | 맡은 일                                     |
| ------------------------ | ------------------------------------------- |
| `api-types`              | 외부 API 응답의 원래 형태를 표현            |
| `contracts`              | 앱 사이에서 사용할 내부 데이터 계약을 정의  |
| `game-data`              | 게임 분류·장비·스킬 등 도메인 데이터를 관리 |
| `database`               | 저장과 조회의 책임을 담당                   |
| `generator`, `simulator` | 데이터 생성과 계산 규칙을 각각 담당         |

이것은 패키지 이름을 바꾼 것만이 아닙니다. 서로 다른 앱이 같은 데이터를 각자 해석하는 상황을 줄이기 위해 **공개 인터페이스와 책임 경계**를 정한 변화였습니다. 이 단계에서 개별 패키지의 `package.json`, `exports`, TypeScript·빌드 설정도 구성했습니다. 다만 패키지를 나눴다는 사실만으로 모든 경로의 통합 검증이 끝난 것은 아닙니다.

## 실제 코드에서는 경계가 어떻게 보일까

캐릭터 기본 정보 한 가지를 보면 경계가 더 구체적입니다. 백엔드의 [`toCharacterBasic` 매퍼](https://github.com/jo4086/maple-insight/blob/main/apps/back/src/domain/character/mappers/basic.mapper.ts)는 외부 응답 타입인 `BasicRaw`를 받아 내부 계약인 `CharacterBasic`으로 바꿉니다. 프런트엔드도 [`@maple/contracts` 타입을 가져와](https://github.com/jo4086/maple-insight/blob/main/apps/frontend/src/features/character/types.ts) 화면 데이터 형식을 이해합니다.

![캐릭터 기본 정보의 확인된 타입 경계. 외부 응답 타입을 백엔드 매퍼가 내부 계약으로 변환하고, 프런트엔드가 계약을 사용한다. Electron과 DB는 별도 관리 경로다.](/diagrams/maple-insight-contract-boundary.svg)

그림의 위쪽은 **외부 응답 타입 → 백엔드 매퍼 → 내부 계약 → 프런트엔드**라는 확인된 코드 사례입니다. 이는 모든 API 응답이나 전체 제품의 실행 흐름을 대표한다는 뜻은 아닙니다. 아래쪽의 Electron은 [`@maple/data-core`와 `@maple/db`를 사용](https://github.com/jo4086/maple-insight/blob/main/apps/electron/package.json)하는 별도 관리 도구로 표시했습니다. 캐릭터 조회와 데이터 관리 경로를 하나의 화살표로 이어 놓지 않은 이유입니다.

## 무엇을 배웠고, 어디까지 확인했나

처음에는 재사용 가능한 코드를 한곳에 모으는 것이 목표였습니다. 지금은 외부 데이터의 원형, 제품 안에서 합의한 형식, 게임 규칙과 저장 책임을 구분하는 것이 더 중요하다고 생각합니다. 설계는 처음부터 완성되지 않았고, 실제로 앱과 기능이 늘어날 때마다 바꾸어 왔습니다.

위 Git 기록과 코드 경로는 **구조가 바뀌었고 특정 변환·사용 사례가 존재한다는 근거**입니다. 성능 향상률, 코드 재사용률, 모든 앱의 통합 완료를 입증하지는 않습니다. 현재 구현과 진행 중인 범위는 [Maple Insight 프로젝트 상세 페이지](/#/projects/maple-insight)에서 구분해 볼 수 있습니다. 이 프로젝트에서 지침 관리 방식을 바꾸게 된 경험은 [Codex Workspace 프로젝트 상세 페이지](/#/projects/codex-workspace)에 이어집니다.
