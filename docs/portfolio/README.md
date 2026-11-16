# 포트폴리오 문안

> 이름: **jo4086**
> GitHub: [jo4086](https://github.com/jo4086)

[이력서 디자인 참고 자료](../../screenshots/manual/resume-design-reference.pdf)의 한 페이지 구성을 따라 핵심만 적었습니다. [다운로드용 PDF](../../public/portfolio.pdf)의 편집 원고는 [resume.html](./resume.html)입니다. 프로젝트의 구현 상태는 2026-11-16 기준 자료에 근거합니다.

## About Me

두 개인 프로젝트를 AI와 함께 개발했습니다. Maple Insight에서 데이터와 앱의 경계를 설계했고, 개발 기간이 길어지며 필요해진 일관된 지침과 검사 방식을 Codex Workspace로 발전시켰습니다. 구현한 범위와 앞으로 만들 범위를 분명히 기록하는 것을 중요하게 생각합니다.

## Skills

| 구분 | 기술 |
| --- | --- |
| 언어 | TypeScript, JavaScript |
| 프런트엔드 | React |
| 앱·서버 | Electron, Node.js, Express |
| 데이터 | PostgreSQL, Prisma, Redis |
| 개발 도구 | pnpm workspace, Turborepo, Git Hooks |

위 목록은 아래 프로젝트의 코드와 분석 문서에 등장하는 기술입니다. 개인 숙련도나 실무 경력을 뜻하지 않습니다.

## Projects

### Maple Insight

메이플스토리 캐릭터 조회와 버전별 게임 데이터 관리를 위한 TypeScript 모노레포입니다. 외부 API 응답, 제품 계약, 정적 게임 데이터, DB 작업을 분리했습니다. Electron Data Studio에서는 **가져오기·검증·버전 비교** 단계의 완료 기록이 있으며, 편집 작업본은 진행 중입니다. 승인 반영과 그 뒤의 생성 자동화는 후속 단계입니다.

- **나의 역할:** 패키지 경계, 공통 타입의 위치, 백엔드·프런트엔드 구조를 설계했습니다. 초기에는 Codex와의 대화와 직접 작성한 예시 코드로 방향을 제시했습니다.
- **설계 판단:** 원본 보존 → 검증 작업본 → 버전 비교 → 편집 작업본으로 신뢰 경계를 나눴습니다.
- **기술:** TypeScript, React, Electron, Express, Prisma, PostgreSQL, pnpm workspace, Turborepo
- **자세히:** [프로젝트 분석](./maple-insight/README.md) · [아키텍처 발전 과정](./maple-insight/architecture-evolution.md) · [구현 상태와 한계](./maple-insight/status-and-gaps.md)

### Codex Workspace

Codex 사용자 설정을 설계·관리하는 소스 작업 공간입니다. 작업 책임에 따라 필요한 Skill을 고르는 `skill-router`와 Git 커밋 제목 형식을 검사하는 Hook을 사례로 정리했습니다. 저장소의 구현 소스와 실제 사용자 환경에 설치된 상태는 구분합니다.

Maple Insight에서 frontend·back·electron처럼 역할이 다른 앱의 지침을 README·AGENTS만으로 관리하기 어려워졌습니다. 이 경험을 바탕으로 각 역할의 설명을 찾기 쉽고 일관되게 관리하려고 Codex Workspace를 만들었습니다. 두 프로젝트 모두 AI를 적극 활용한 개인 프로젝트입니다.

- **설계 판단:** Skill 선택은 명시적인 책임 지도에, 커밋 제목 검사는 실행 가능한 Git Hook에 맡겼습니다.
- **기술:** Markdown, JavaScript, Node.js, Git Hooks
- **자세히:** [프로젝트 분석](./codex-workspace/README.md) · [구현 사례](./codex-workspace/engineering-case-studies.md) · [검증 범위](./codex-workspace/quality-and-limitations.md)

## Developer Workflow Automation

반복되는 개발 절차를 문서만으로 기억하지 않도록, 선택 기준은 Skill 문서로 남기고 객관적인 형식 규칙은 Hook으로 검사했습니다. 이 접근이 모든 작업의 정확도나 생산성을 높였다는 정량적 결과는 아직 없습니다. [Codex Workspace의 두 구현 사례](./codex-workspace/engineering-case-studies.md)에서 실제 동작과 적용 범위를 확인할 수 있습니다.

## 사이트 입력용 문안

- [자기소개](./self-introduction.md): 성향 선택과 강점·학습·목표 서술 초안
- [스타트업에 기대하는 점](./startup-expectations.md): 기대 요소 선택과 서술 초안
