import { test, expect } from '@playwright/test';
import { IamPage } from '../page-objects/iam.po';

test('nieuw bericht aanmaken en verwijderen', async ({ page }) => {
    await page.goto('https://main.zentest.nl/');

    const iamPage = new IamPage(page);
    const vandaagPage = await iamPage.login('am');

    await expect(page).toHaveTitle(/Magister voor onderwijzend personeel/);
    await expect(vandaagPage.title).toContainText(/Maandag 5 augustus 2024/);

    const berichtenPage = await vandaagPage.goToBerichten();
    await expect(berichtenPage.pageHeader).toContainText(/Berichten/);

    await berichtenPage.verzendNieuwBericht('A. Miedema', 'Playwright test message');

    await berichtenPage.findBericht('Postvak IN', 'Playwright test message');

    await expect(berichtenPage.detailHeader).toContainText(/Playwright test message/);
});