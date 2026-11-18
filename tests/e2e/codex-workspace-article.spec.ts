import { expect, test } from '@playwright/test'

test('Codex Workspace 프로젝트에서 기술 사례를 읽는다', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/#/projects/codex-workspace')
  await page.getByRole('link', { name: 'Skill과 Hook 설계 사례' }).click()
  await expect(page).toHaveURL(/#\/blog\/codex-workspace-engineering$/)
  await expect(
    page.getByRole('heading', { name: 'Codex Workspace는 지침 선택과 커밋 검사를 왜 나눴나' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Codex Workspace', exact: true })).toHaveAttribute(
    'href',
    '#/projects/codex-workspace',
  )

  const diagrams = page.locator('.markdown-body img')
  await expect(diagrams).toHaveCount(2)
  for (const diagram of await diagrams.all()) {
    await expect(diagram).toHaveJSProperty('complete', true)
    expect(
      await diagram.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0)
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
    false,
  )
  expect(errors).toEqual([])

  await page.screenshot({
    path: `screenshots/playwright/${test.info().project.name}-codex-workspace-article.png`,
    fullPage: true,
  })
})
