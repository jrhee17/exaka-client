import {browser, element, by} from "protractor";
import {testing_utils} from "../testing/utils/helper.util";
import {TestBed} from "@angular/core/testing";
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
    expect(element.all(by.css('.nav-menu-anchor')).get(3).getText()).toEqual('Login');
    expect(element.all(by.css('.nav-menu-anchor')).get(4).getText()).toEqual('Sign Up');

    element.all(by.css('.nav-menu-anchor')).count().then((cnt) => { expect(cnt).toEqual(5)});

  });

  it(`test navigates to profiles successfully`, async(done) => {
    await element.all(by.css('.nav-menu-anchor')).get(1).click();

    await testing_utils.relPathLoaded('profiles');
    expect(browser.getCurrentUrl()).toMatch(/.*profiles.*/);

    done();
  });

  it(`test navigates to tags successfully`, async(done) => {
    await element.all(by.css('.nav-menu-anchor')).get(2).click();

    await testing_utils.relPathLoaded('tags');
    expect(browser.getCurrentUrl()).toMatch(/.*tags.*/);

    done();
  });

  it(`test navigates to login successfully`, async(done) => {
    await element.all(by.css('.nav-menu-anchor')).get(3).click();

    await testing_utils.relPathLoaded('auth/login');
    expect(browser.getCurrentUrl()).toMatch(/.*auth\/login.*/);

    done();
  });

  it(`test navigates to signup successfully`, async(done) => {
    await element.all(by.css('.nav-menu-anchor')).get(4).click();

    await testing_utils.relPathLoaded('auth/signup');
    expect(browser.getCurrentUrl()).toMatch(/.*auth\/signup.*/);

    done();
  });

  it(`navigates to login page when adding post`, async(done) => {
    await browser.get('/');
    await element.all(by.css('.add-post-btn')).first().click();
    expect(browser.getCurrentUrl()).toMatch(/auth\/login/);
    done();
  });

  it(`Check nav logo is correctly loaded`, async(done) => {
    let footerImg = await element.all(by.css('.footer-img')).first();
    expect(testing_utils.imgLoaded(footerImg)).toBeTruthy();
    done();
  });

});
