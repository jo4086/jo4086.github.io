import { expect, test } from '@playwright/test'

for (const project of [
  { slug: 'maple-insight', title: 'Maple Insight' },
  { slug: 'codex-workspace', title: 'Codex Workspace' },
]) {
  test(`${project.title} 상세 페이지에서 흐름과 목차를 읽는다`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto(`/#/projects/${project.slug}`)
    await expect(page.getByRole('heading', { name: project.title, exact: true })).toBeVisible()
    await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: '어떻게 만들었나요?' })).toBeVisible()
    await expect(page.getByRole('heading', { name: '지금 어디까지 왔나요?' })).toBeVisible()
    await expect(page.getByRole('link', { name: '프로젝트 분석 문서' })).toHaveAttribute(
      'href',
      `https://github.com/jo4086/${project.slug === 'maple-insight' ? 'maple-insight' : 'codex-workspace'}/blob/main/docs/portfolio/README.md`,
    )

    if (test.info().project.name === 'mobile-chromium') {
      await page.locator('summary').filter({ hasText: '이 페이지의 목차' }).click()
    }
    await page
      .getByRole('navigation', { name: '프로젝트 목차' })
      .getByRole('button', { name: '구조 이해하기' })
      .click()
    await expect(page.locator('#architecture')).toBeFocused()

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)
    expect(errors).toEqual([])

    await page.screenshot({
      path: `screenshots/playwright/${test.info().project.name}-${project.slug}.png`,
      fullPage: true,
    })
  })
}

test('홈에서 포트폴리오 PDF를 내려받을 수 있다', async ({ page }) => {
  await page.goto('/#/')
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: '포트폴리오 PDF' }).click()
  const file = await download
  expect(file.suggestedFilename()).toBe('portfolio.pdf')
  expect(await file.failure()).toBeNull()
})
