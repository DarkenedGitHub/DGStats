import { DGStatsPage } from './app.po';

describe('dgstats App', () => {
  let page: DGStatsPage;

  beforeEach(() => {
    page = new DGStatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
