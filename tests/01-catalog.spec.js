import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Задание 1', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const cards = page.locator('a[href^="/products/"]');
  const appleCard = cards.filter({ has: page.getByRole('heading', { name: 'Apple', exact: true }) });
  const lipstickCard = cards.filter({ has: page.getByRole('heading', { name: 'Red Lipstick', exact: true }) });

  await expect(appleCard).toBeVisible();

  await model.search('Red Lipstick');

  await expect(lipstickCard).toBeVisible();
  await expect(appleCard).toHaveCount(0);
  // END
});

test('Задание 2', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const cards = page.locator('a[href^="/products/"]');
  const appleCard = cards.filter({ has: page.getByRole('heading', { name: 'Apple', exact: true }) });
  const mascaraCard = cards.filter({ has: page.getByRole('heading', { name: 'Essence Mascara Lash Princess', exact: true }) });

  await expect(appleCard).toBeVisible();

  await model.selectBrand('Essence');

  await expect(page.getByRole('checkbox', { name: 'Essence', exact: true })).toBeChecked();
  await expect(mascaraCard).toBeVisible();
  await expect(appleCard).toHaveCount(0);
  // END
});

test('Задание 3', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await model.openProduct('Red Lipstick');

  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(page.getByRole('heading', { name: 'Red Lipstick', exact: true })).toBeVisible();
  // END
});

test('Задание 4', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const cards = page.locator('a[href^="/products/"]');
  const mascaraCard = cards.filter({ has: page.getByRole('heading', { name: 'Essence Mascara Lash Princess', exact: true }) });

  await expect(mascaraCard).toBeVisible();

  await model.nextPage();

  await expect(mascaraCard).toHaveCount(0);
  await expect(cards.first()).toBeVisible();
  // END
});
