import { Page } from '@playwright/test';

export class BerichtenPage {
  constructor(private page: Page) {
  }

  get frame() {
    return this.page.frameLocator('#guest-app-frame');
  }

  get pageHeader() {
    return this.frame.locator('dna-page-header');
  }

  get detailHeader() {
    return this.frame.locator('.header > h2');
  }

  async enterRecipient(name: string) {
    await this.frame.locator('.dna-tag-list-wrapper > #dna-tag-input-0').fill(name);
    await this.frame.locator('app-people-select-option', { hasText: name }).click();
  }

  async enterOnderwerp(onderwerp: string) {
    await this.frame.locator('input[formcontrolname="onderwerp"]').fill(onderwerp);
  }

  async sendBericht() {
    await this.frame.locator('#verzenden').click();
  }

  async verzendNieuwBericht(name: string, onderwerp: string) {
    await this.frame.locator('#nieuw-bericht').click();
    await this.enterRecipient(name);
    await this.enterOnderwerp(onderwerp); 
    await this.sendBericht();
  }

  async findBericht(folder: string, onderwerp: string) {
    await this.frame.locator('.folderName', { hasText: folder }).click();
    await this.frame.locator('app-bericht-item', { hasText: onderwerp }).click();

  }
}
