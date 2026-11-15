import { lazy } from 'react'

export const BlogListPage = lazy(() =>
  import('../features/blog/BlogPages').then(({ BlogListPage: Page }) => ({ default: Page })),
)

export const BlogDetailPage = lazy(() =>
  import('../features/blog/BlogPages').then(({ BlogDetailPage: Page }) => ({ default: Page })),
)
