import {ElementFinder, by, browser, protractor, ExpectedConditions} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
/**
 * Created by john on 26/10/2017.
 */

export class PostTestingUtils {

  static async resetVoteForBlock(p_block: ElementFinder) {
    let p_upvote_btn = p_block.all(by.css('.upvote-btn')).first();
    let p_downvote_btn = p_block.all(by.css('.downvote-btn')).first();

    await browser.wait(protractor.ExpectedConditions.and(
      protractor.ExpectedConditions.elementToBeClickable(p_upvote_btn),
      protractor.ExpectedConditions.elementToBeClickable(p_downvote_btn),
      ), 1000
    );

    let [upvote_btn, downvote_btn] = await protractor.promise.all([p_upvote_btn, p_downvote_btn]);

    await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), downvote_btn);

    let [upvote_voted, downvote_voted] = await protractor.promise.all<any>([
      p_upvote_btn.getAttribute('class').then((classes) => /\bvote_arrow\b/.test(classes)),
      p_downvote_btn.getAttribute('class').then((classes) => /\bvote_arrow\b/.test(classes)),
    ]);

    if(upvote_voted) await PostTestingUtils.unvote(upvote_btn);
    if(downvote_voted) await PostTestingUtils.unvote(downvote_btn);
  }

  static async resetFavoriteForBlock(p_block: ElementFinder) {
    let p_favorite_btn: ElementFinder = p_block.all(by.css('.favorite-btn')).first();

    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(p_favorite_btn), 1000);

    await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), p_favorite_btn);

    let favorited = await p_favorite_btn.getAttribute('class').then((classes) => /\bfavorite_star\b/.test(classes));

    if(favorited) await PostTestingUtils.unfavorite(p_favorite_btn);
  }

  static async resetSelectForPost(p_post: ElementFinder) {

    await browser.wait(() => {
      return p_post.all(by.css('.select-btn')).count().then((cnt) => cnt > 0);
    });

    let select_btns = await p_post.all(by.css('.select-btn'));

    for(let select_btn of select_btns) {
      await browser.wait(protractor.ExpectedConditions.elementToBeClickable(select_btn), 1000);

      await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), select_btn);

      let selected = await select_btn.getAttribute('class').then((classes) => /\bselected_check\b/.test(classes));

      if(selected) await PostTestingUtils.unselect(select_btn);
    }
  }

  static async vote(btn: ElementFinder) {
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'vote_arrow'), 10000);
  }

  static async unvote(btn: ElementFinder) {
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'novote_arrow'), 10000);
  }

  static async favorite(btn: ElementFinder) {
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'favorite_star'), 10000);
  }

  static async unfavorite(btn: ElementFinder) {
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'nofavorite_star'), 10000);
  }

  static async select(btn: ElementFinder) {
    await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), btn);
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'selected_check'), 10000);
  }

  static async unselect(btn: ElementFinder) {
    await browser.executeScript((elem) => elem.scrollIntoView({block: 'center', behavior: 'instant'}), btn);
    await btn.click();
    await browser.wait(testing_utils.cssClassLoaded(btn, 'noselected_check'), 10000);
  }
}
