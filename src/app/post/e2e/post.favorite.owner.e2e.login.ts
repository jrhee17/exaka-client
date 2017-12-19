import {PostTestingUtils} from "./post.e2e.utils";
import {by, element, browser} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
/**
 * Created by john on 30/10/2017.
 */
describe('Post -- owner', () => {

  const POST_ID = '59ec38d7dd162c0b9387fb50';

  beforeAll(async(done) => {
    await browser.get(`#/post/${POST_ID}/answers`);
    await browser.wait(testing_utils.matchesPathLoaded(/post\/[\w]+\/answers/), 10000);
    done();
  });

  describe(`mainblock vote`, () => {

    let main_block, owner_score, auth_score, favorite_btn, favorite_num;

    beforeEach(async(done) => {

      main_block = element.all(by.css('.main-block')).first();
      favorite_btn = main_block.all(by.css('.favorite-btn')).first();
      favorite_num = main_block.all(by.css('.favorite-num')).first();
      owner_score = main_block.all(by.css('.user-score')).first();
      auth_score = element.all(by.css('.auth-score')).first();

      await PostTestingUtils.resetFavoriteForBlock(main_block);

      done();
    });

    it('initial -> favorite', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      let prev_favorite_num = await favorite_num.getText();
      await PostTestingUtils.favorite(favorite_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();
      let after_favorite_num = await favorite_num.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);
      expect(+after_favorite_num).toEqual(+prev_favorite_num + 1);

      done();
    });

    it('favorite -> unfavorite', async(done) => {

      let prev_owner_score = await owner_score.getText();
      let prev_auth_score = await auth_score.getText();
      let prev_favorite_num = await favorite_num.getText();
      await PostTestingUtils.favorite(favorite_btn);
      let after_owner_score = await owner_score.getText();
      let after_auth_score = await auth_score.getText();
      let after_favorite_num = await favorite_num.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);
      expect(+after_favorite_num).toEqual(+prev_favorite_num + 1);

      prev_owner_score = await owner_score.getText();
      prev_auth_score = await auth_score.getText();
      prev_favorite_num = await favorite_num.getText();
      await PostTestingUtils.favorite(favorite_btn);
      after_owner_score = await owner_score.getText();
      after_auth_score = await auth_score.getText();
      after_favorite_num = await favorite_num.getText();

      expect(+after_owner_score).toEqual(+prev_owner_score);
      expect(+after_auth_score).toEqual(+prev_auth_score);
      expect(+after_favorite_num).toEqual(+prev_favorite_num - 1);

      done();
    });
  });
});
