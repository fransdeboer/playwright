import { Page } from '@playwright/test';
import { BerichtenPage } from './bericht.po';

export class VandaagPage {
  constructor(private page: Page) {
  }
  
  get berichtMenuItem() {
    return this.page.locator('#menu-berichten-new');
  }

  get title() {
    return this.page.locator('.title-badges > .title');
  }

  async goToBerichten() {
    await this.berichtMenuItem.click();
    return new BerichtenPage(this.page);
  }
}