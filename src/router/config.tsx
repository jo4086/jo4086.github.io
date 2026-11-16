import type { RouteObject } from 'react-router'

import { ProjectDetailPage, ProjectsPage } from '../features/portfolio/ProjectPages'
import { ProjectStoryPage } from '../features/portfolio/ProjectStoryPage'
import { SiteLayout } from '../layouts/SiteLayout'
import { AboutPage } from '../pages/AboutPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'

import { BlogDetailPage, BlogListPage } from './lazy-pages'

export const routes: RouteObject[] = [
  { path: 'projects/maple-insight', element: <ProjectStoryPage slug="maple-insight" /> },
  { path: 'projects/codex-workspace', element: <ProjectStoryPage slug="codex-workspace" /> },
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
