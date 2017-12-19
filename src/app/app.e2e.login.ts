import {browser, element, by} from "protractor";
import {testing_utils} from "../testing/utils/helper.util";
/**
 * Created by john on 15/10/2017.
 */
describe('App', () => {

  beforeAll(() => {
    browser.get('/');
  });

  it('test navigation elements loaded correctly', () => {

    expect(element.all(by.css('.nav-menu-anchor')).get(0).getText()).toEqual('Home');
    expect(element.all(by.css('.nav-menu-anchor')).get(1).getText()).toEqual('Users');
    expect(element.all(by.css('.nav-menu-anchor')).get(2).getText()).toEqual('Tags');
    expect(element.all(by.css('.nav-menu-anchor')).get(3).getText()).toEqual('Profile');
    expect(element.all(by.css('.nav-menu-anchor')).get(4).getText()).toEqual('Sign Out');

    element.all(by.css('.nav-menu-anchor')).count().then((cnt) => { expect(cnt).toEqual(5)});

  });

  it(`test navigates to profiles successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(1).click();

    browser.wait(testing_utils.relPathLoaded('profiles'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.*profiles.*/);
  });

  it(`test navigates to tags successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(2).click();

    browser.wait(testing_utils.relPathLoaded('tags'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.*tags.*/);
  });

  it(`test navigates to user profile successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(3).click();

    browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);
    expect(browser.getCurrentUrl()).toMatch(/profiles\/[\w]+\/main/);
  });

  it(`test logs out successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(4).click();
    browser.get('/');
    browser.wait(testing_utils.relPathLoaded(''));

    expect(element.all(by.css('.nav-menu-anchor')).get(4).getText()).toEqual('Sign Up');

    // clean up by logging in
    testing_utils.login();
  });

  it(`navigates to add post page successfully`, () => {
    browser.get('/');
    browser.wait(testing_utils.relPathLoaded(''), 10000);
    element.all(by.css('.add-post-btn')).first().click();
    expect(browser.getCurrentUrl()).toMatch(/question\/ask/);
  });

  it(`Check nav logo is correctly loaded`, () => {
    let footerImg = element.all(by.css('.footer-img')).first();
    expect(testing_utils.imgLoaded(footerImg)).toBeTruthy();
  });

});
