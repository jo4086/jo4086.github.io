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
