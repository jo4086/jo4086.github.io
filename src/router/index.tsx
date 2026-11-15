import { useRoutes } from 'react-router'

import { routes } from './config'

export function AppRoutes() {
  return useRoutes(routes)
}
