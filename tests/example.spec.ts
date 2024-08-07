import { test, expect } from '@playwright/test';
// page.on('request', request => console.log('>>', request.method(), request.url()));
// page.on('response', response => console.log('<<', response.status(), response.url()));


test('nieuw bericht aanmaken en verwijderen', async ({ page }) => {
  await page.goto('https://main.zentest.nl/');

  await expect(page).toHaveTitle(/Aanmelden/);

  await page.locator('#username.dna-input').fill('am');
  await page.locator('#username.dna-input').press('Enter');

  await page.getByPlaceholder('je wachtwoord').fill('mgstr');
  await page.locator('#password_submit').click();

  await expect(page).toHaveTitle(/Magister voor onderwijzend personeel/);

  await expect(page.locator('.title-badges > .title')).toContainText(/Maandag 5 augustus 2024/);

  // go to Berichten
  await page.locator('#menu-berichten-new').click();
  const frame = page.frameLocator('#guest-app-frame');
  await expect(frame.locator('dna-page-header')).toContainText(/Berichten/);

  // create new message
  await frame.locator('#nieuw-bericht').click();
  await frame.locator('.dna-tag-list-wrapper > #dna-tag-input-0').fill('miedema');

  await frame.locator('app-people-select-option', { hasText: 'A. Miedema' }).click();

  await frame.locator('input[formcontrolname="onderwerp"]').fill('Playwright test message');
  await frame.locator('#verzenden').click();

  // check new message in inbox
  await frame.locator('app-bericht-item', { hasText: 'Playwright test message' }).click();
  await expect(frame.locator('.header > h2')).toContainText(/Playwright test message/);

  // remove message from inbox
  await frame.locator('dna-button[title="Verwijderen"]').click();

  // confirm remove, check snackbar
  // await expect(frame.locator('dna-snack-bar-overlay > .wrapper')).toContainText('1 bericht is verplaatst naar \'Verwijderde items\'.');

  // go send items
  await frame.locator('.folderName', { hasText: 'Verzonden items' }).click();
  await frame.locator('app-bericht-item', { hasText: 'Playwright test message' }).click();
  await expect(frame.locator('.header > h2')).toContainText(/Playwright test message/);

  // remove message from send items
  await frame.locator('dna-button[title="Verwijderen"]').click();

  // confirm remove, check snackbar
  // await expect(frame.locator('dna-snack-bar-overlay > .wrapper')).toContainText('1 bericht is verplaatst naar \'Verwijderde items\'.');
});
