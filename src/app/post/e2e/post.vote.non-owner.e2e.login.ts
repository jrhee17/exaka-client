/**
 * Created by john on 15/10/2017.
 */

import {browser, by, element, protractor, ElementFinder, ElementArrayFinder} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
import {async} from "@angular/core/testing";
import {PostTestingUtils} from "./post.e2e.utils";
/**
 * Created by john on 15/10/2017.
 */

describe('Post -- owner', () => {

  const POST_ID = '59ef6521dd162c0e9bfeb292';

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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+after_owner_score).toEqual(+prev_owner_score - 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+after_owner_score).toEqual(+prev_owner_score + 2);
      expect(+after_auth_score).toEqual(+prev_auth_score + 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 2);
      expect(+after_owner_score).toEqual(+prev_owner_score - 12);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 2);
      expect(+after_owner_score).toEqual(+prev_owner_score + 12);
      expect(+after_auth_score).toEqual(+prev_auth_score + 1);

      done();
    });
  });

  describe(`subblock vote`, () => {

    let sub_block, upvote_btn, downvote_btn, vote_num, owner_score, auth_score;

    beforeEach( async (done) => {

      sub_block = element.all(by.css('.sub-block')).first();
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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 1);
      expect(+after_owner_score).toEqual(+prev_owner_score - 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.unvote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 1);
      expect(+after_owner_score).toEqual(+prev_owner_score + 2);
      expect(+after_auth_score).toEqual(+prev_auth_score + 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score + 10);
      expect(+after_auth_score).toEqual(+prev_auth_score);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(downvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote - 2);
      expect(+after_owner_score).toEqual(+prev_owner_score - 12);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

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
      expect(+after_owner_score).toEqual(+prev_owner_score - 2);
      expect(+after_auth_score).toEqual(+prev_auth_score - 1);

      prev_vote = await vote_num.getText();
      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      await PostTestingUtils.vote(upvote_btn);
      after_vote = await vote_num.getText();
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();

      expect(+after_vote).toEqual(+prev_vote + 2);
      expect(+after_owner_score).toEqual(+prev_owner_score + 12);
      expect(+after_auth_score).toEqual(+prev_auth_score + 1);

      done();
    });
  })

});
