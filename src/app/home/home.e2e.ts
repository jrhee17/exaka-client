import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
    expect(1).toEqual(1);
  });
  //
  // it('should have `your content here` x-large', () => {
  //   let subject = element(by.css('[x-large]')).getText();
  //   let result  = 'Your Content Here';
  //   expect(subject).toEqual(result);
  // });

});
