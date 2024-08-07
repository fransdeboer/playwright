import { Page } from '@playwright/test';
import { VandaagPage } from './vandaag.po';

export class IamPage {
  constructor(private page: Page) {
  }
  
  get usernameInput() {
    return this.page.locator('#username');
  }

  get usernameSubmit() {
    return this.page.locator('#username_submit');
  }
  
  get passwordInput() {
    return this.page.locator('#password');
  }

  get passwordSubmit() {
    return this.page.locator('#password_submit');
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.usernameSubmit.click();
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.passwordSubmit.click();
  }  

  async login(username: string, password = 'mgstr') {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return new VandaagPage(this.page);  
  }
}