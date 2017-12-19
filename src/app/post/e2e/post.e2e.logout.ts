import {testing_utils} from "../../../testing/utils/helper.util";
import {browser, protractor, by, element} from "protractor";
import {PostTestingUtils} from "./post.e2e.utils";
/**
 * Created by john on 15/10/2017.
 */
describe('Post', () => {

  const POST_ID = '59ec38d7dd162c0b9387fb50';

  beforeAll(async(done) => {
    await browser.get(`#/post/${POST_ID}/answers`);
    await browser.wait(testing_utils.matchesPathLoaded(/post\/[\w]+\/answers/), 10000);
    done();
  });

  describe(`Main block upvote`, () => {

    let main_block, upvote_btn, downvote_btn, vote_num, owner_score, auth_score, auth_modal, post_title;

    beforeEach( async (done) => {

      main_block = element.all(by.css('.main-block')).first();
      auth_modal = main_block.all(by.css('.auth-modal')).first();
      post_title = element.all(by.css('.post-title')).first();
      upvote_btn = main_block.all(by.css('.upvote-btn')).first();
      downvote_btn = main_block.all(by.css('.downvote-btn')).first();

      await browser.wait(protractor.ExpectedConditions.and(
        protractor.ExpectedConditions.elementToBeClickable(upvote_btn),
        protractor.ExpectedConditions.elementToBeClickable(downvote_btn),
        protractor.ExpectedConditions.elementToBeClickable(post_title),
        ), 1000
      );

      await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), post_title);

      await post_title.click();
      await browser.wait(protractor.ExpectedConditions.invisibilityOf(auth_modal), 1000);

      done();
    });

    it('initial -> upvote', async(done) => {

      await upvote_btn.click();
      await auth_modal.isDisplayed();

      expect(auth_modal.isDisplayed()).toBeTruthy();

      done();
    });

    it('initial -> downvote', async (done) => {

      await downvote_btn.click();
      await auth_modal.isDisplayed();

      expect(auth_modal.isDisplayed()).toBeTruthy();

      done();
    });

  });

  describe(`Sub block upvote`, () => {

    let sub_block, upvote_btn, downvote_btn, vote_num, owner_score, auth_score, auth_modal, post_title;

    beforeEach( async (done) => {

      sub_block = element.all(by.css('.sub-block')).first();
      auth_modal = sub_block.all(by.css('.auth-modal')).first();
      post_title = element.all(by.css('.post-title')).first();
      upvote_btn = sub_block.all(by.css('.upvote-btn')).first();
      downvote_btn = sub_block.all(by.css('.downvote-btn')).first();

      await browser.wait(protractor.ExpectedConditions.and(
        protractor.ExpectedConditions.elementToBeClickable(upvote_btn),
        protractor.ExpectedConditions.elementToBeClickable(downvote_btn),
        protractor.ExpectedConditions.elementToBeClickable(post_title),
        ), 1000
      );

      await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), post_title);

      await post_title.click();
      await browser.wait(protractor.ExpectedConditions.invisibilityOf(auth_modal), 1000);

      done();
    });

    it('initial -> upvote', async(done) => {

      await upvote_btn.click();
      await auth_modal.isDisplayed();

      expect(auth_modal.isDisplayed()).toBeTruthy();

      done();
    });

    it('initial -> downvote', async (done) => {

      await downvote_btn.click();
      await auth_modal.isDisplayed();

      expect(auth_modal.isDisplayed()).toBeTruthy();

      done();
    });

  });

});
