import {browser, element, by} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
import {PostTestingUtils} from "./post.e2e.utils";
/**
 * Created by john on 30/10/2017.
 */
describe('Post -- owner', () => {

  const POST_ID = '59ec38d7dd162c0b9387fb50';
  const OWNER_SUBBLOCK_ID = '59ecac63dd162c159f66421e';
  const NONOWNER_SUBBLOCK_ID = '59f8844bdd162c43571e4b72';
  const NONOWNER2_SUBBLOCK_ID = '59f911b3dd162c84cbee446d';

  beforeAll(async(done) => {
    await browser.get(`#/post/${POST_ID}/answers`);
    await browser.wait(testing_utils.matchesPathLoaded(/post\/[\w]+\/answers/), 10000);
    done();
  });

  describe(`owner subblock vote`, () => {

    let sub_block, owner_score, auth_score, select_btn, post;

    beforeEach(async(done) => {

      sub_block = element.all(by.id(OWNER_SUBBLOCK_ID)).first();
      select_btn = sub_block.all(by.css('.select-btn')).first();
      owner_score = sub_block.all(by.css('.user-score')).first();
      auth_score = element.all(by.css('.auth-score')).first();
      post = element.all(by.css('.post-body')).first();

      await PostTestingUtils.resetSelectForPost(post);

      done();
    });

    it('initial -> select', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(select_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      done();
    });


    it('select -> unselect', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(select_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unselect(select_btn);
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      done();
    });
  });

  describe(`nonowner subblock vote`, () => {

    let sub_block, owner_score, auth_score, select_btn, post;

    beforeEach(async(done) => {

      sub_block = element.all(by.id(NONOWNER_SUBBLOCK_ID)).first();
      select_btn = sub_block.all(by.css('.select-btn')).first();
      owner_score = sub_block.all(by.css('.user-score')).first();
      auth_score = element.all(by.css('.auth-score')).first();
      post = element.all(by.css('.post-body')).first();

      await PostTestingUtils.resetSelectForPost(post);

      done();
    });

    it('initial -> select', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(select_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score + 15);
      expect(+after_auth_score).toEqual(+prev_auth_score + 2);

      done();
    });


    it('select -> unselect', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(select_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score + 15);
      expect(+after_auth_score).toEqual(+prev_auth_score + 2);

      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unselect(select_btn);
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score - 15);
      expect(+after_auth_score).toEqual(+prev_auth_score - 2);

      done();
    });
  });

  describe(`change owner subblock vote`, () => {

    let owner_sub_block, owner_sub_block_user_score, owner_select_btn, auth_score,
      nonowner_select_btn, nonowner_sub_block, nonowner_sub_block_user_score,
      nonowner2_select_btn, nonowner2_sub_block, nonowner2_sub_block_user_score,
      post
      ;

    beforeEach(async(done) => {

      owner_sub_block = element.all(by.id(OWNER_SUBBLOCK_ID)).first();
      owner_select_btn = owner_sub_block.all(by.css('.select-btn')).first();
      owner_sub_block_user_score = owner_sub_block.all(by.css('.user-score')).first();

      nonowner_sub_block = element.all(by.id(NONOWNER_SUBBLOCK_ID)).first();
      nonowner_select_btn = nonowner_sub_block.all(by.css('.select-btn')).first();
      nonowner_sub_block_user_score = nonowner_sub_block.all(by.css('.user-score')).first();

      nonowner2_sub_block = element.all(by.id(NONOWNER2_SUBBLOCK_ID)).first();
      nonowner2_select_btn = nonowner2_sub_block.all(by.css('.select-btn')).first();
      nonowner2_sub_block_user_score = nonowner2_sub_block.all(by.css('.user-score')).first();

      auth_score = element.all(by.css('.auth-score')).first();
      post = element.all(by.css('.post-body')).first();

      await PostTestingUtils.resetSelectForPost(post);

      done();
    });

    it('initial -> owner -> nonowner', async(done) => {

      let prev_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      let prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(owner_select_btn);
      let after_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      let after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_sub_block_user_score).toEqual(+prev_owner_sub_block_user_score);
      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);


      prev_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(nonowner_select_btn);
      after_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_owner_sub_block_user_score).toEqual(+prev_owner_sub_block_user_score + 2);
      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score + 15);
      expect(+after_auth_score).toEqual(+prev_auth_score + 2);

      done();
    });

    it('initial -> nonowner -> owner', async(done) => {

      let prev_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      let prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(nonowner_select_btn);
      let after_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      let after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_owner_sub_block_user_score).toEqual(+prev_owner_sub_block_user_score + 2);
      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score + 15);
      expect(+after_auth_score).toEqual(+prev_auth_score + 2);


      prev_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(owner_select_btn);
      after_owner_sub_block_user_score = await owner_sub_block_user_score.getText();
      after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_owner_sub_block_user_score).toEqual(+prev_owner_sub_block_user_score - 2);
      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score - 15);
      expect(+after_auth_score).toEqual(+prev_auth_score - 2);

      done();
    });

    it('initial -> nonowner -> nonowner', async(done) => {

      let prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let prev_nonowner2_sub_block_user_score = await nonowner2_sub_block_user_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(nonowner_select_btn);
      let after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      let after_nonowner2_sub_block_user_score = await nonowner2_sub_block_user_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score + 15);
      expect(+after_nonowner2_sub_block_user_score).toEqual(+prev_nonowner2_sub_block_user_score);
      expect(+after_auth_score).toEqual(+prev_auth_score + 2);

      prev_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      prev_nonowner2_sub_block_user_score = await nonowner2_sub_block_user_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.select(nonowner2_select_btn);
      after_nonowner_sub_block_user_score = await nonowner_sub_block_user_score.getText();
      after_nonowner2_sub_block_user_score = await nonowner2_sub_block_user_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_nonowner_sub_block_user_score).toEqual(+prev_nonowner_sub_block_user_score - 15);
      expect(+after_nonowner2_sub_block_user_score).toEqual(+prev_nonowner2_sub_block_user_score + 15);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      done();
    });
  });
});
