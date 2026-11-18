import { expect, test } from '@playwright/test'

test('Toolbar는 서로 다른 배율 동작 다섯 개만 제공한다', async ({ page }) => {
  await page.goto('/#/blog/maple-insight-electron-data-studio')
  await page.locator('.post-image-button').first().click()
  const dialog = page.getByRole('dialog', { name: '이미지 갤러리' })
  const toolbar = dialog.locator('.image-lightbox-toolbar')
  await expect(toolbar.locator('button')).toHaveCount(5)
  expect(
    await toolbar
      .locator('button')
      .evaluateAll((buttons) => buttons.map((button) => button.getAttribute('aria-label'))),
  ).toEqual(['축소', '확대', '화면 맞춤', '원본 크기 (100%)', '닫기'])
  await expect(dialog.getByRole('button', { name: /다운로드/ })).toHaveCount(0)
  const image = dialog.locator('.image-lightbox-stage img')

  await toolbar.getByRole('button', { name: '축소' }).click()
  await expect(image).toHaveAttribute('style', /scale\(0\.8\)/)
  await toolbar.getByRole('button', { name: '확대', exact: true }).click()
  await expect(image).toHaveAttribute('style', /scale\(1\)/)
  await toolbar.getByRole('button', { name: '화면 맞춤' }).click()
  await expect(image).toHaveAttribute('style', /scale\(1\)/)
  await toolbar.getByRole('button', { name: '원본 크기 (100%)' }).click()
  const actualWidth = await image.evaluate(
    (node) => (node as HTMLImageElement).getBoundingClientRect().width,
  )
  const naturalWidth = await image.evaluate((node) => (node as HTMLImageElement).naturalWidth)
  expect(actualWidth).toBeCloseTo(naturalWidth, 0)
})

test('세 이미지 게시글에서 이동, 확대, 드래그, 닫기와 스크롤 복원을 지원한다', async ({ page }) => {
  await page.goto('/#/blog/maple-insight-electron-data-studio')
  const images = page.locator('.post-image-button')
  await expect(images).toHaveCount(3)
  await images.nth(1).scrollIntoViewIfNeeded()
  const scrollBefore = await page.evaluate(() => window.scrollY)
  await images.nth(1).click()

  const dialog = page.getByRole('dialog', { name: '이미지 갤러리' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText('2 / 3')).toBeVisible()
  await expect(dialog.locator('.image-lightbox-thumb.is-active')).toHaveCount(1)
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByText('3 / 3')).toBeVisible()
  await dialog.getByRole('button', { name: '확대', exact: true }).click()
  const enlarged = dialog.locator('.image-lightbox-stage img')
  await expect(enlarged).toHaveCSS('cursor', 'grab')
  await dialog.getByRole('button', { name: '원본 크기' }).click()
  const originalTransform = await enlarged.evaluate((node) => (node as HTMLElement).style.transform)
  expect(originalTransform).not.toContain('scale(1)')
  const bounds = await enlarged.boundingBox()
  if (!bounds) throw new Error('확대 이미지가 보이지 않습니다')
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  await page.mouse.down()
  await page.mouse.move(bounds.x + bounds.width / 2 + 80, bounds.y + bounds.height / 2 + 40)
  await page.mouse.up()
  const draggedTransform = await enlarged.evaluate((node) => (node as HTMLElement).style.transform)
  expect(draggedTransform).not.toBe(originalTransform)
  await dialog.getByRole('button', { name: '화면 맞춤' }).click()
  await expect(enlarged).toHaveCSS('cursor', 'default')
  await enlarged.hover()
  await page.mouse.wheel(0, -200)
  await expect(enlarged).toHaveCSS('cursor', 'grab')
  await dialog.getByRole('button', { name: '이전 이미지' }).click()
  await expect(dialog.getByText('2 / 3')).toBeVisible()
  await expect(dialog.locator('.image-lightbox-stage img')).toHaveCSS('cursor', 'default')
  await dialog.getByRole('button', { name: '1번째 이미지 보기' }).click()
  await expect(dialog.getByText('1 / 3')).toBeVisible()
  await dialog.locator('.image-lightbox-stage img').click()
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore)
})

test('한 이미지 게시글은 해당 이미지만 표시하고 배경 클릭으로 닫는다', async ({ page }) => {
  await page.goto('/#/blog/maple-insight-database')
  await page.locator('.post-image-button').click()
  const dialog = page.getByRole('dialog', { name: '이미지 갤러리' })
  await expect(dialog.getByText('1 / 1')).toBeVisible()
  await expect(dialog.locator('.image-lightbox-thumb')).toHaveCount(1)
  await expect(dialog.getByRole('button', { name: '다음 이미지' })).toHaveCount(0)
  await dialog.locator('.image-lightbox-main').click({ position: { x: 4, y: 4 } })
  await expect(dialog).toBeHidden()
})

test('세로로 긴 이미지는 본문과 갤러리에서 비율을 유지하며 화면에 맞춘다', async ({ page }) => {
  await page.goto('/#/blog/maple-insight-database')
  const bodyImage = page.locator('.post-image-button img')
  await expect(bodyImage).toBeVisible()
  const bodySize = await bodyImage.evaluate((image) => {
    const node = image as HTMLImageElement
    return {
      width: node.clientWidth,
      height: node.clientHeight,
      naturalWidth: node.naturalWidth,
      naturalHeight: node.naturalHeight,
    }
  })
  expect(bodySize.height / bodySize.width).toBeCloseTo(
    bodySize.naturalHeight / bodySize.naturalWidth,
    1,
  )
  expect(bodySize.width).toBeLessThanOrEqual(bodySize.naturalWidth)
  await bodyImage.click()
  const dialog = page.getByRole('dialog', { name: '이미지 갤러리' })
  const stage = dialog.locator('.image-lightbox-stage')
  const largeImage = stage.locator('img')
  const imageBounds = await largeImage.boundingBox()
  const stageBounds = await stage.boundingBox()
  if (!imageBounds || !stageBounds) throw new Error('이미지 영역이 보이지 않습니다')
  expect(imageBounds.height).toBeLessThanOrEqual(stageBounds.height + 1)
  expect(imageBounds.width).toBeLessThanOrEqual(stageBounds.width + 1)
  await dialog.getByRole('button', { name: '닫기' }).click()
  await expect(dialog).toBeHidden()
})
