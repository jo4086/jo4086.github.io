import { expect, test } from '@playwright/test'

test('블로그 목록에서 다른 글로 이동하면 맨 위에서 시작한다', async ({ page }) => {
  await page.goto('/#/blog')
  await expect(page.locator('main article h2 a').first()).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

  await page.locator('main article h2 a').last().click()

  await expect(page).toHaveURL(/#\/blog\/[^/]+$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('블로그 글에서 프로젝트로 이동하면 맨 위에서 시작한다', async ({ page }) => {
  await page.goto('/#/blog/maple-insight-architecture-evolution')
  await page.getByRole('link', { name: 'Maple Insight', exact: true }).click()

  await expect(page).toHaveURL(/#\/projects\/maple-insight$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('블로그 인덱스의 필터를 바꾸면 맨 위에서 시작한다', async ({ page }) => {
  test.skip(
    test.info().project.name === 'mobile-chromium',
    '모바일 인덱스는 상단 메뉴를 연 뒤 이동한다',
  )

  await page.goto('/#/blog')
  await expect(page.locator('main article h2 a').first()).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

  await page
    .getByRole('navigation', { name: '블로그 탐색' })
    .getByRole('link', { name: '최근 글' })
    .click()

  await expect(page).toHaveURL(/#\/blog\?view=recent$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('글 안의 목차 이동은 해당 절로 스크롤한다', async ({ page }) => {
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
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
})
