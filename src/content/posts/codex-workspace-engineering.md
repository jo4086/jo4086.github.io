---
slug: codex-workspace-engineering
title: Codex Workspace는 지침 선택과 커밋 검사를 왜 나눴나
date: '2026-11-17'
summary: Maple Insight에서 시작된 지침 관리 문제를 Skill 지도와 Git Hook으로 풀어 가며, 각각 무엇을 확인할 수 있는지 살펴봅니다.
category: 개발/워크플로
tags: [Codex Workspace, Skill, Git Hook]
relatedProjects: [codex-workspace]
---

Maple Insight를 오래 개발하면서 프런트엔드, 백엔드, Electron처럼 책임이 다른 영역의 규칙을 한곳에서 찾아 쓰기 어려워졌습니다. 처음에는 README와 AGENTS 문서를 이정표로 삼았지만, 작업의 종류가 늘수록 **지금 필요한 지침이 어디에 있는지** 알아야 했습니다. 이 경험을 다른 개발 작업에도 적용하려고 만든 개인 프로젝트가 Codex Workspace입니다. AI를 적극 활용해 구현했으며, 작업별 책임과 문서 경계를 나누는 방향은 제가 정했습니다.

이 프로젝트는 사용자용 앱이 아닙니다. [저장소](https://github.com/jo4086/codex-workspace)는 재사용할 Skill과 Hook의 **소스 작업 공간**입니다. 작성된 소스, 아직 제안 중인 문서, 실제 에이전트 환경에 설치된 파일은 서로 구분합니다.

## 문제를 두 종류로 나눴다

첫 문제는 **판단이 필요한 지침 선택**입니다. 화면을 바꾸는 작업에는 UI 지침이, 문서 구조를 바꾸는 작업에는 문서 지침이 필요합니다. 모든 규칙을 매번 읽게 하거나 같은 규칙을 여러 파일에 복사하면 관리하기 어렵습니다.

둘째 문제는 **형식이 정해진 커밋 제목 검사**입니다. 커밋 메시지 규칙을 문서에만 적어 두면, 실제 커밋 순간에 형식 오류를 막을 수 없습니다. 그래서 작업 맥락에 따라 읽는 Skill과, Git이 커밋할 때 실행하는 Hook을 다른 경로로 두었습니다.

| 경로       | 맡은 일                                    | 현재 확인할 수 있는 것                    |
| ---------- | ------------------------------------------ | ----------------------------------------- |
| Skill 지도 | 요청에 맞는 지침과 참고 문서를 찾도록 안내 | 선택 절차·책임 지도·문서 링크             |
| Git Hook   | 커밋 메시지의 첫 줄을 정해진 형식으로 검사 | 등록 파일·연결 코드·검사 코드·소스 테스트 |

## Skill은 작업에 맞는 설명을 찾는 지도다

[`skill-router`](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/SKILL.md)는 요청의 책임을 파악하고, [Skill 지도](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/skill-map.md)에서 필요한 Skill을 고른 뒤 해당 `SKILL.md`와 관련 참고 문서만 읽는 순서를 적어 둡니다. 예를 들어 문서 작업에는 [`agent-doc-writer`](https://github.com/jo4086/codex-workspace/blob/main/skills/agent-doc-writer/SKILL.md)가 쓰기·README·탐색 지침의 위치를 안내합니다. 라우팅과 UI처럼 책임이 겹치는 작업에는 두 Skill을 함께 적용할 수 있지만, 각 규칙의 소유 문서는 분명히 둡니다.

![작업 요청을 책임별 Skill 지도로 분류한 뒤 선택된 지침과 필요한 참고 문서로 좁혀 읽는 흐름. 계획 문서는 별도 영역에 둔다.](/diagrams/codex-workspace-skill-flow.svg)

그림은 **요청 → 책임 분류와 Skill 지도 → 선택된 지침 → 필요한 참고 문서**의 읽기 순서입니다. [`TBD/`](https://github.com/jo4086/codex-workspace/blob/main/TBD/README.md)는 앞으로 만들거나 바꿀 대상을 논의하는 곳이며, 그 안의 제안이 곧 활성화된 Skill이라는 뜻은 아닙니다. 이 구조는 에이전트가 지침을 고를 때 참고할 명시적 절차입니다. 모든 요청에서 올바른 Skill이 자동 선택된다는 측정 결과는 없습니다.

## 형식 검사는 Git의 실행 시점에 둔다

커밋 제목에는 정해진 Type, 선택적 scope, `: ` 구분자와 비어 있지 않은 설명 등의 규칙이 있습니다. [`git-commit` Skill](https://github.com/jo4086/codex-workspace/blob/main/skills/git-commit/SKILL.md)은 사람이 읽을 작성 기준을 설명합니다. 실제 형식 검사는 Git의 `commit-msg` Hook이 메시지 파일을 읽는 시점에 맡겼습니다.

지원되는 직접 `git commit` 도구 명령은 [Hook 등록](https://github.com/jo4086/codex-workspace/blob/main/hooks/hooks.json)을 거쳐 [연결 스크립트](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/codex-pre-tool-use.mjs)에서 Git Hook 경로가 붙은 명령으로 바뀝니다. Git이 호출한 [검사기](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/commit-msg)는 제목 첫 줄을 검사해 형식 오류를 거절하고, 72자를 넘으면 경고합니다. 메시지 본문은 검사 대상이 아닙니다.

![지원되는 직접 커밋 명령에서 연결 스크립트가 Git Hook 경로를 지정하고, Git이 commit-msg 검사기에 메시지 파일을 전달하는 흐름.](/diagrams/codex-workspace-commit-flow.svg)

이 경로의 핵심은 **도구 입력을 연결하는 코드**와 **Git 메시지를 판정하는 코드**를 나눈 것입니다. 간접적으로 실행되는 커밋 명령은 현재 연결 스크립트의 대상이 아닙니다. 또한 명령별 `core.hooksPath` 지정은 그 명령에서 다른 Git Hook 디렉터리를 대신하므로, 설치할 때 기존 Hook과의 관계를 확인해야 합니다. [배포 설명](https://github.com/jo4086/codex-workspace/blob/main/hooks/README.md)에는 소스 파일과 활성 환경을 동기화하는 방법을 따로 적었습니다.

## 무엇을 검증했고, 무엇은 아직 모르는가

2026-11-17 로컬 소스에서 Hook 등록·연결·메시지 검사 테스트 3개 파일을 다시 실행해 실패 없이 마쳤습니다. [등록 테스트](https://github.com/jo4086/codex-workspace/blob/main/hooks/hooks.json.test.mjs), [연결 테스트](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/codex-pre-tool-use.test.mjs), [메시지 검사 테스트](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/commit-msg.test.mjs)가 확인하는 것은 **저장소 소스의 동작**입니다. 특정 사용자의 Codex 환경에서 Hook이 발견·신뢰·실행됐는지는 이 테스트로 알 수 없습니다.

Skill 지도도 실제 문서와 선택 절차가 있다는 점은 확인할 수 있지만, 에이전트의 선택 정확도나 개발 시간 단축 효과를 측정한 자료는 없습니다. 이 프로젝트에서 보여주려는 성과는 측정되지 않은 생산성 수치가 아니라, **지침의 책임을 찾는 구조와 형식 규칙을 검사하는 경계를 실제 소스로 만든 과정**입니다.

[Codex Workspace 프로젝트 소개](/#/projects/codex-workspace)에서 전체 맥락으로 돌아가거나, 이 문제의 출발점이 된 [Maple Insight 설계 변화](/#/blog/maple-insight-architecture-evolution)를 이어 읽을 수 있습니다.
