import { useLayoutEffect } from 'react'
import { useLocation, useRoutes } from 'react-router'

import { routes } from './config'

export function AppRoutes() {
  const { pathname, search } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return useRoutes(routes)
}
