import { test, expect } from '@playwright/test';

test.describe('瞑想時計', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('時計が画面中央に表示される', async ({ page }) => {
    const clock = page.locator('#clock');
    await expect(clock).toBeVisible();

    const text = await clock.textContent();
    expect(text).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('時刻が毎秒更新される', async ({ page }) => {
    const clock = page.locator('#clock');
    const time1 = await clock.textContent();

    await page.waitForTimeout(1100);

    const time2 = await clock.textContent();
    expect(time2).not.toBe(time1);
    expect(time2).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('ダークテーマが適用されている', async ({ page }) => {
    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    expect(bgColor).toBe('rgb(0, 0, 0)');

    const clock = page.locator('#clock');
    const color = await clock.evaluate((el) => {
      return getComputedStyle(el).color;
    });
    // rgba(255, 255, 255, 0.85)
    expect(color).toMatch(/rgba?\(255,\s*255,\s*255/);
  });

  test('時計がビューポート中央に配置されている', async ({ page }) => {
    const clock = page.locator('#clock');
    const box = await clock.boundingBox();
    const viewport = page.viewportSize();

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    expect(centerX).toBeCloseTo(viewport.width / 2, -1);
    expect(centerY).toBeCloseTo(viewport.height / 2, -1);
  });

  test('モバイルビューポートでもレスポンシブに表示される', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const clock = page.locator('#clock');
    await expect(clock).toBeVisible();

    const text = await clock.textContent();
    expect(text).toMatch(/^\d{2}:\d{2}:\d{2}$/);

    const box = await clock.boundingBox();
    expect(box.width).toBeLessThan(375);
  });
});
