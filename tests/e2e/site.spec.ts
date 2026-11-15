import { expect, test } from '@playwright/test'

test('공통 탐색과 프로젝트 상세가 동작한다', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/#/')
  await expect(page.getByRole('heading', { name: /만들고, 탐구하고/ })).toBeVisible()
  await page.screenshot({
    path: `screenshots/playwright/${test.info().project.name}-home.png`,
    fullPage: true,
  })

  await page
    .getByRole('navigation', { name: '주요 메뉴' })
    .getByRole('link', { name: 'Projects' })
    .click()
  await expect(page).toHaveURL(/#\/projects$/)
  await page.getByRole('button', { name: 'TypeScript' }).click()
  await expect(page.getByRole('heading', { name: 'Portfolio & Blog' })).toBeVisible()
  await page.screenshot({
    path: `screenshots/playwright/${test.info().project.name}-projects.png`,
    fullPage: true,
  })

  await page.getByRole('link', { name: 'Portfolio & Blog', exact: true }).click()
  await expect(page).toHaveURL(/#\/projects\/portfolio-blog$/)
  await expect(page.getByRole('heading', { name: '문제 해결 과정' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '화면 살펴보기' })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Home 화면' })).toBeVisible()
  await page
    .getByRole('navigation', { name: '주요 메뉴' })
    .getByRole('link', { name: 'About' })
    .click()
  await expect(page.getByRole('heading', { name: '안녕하세요.' })).toBeVisible()
  await page.goto('/#/missing-page')
  await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다.' })).toBeVisible()
  expect(errors).toEqual([])
})

test('게시글 검색, 상세 목차, 관련 프로젝트를 탐색한다', async ({ page }) => {
  await page.goto('/#/blog')
  await expect(page.getByRole('heading', { name: '전체 글' })).toBeVisible()

  if (test.info().project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: '블로그 탐색' }).click()
  }
  await page.getByRole('searchbox', { name: '게시글 검색' }).fill('Tailwind')
  await page.getByRole('searchbox', { name: '게시글 검색' }).press('Enter')
  await expect(page.getByText('1개의 글')).toBeVisible()

  if (test.info().project.name === 'chromium') {
    await page.setViewportSize({ width: 1600, height: 900 })
  }
  await page.goto('/#/blog/site-architecture')
  await expect(
    page.getByRole('heading', { name: '포트폴리오와 블로그를 함께 설계하기' }),
  ).toBeVisible()
  if (await page.locator('.mobile-toc').isVisible()) {
    await page.locator('.mobile-toc summary').click()
  }
  await page
    .getByRole('navigation', { name: '이 글의 목차' })
    .getByRole('button', { name: '화면의 역할' })
    .click()
  await expect(page.getByRole('heading', { name: '화면의 역할' })).toBeFocused()
  await expect(page.getByRole('link', { name: 'Portfolio & Blog' })).toBeVisible()

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({
    path: `screenshots/playwright/${test.info().project.name}-blog-detail.png`,
    fullPage: true,
  })
})

test('카테고리와 아카이브 탐색이 게시글 데이터와 연결된다', async ({ page }) => {
  await page.goto('/#/blog')
  if (test.info().project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: '블로그 탐색' }).click()
  }

  const category = page
    .locator('.blog-sidebar-content:visible .category-group')
    .filter({ hasText: '개발' })
  await category.locator('summary').click()
  await category.getByRole('link', { name: /아키텍처/ }).click()
  await expect(page.getByRole('heading', { name: '개발/아키텍처' })).toBeVisible()
  await expect(page.getByText('1개의 글')).toBeVisible()

  await page.goto('/#/blog?archive=2026-11')
  await expect(page.getByRole('heading', { name: '2026-11' })).toBeVisible()
  await expect(page.getByText('3개의 글')).toBeVisible()

  if (test.info().project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: '블로그 탐색' }).click()
  }
  await page.getByRole('link', { name: 'React 1' }).click()
  await expect(page.getByRole('heading', { name: 'React' })).toBeVisible()
  await expect(page.getByText('1개의 글')).toBeVisible()
})
