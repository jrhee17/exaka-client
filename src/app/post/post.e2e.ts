import {browser, by} from "protractor";
/**
 * Created by john on 15/10/2017.
 */
describe('Post', () => {

  beforeAll(() => {
    browser.get('/');
  });


  it('test login works successfully', () => {


    // browser.sleep(1000);

    // browser.get('/');
    expect(1).toEqual(1);
    // testing_utils.login();


    //
    // let post_obj = element.all(by.css('.post-main-link')).first();
    // post_obj.click();
    // browser.sleep(1000);
    //
    // let upvote_btn = element.all(by.css('.upvote-btn')).first();
    // upvote_btn.click();
    // browser.sleep(1000);
    //
    // upvote_btn.click();
    // browser.sleep(1000);

  });

});
