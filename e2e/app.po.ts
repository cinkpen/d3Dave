import { browser, by, element } from 'protractor';

export class D3v4GraphPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
