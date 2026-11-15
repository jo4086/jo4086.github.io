---
slug: tailwind-setup
title: Tailwind CSS v4를 Vite에 연결한 기록
date: '2026-11-16'
summary: 설치된 패키지를 확인하고 Vite 플러그인과 CSS 진입점을 연결한 과정을 기록합니다.
category: 기술/프론트엔드
tags: [Tailwind CSS, Vite, CSS]
relatedProjects: [portfolio-blog]
---

프로젝트에는 `tailwindcss`와 `@tailwindcss/vite`가 이미 설치되어 있었지만, Vite 설정과 CSS 진입점에는 아직 연결되지 않았습니다.

## 연결한 부분

Vite 플러그인 목록에 Tailwind 플러그인을 추가했습니다. 처음에는 `src/index.css`에서 Tailwind를 가져왔고, UI를 구성하면서 진입점을 `src/styles/global.css`로 옮겼습니다. 화면 스타일은 Tailwind 유틸리티로 작성하고, Markdown 본문에 필요한 선택자만 `src/styles/markdown.css`에 둡니다.

## 검증

`pnpm check`와 `pnpm build`를 실행하고, 생성된 CSS에 Tailwind 출력이 포함됐는지 확인했습니다. 기존 시작 화면도 브라우저에서 확인했습니다.

### 다음 UI 작업

페이지가 늘어나면 공통 색상과 간격을 정리하되, 실제로 공유하는 스타일만 추출할 계획입니다.
