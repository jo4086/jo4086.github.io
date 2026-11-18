---
slug: maple-insight-electron-data-studio
title: Electron Data Studio에서 DB와 로컬 파일을 잇는 방법
date: '2026-11-18'
summary: 개발 실행 화면 세 장으로 IPC, 버전 비교, 직업 편집, 스킬 아이콘의 확인된 경계를 설명합니다.
category: 개발/아키텍처
tags: [Maple Insight, Electron, 데이터 관리]
relatedProjects: [maple-insight]
---

Maple Insight에는 사이트 운영용 웹 관리자와 게임 원본을 다루는 로컬 도구를 분리하려는 설계 판단이 있습니다. 웹 관리자 import 화면은 현재 제출 동작이 연결되지 않은 초안입니다. Electron Data Studio는 개발 중이며, 아래 화면은 작성자가 **2026년 11월 17일 `pnpm dev`로 실행해 내부 테스트**하면서 촬영했습니다. 배포된 설치 앱의 화면은 아닙니다.

## 화면 요청은 IPC를 거친다

Renderer는 `window.api`를 호출합니다. [Preload](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/preload/index.ts)가 허용된 호출을 Main의 IPC 채널로 전달하고, [직업 데이터 핸들러](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/job-data.ts)는 요청을 검증해 [서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/jobs/job-data.ts)를 부릅니다. 서비스 뒤에서는 요청에 따라 DB와 로컬 파일의 경로가 갈라집니다.

```text
Renderer → Preload → Main IPC → 서비스 ┬→ @maple/db
                                      └→ 로컬 JSON·작업본·PNG
```

이 흐름은 작성자가 Electron·DB·백엔드 연결을 분석해 제공한 전체 아키텍처 그림을 코드와 대조해 단순화한 것입니다. 전체 그림은 모바일에서 글자가 작아 한 요청의 경계만 옮겼습니다. Renderer가 DB나 파일을 직접 여는 구조로 설명하지 않습니다.

## 버전 비교: DB의 버전 확인, 파일의 내용 비교

![버전별 원본 데이터의 추가 항목을 표시한 Electron 개발 실행 화면](/cases/maple-insight/electron/version-comparison.png)

화면의 추가·변경·삭제 비교는 [Phase03 검증 기록](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REVIEW/Phase03.md)의 fixture·native 검증 범위입니다. [Runtime](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/app/runtime.ts)은 DB에서 등록된 버전과 상태를 확인하고, [raw diff 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/diff/raw-data-diff-service.ts)는 버전별 **로컬 JSON 파일**을 비교합니다. 캡처의 차이 목록은 DB 행끼리 비교한 결과가 아닙니다.

## 직업 편집: DB 조회와 로컬 작업본

![히어로 직업의 이름, 직업군, 소속, 주스탯을 인라인 편집하는 Electron 개발 실행 화면](/cases/maple-insight/electron/job-inline-edit.png)

[job-data 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/jobs/job-data.ts)는 `@maple/db`에서 버전별 직업·무기 목록을 읽습니다. 화면의 편집은 로컬 edit workbench에 변경을 쌓습니다. [직업 화면 검증 기록](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REQUESTS/job-data-tab.md)에는 모의 브라우저 확인이 있고, [Phase04](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/GOAL/README.md)는 부분 구현·부분 검증입니다. 캡처 하단의 “작업본에 적용”도 DB에 승인 반영했다는 뜻은 아닙니다.

## 스킬 아이콘: 스킬 행과 PNG는 다른 입력

![스킬 목록에 추출된 아이콘을 표시한 Electron 개발 실행 화면](/cases/maple-insight/electron/skill-icons.png)

[skill-data IPC](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/ipc/skill-data.ts)는 DB의 스킬·레벨 행을 읽습니다. [이미지 서비스](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/src/main/services/skills/skill-images.ts)는 로컬 PNG를 읽어 화면에 연결합니다. 아이콘은 별도 C# 추출기가 WZ 입력에서 만들며, [기존 Electron REVIEW](https://github.com/jo4086/maple-insight/blob/34ce9f22703283594d2b9aa3d831d11ec63b92b5/apps/electron/docs/REVIEW.md)는 특정 전직의 추출·표시를 확인했습니다. 모든 직업 자동 추출과 Windows 설치본 동작, PNG의 DB 저장은 이 화면만으로 확인할 수 없습니다.

세 캡처는 실제 개발 실행 화면이고, DB는 작성자의 DBeaver 환경에도 연결되어 있습니다. 이 글에서 새로 앱이나 DB를 실행한 검증은 하지 않았습니다. 원본 코드와 기존 REVIEW를 기준으로 **버전 비교의 검증 범위**, **직업 편집의 부분 구현**, **DB 승인 publish의 계획**을 나눠 기록했습니다.

[프로젝트 소개](/#/projects/maple-insight) · [설계 변화 글](/#/blog/maple-insight-architecture-evolution) · [API 타입 사례](/#/blog/maple-insight-api-types) · [DB 설계 사례](/#/blog/maple-insight-database)
