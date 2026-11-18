export interface Project {
  slug: string
  name: string
  status: string
  summary: string
  description: string
  image: string
  screenshots: Array<{ src: string; caption: string }>
  stack: string[]
  features: string[]
  architecture: string
  challenge: string
  solution: string
  repository: string
  relatedPostSlugs: string[]
}

export const projects: Project[] = [
  {
    slug: 'maple-insight',
    name: 'Maple Insight',
    status: '단계별 개발 중',
    summary: '게임 데이터의 출처와 변경을 확인하며 캐릭터 조회와 데이터 관리를 연결하는 프로젝트',
    description: '외부 API 응답과 버전별 게임 원본을 분리해 조회하고 검증합니다.',
    image: '/maple-insight-preview.svg',
    screenshots: [],
    stack: ['TypeScript', 'React', 'Electron', 'Prisma', 'Turborepo'],
    features: ['캐릭터 조회 경로', '데이터 가져오기·검증·버전 비교', '편집 작업본 개발 중'],
    architecture: '조회 서비스와 데이터 관리 도구의 책임을 나눕니다.',
    challenge: '버전별 데이터의 출처와 검증 상태를 확인하기 어렵습니다.',
    solution: '원본 보존, 검증, 비교, 편집 단계를 분리합니다.',
    repository: 'https://github.com/jo4086/maple-insight',
    relatedPostSlugs: [],
  },
  {
    slug: 'codex-workspace',
    name: 'Codex Workspace',
    status: '소스 작업 공간',
    summary: '개발 지침을 작업별로 찾고 커밋 형식은 실행 시점에 검사하는 작업 공간',
    description: '재사용 가능한 Skill과 Git Hook을 설계하고 관리합니다.',
    image: '/codex-workspace-preview.svg',
    screenshots: [],
    stack: ['JavaScript', 'Node.js', 'Git Hooks'],
    features: ['작업별 Skill 지도', 'Git 커밋 제목 검사', '소스와 활성 환경 분리'],
    architecture: '지침 선택과 실행 가능한 검사를 분리합니다.',
    challenge: '지침이 늘어나면 필요한 규칙을 찾기 어렵고 형식 실수가 생깁니다.',
    solution: '책임별 Skill과 커밋 Hook으로 나눕니다.',
    repository: 'https://github.com/jo4086/codex-workspace',
    relatedPostSlugs: ['codex-workspace-engineering'],
  },
  {
    slug: 'portfolio-blog',
    name: 'Portfolio & Blog',
    status: '진행 중',
    summary: '개발 프로젝트와 다양한 기록을 한곳에서 보여주는 정적 웹사이트',
    description:
      'GitHub Pages에 배포할 포트폴리오와 개인 블로그를 함께 구성하고 있습니다. 프로젝트의 기술적 맥락과 글의 탐색 경험을 분리해 설계합니다.',
    image: '/project-preview.svg',
    screenshots: [
      { src: '/project-home.png', caption: 'Home 화면' },
      { src: '/project-blog.png', caption: '게시글 상세와 탐색 화면' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    features: ['프로젝트 목록과 기술 필터', 'Markdown 기반 게시글', '카테고리·태그·아카이브 탐색'],
    architecture:
      '공통 라우팅과 레이아웃 아래에 portfolio와 blog 기능을 분리합니다. 게시글 원본은 Markdown으로 관리하고, 정적 빌드에 포함합니다.',
    challenge:
      'GitHub Pages의 정적 호스팅에서 상세 페이지를 직접 열거나 새로고침할 때 경로가 유지되어야 합니다.',
    solution:
      'React Router의 HashRouter를 선택해 경로를 URL 해시에 보관합니다. 사용성과 URL 형태의 차이는 아키텍처 문서에 기록했습니다.',
    repository: 'https://github.com/jo4086/jo4086.github.io',
    relatedPostSlugs: ['site-architecture', 'tailwind-setup'],
  },
]

export const projectTechnologies = Array.from(new Set(projects.flatMap((project) => project.stack)))

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
