import { D3v4GraphPage } from './app.po';

describe('d3v4-graph App', () => {
  let page: D3v4GraphPage;

  beforeEach(() => {
    page = new D3v4GraphPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
