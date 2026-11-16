# REQ02-Phase03 검증 기록

[GOAL](../../GOAL/REQ02/Phase03.md) · [PDF SPEC](../../SPEC/REQ02/pdf.md)

- [x] [HTML 원고](../../portfolio/resume.html)에서 [최종 PDF](../../../public/portfolio.pdf)를 생성했다. 이름은 `jo4086`이고 공개 링크는 GitHub만 표시한다. Maple Insight의 구조 설계 역할과 Codex Workspace로 이어진 배경을 포함한다.
- [x] PyMuPDF로 한 페이지와 텍스트 추출, GitHub 링크 및 두 프로젝트의 `https://jo4086.github.io/#/projects/...` 링크 주석을 확인했다. 추출 텍스트에 이메일·전화번호가 없음을 확인하고 렌더링 이미지를 직접 보았다.
- [x] 로컬 사이트 Home의 `포트폴리오 PDF` 링크에서 `portfolio.pdf`를 다운로드했다. 데스크톱·모바일 Playwright 모두 다운로드 실패가 없었다.
- [ ] PDF의 스크린 리더 읽기 순서와 인쇄 결과를 확인한다.
- [ ] 배포된 사이트에서 PDF 다운로드와 두 프로젝트 링크, 상세 페이지 직접 접속·새로고침을 확인한다.

현재 브랜치의 로컬 파일과 화면은 확인했으나, 배포는 별도 요청이 없어 수행하지 않았다. 공개 URL의 실제 동작은 아직 검증되지 않았다.
