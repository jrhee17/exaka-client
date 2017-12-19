/**
 * Created by john on 15/10/2017.
 */

import {browser, by, element, protractor, ElementFinder} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
import {PostTestingUtils} from "./post.e2e.utils";
/**
 * Created by john on 15/10/2017.
 */


describe('Post -- owner', () => {

  const POST_ID = '59ec38d7dd162c0b9387fb50';
  const OWNER_SUBBLOCK_ID = '59ecac63dd162c159f66421e';

  beforeAll(async(done) => {
    await browser.get(`#/post/${POST_ID}/answers`);
    await browser.wait(testing_utils.matchesPathLoaded(/post\/[\w]+\/answers/), 10000);
    done();
  });

  describe(`mainblock vote`, () => {

    let main_block, upvote_btn, downvote_btn, vote_num, owner_score, auth_score;

    beforeEach( async (done) => {

      main_block = element.all(by.css('.main-block')).first();
      upvote_btn = main_block.all(by.css('.upvote-btn')).first();
      downvote_btn = main_block.all(by.css('.downvote-btn')).first();
      vote_num = main_block.all(by.css('.vote-num')).first();
      owner_score = main_block.all(by.css('.user-score')).first();
      auth_score = element.all(by.css('.auth-score')).first();

      await PostTestingUtils.resetVoteForBlock(main_block);

      done();
    });

    it('initial -> upvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('initial -> downvote', async (done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('upvote -> unupvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('downvote -> undownvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('upvote -> down', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 2);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('downvote -> upvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 2);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });
  });

  describe(`subblock vote`, () => {

    let sub_block, upvote_btn, downvote_btn, vote_num, owner_score, auth_score;

    beforeEach( async (done) => {

      sub_block = element.all(by.id(OWNER_SUBBLOCK_ID)).first();
      upvote_btn = sub_block.all(by.css('.upvote-btn')).first();
      downvote_btn = sub_block.all(by.css('.downvote-btn')).first();
      vote_num = sub_block.all(by.css('.vote-num')).first();
      owner_score = sub_block.all(by.css('.user-score')).first();
      auth_score = element.all(by.css('.auth-score')).first();

      await PostTestingUtils.resetVoteForBlock(sub_block);

      done();
    });

    it('initial -> upvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('initial -> downvote', async (done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('upvote -> unupvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('downvote -> undownvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('upvote -> down', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 2);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });

    it('downvote -> upvote', async(done) => {

      let prev_vote = await vote_num.getText();
      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      let after_vote = await vote_num.getText();
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 2);
      expect(+prev_owner_score).toEqual(+after_owner_score);
      expect(+prev_auth_score).toEqual(+after_auth_score);

      done();
    });
  })

});
