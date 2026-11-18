---
slug: maple-insight-api-types
title: 외부 API가 늘어날 때 타입은 어떻게 추가할까
date: '2026-11-18'
summary: Maple Insight의 4파일 규칙과 Raw 응답·내부 계약의 경계를 실제 ability 코드로 살펴봅니다.
category: 개발/아키텍처
tags: [Maple Insight, API, TypeScript]
relatedProjects: [maple-insight]
---

Maple Insight는 외부 API 응답을 가져와 캐릭터 정보를 보여줍니다. 외부 필드 이름과 빈 값 처리 방식을 화면 곳곳에 퍼뜨리면 API가 바뀔 때 수정할 곳을 찾기 어렵습니다. 그래서 저는 **외부 명세를 기록하는 타입**과 **제품 안에서 쓰는 계약**의 책임을 나눴습니다. 패키지가 이렇게 나뉘기까지의 과정은 [설계 변화 글](/#/blog/maple-insight-architecture-evolution)에 정리했습니다.

## API 하나를 네 파일로 정의한다

`character/ability`는 [`contract.ts`, `params.ts`, `raw.ts`, `index.ts`](https://github.com/jo4086/maple-insight/tree/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/src/ability)로 구성됩니다.

| 파일          | 책임                                                  |
| ------------- | ----------------------------------------------------- |
| `contract.ts` | `/character/ability`, 필수 `ocid`, 선택 `date`를 선언 |
| `params.ts`   | 요청 객체의 TypeScript 타입을 선언                    |
| `raw.ts`      | 외부 응답의 필드와 값 형식을 표현                     |
| `index.ts`    | 이 API의 정의를 재내보냄                              |

![ability API의 contract, params, raw, index 네 파일을 나란히 보여 주는 작성자 코드 캡처](/cases/maple-insight/api/ability-four-files.png)

캡처는 2026년 11월 17일 작성자가 로컬 코드에서 촬영했습니다. 표는 좌우로, 캡처는 화면 안에서 상하좌우로 이동해 볼 수 있습니다. 핵심 규칙은 아래의 짧은 코드와 같습니다.

```ts
export const CHARACTER_ABILITY_CONTRACT = {
  endpoint: '/character/ability',
  requiredParams: ['ocid'] as const,
  optionalParams: ['date'] as const,
} as const

export type CharacterAbilityParams = {
  ocid: string
  date?: string
}
```

같은 구조는 [ranking/overall](https://github.com/jo4086/maple-insight/tree/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/ranking/src/overall)에도 있습니다. 확인한 코드 시점에는 네 파일을 모두 가진 엔드포인트 디렉터리가 28개였습니다. 이는 **반복되는 작성 규칙**의 근거이며, 명세 자동 동기화의 근거는 아닙니다.

## 원본 응답과 내부 계약의 경계

`raw.ts`의 `AbilityRaw`는 외부 응답을 표현합니다. [백엔드의 `ability.mapper.ts`](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/back/src/domain/character/mappers/ability.mapper.ts)는 이를 `CharacterAbility`로 변환합니다. 변환 결과의 타입은 별도 `contracts` 패키지에 있습니다.

```text
외부 API 응답 → AbilityRaw → 백엔드 매퍼 → CharacterAbility → 제품 코드
```

따라서 API 응답의 이름과 제품 데이터의 의미를 같은 타입으로 묶지 않습니다. 이 경계가 실제 모든 필드의 최신 명세 일치를 보증하지는 않습니다.

## 새 API는 사람이 시작하고 확인한다

새 엔드포인트가 필요하면 [Nexon Open API의 메이플스토리 문서](https://openapi.nexon.com/game/maplestory/)에서 해당 항목의 명세와 유사한 기존 구현을 확인하고 네 파일을 작성합니다. 이어서 [상위 index](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/src/index.ts), [빌드 entry](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/tsup.config.ts), [package exports](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/packages/api-types/character/package.json)에 공개 경로를 연결하고 타입 검사와 호출부를 확인합니다. AI는 문서 탐색과 코드 작성에 도움을 줄 수 있지만, 추가 작업은 사용자의 지시로 시작합니다. [명세 감시 구상](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/docs/electron/nexon-open-api-spec-monitoring.md)은 아직 제안입니다.

이 글은 2026년 11월 16일 코드 스냅샷을 기준으로 파일 구조와 매퍼 경계를 확인한 기록입니다. 실제 Nexon API를 새로 호출하거나 모든 필드를 최신 공식 문서와 대조한 결과는 아닙니다. 예를 들어 `ranking/overall`은 선택 파라미터 목록과 요청 타입의 선택성에 차이가 있어 공개 전 개별 명세 재확인이 필요합니다.

[프로젝트 소개](/#/projects/maple-insight) · [DB 설계 사례](/#/blog/maple-insight-database) · [Electron Data Studio 사례](/#/blog/maple-insight-electron-data-studio)
