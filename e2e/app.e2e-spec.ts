import { VideoManagerFEPage } from './app.po';

describe('video-manager-fe App', () => {
  let page: VideoManagerFEPage;

  beforeEach(() => {
    page = new VideoManagerFEPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
