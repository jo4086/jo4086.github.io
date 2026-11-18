import { expect, test } from '@playwright/test'

const cases = [
  {
    slug: 'maple-insight-api-types',
    title: '외부 API가 늘어날 때 타입은 어떻게 추가할까',
    images: 1,
  },
  { slug: 'maple-insight-database', title: '데이터 관리 명령과 저장 책임을 나눈 이유', images: 1 },
  {
    slug: 'maple-insight-electron-data-studio',
    title: 'Electron Data Studio에서 DB와 로컬 파일을 잇는 방법',
    images: 3,
  },
]

test('프로젝트 소개에서 세 기술 사례로 이동하고 자료를 읽는다', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/#/projects/maple-insight')
  const links = page.getByRole('link', { name: '사례 자세히 읽기' })
  await expect(links).toHaveCount(3)

  for (const [index, item] of cases.entries()) {
    await links.nth(index).click()
    await expect(page).toHaveURL(new RegExp(`#\\/blog\\/${item.slug}$`))
    await expect(page.getByRole('heading', { name: item.title })).toBeVisible()
    const images = page.locator('.technical-capture .post-image-button img')
    await expect(images).toHaveCount(item.images)
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      expect(
        await image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0)
    }
    const capture = page.locator('.technical-capture').first()
    expect(await capture.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(false)
    if (test.info().project.name === 'mobile-chromium') {
      await page
        .locator('.technical-capture')
        .first()
        .screenshot({
          path: `screenshots/playwright/mobile-${item.slug}-capture.png`,
        })
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    ).toBe(false)
    await expect(page.getByRole('link', { name: '프로젝트 소개' })).toHaveAttribute(
      'href',
      '/#/projects/maple-insight',
    )
    await page.goto('/#/projects/maple-insight')
  }

  expect(errors).toEqual([])
})
