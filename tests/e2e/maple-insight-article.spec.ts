import { expect, test } from '@playwright/test'

test('프로젝트에서 설계 변화 글을 읽고 PDF를 내려받는다', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/#/projects/maple-insight')
  await page.getByRole('link', { name: '아키텍처 발전 과정' }).click()
  await expect(page).toHaveURL(/#\/blog\/maple-insight-architecture-evolution$/)
  await expect(
    page.getByRole('heading', { name: 'Maple Insight의 공유 패키지는 왜 다시 나뉘었나' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Maple Insight', exact: true })).toHaveAttribute(
    'href',
    '#/projects/maple-insight',
  )

  const diagrams = page.locator('.markdown-body img')
  await expect(diagrams).toHaveCount(2)
  for (const diagram of await diagrams.all()) {
    await expect(diagram).toHaveJSProperty('complete', true)
    expect(
      await diagram.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0)
  }

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'PDF로 읽기' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('maple-insight-architecture-evolution.pdf')
  expect(await download.failure()).toBeNull()

  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
    false,
  )
  expect(errors).toEqual([])

  await page.screenshot({
    path: `screenshots/playwright/${test.info().project.name}-maple-insight-article.png`,
    fullPage: true,
  })
})
