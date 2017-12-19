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

  it(`test navigates to profiles successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(1).click();

    testing_utils.relPathLoaded('profiles');
    expect(browser.getCurrentUrl()).toMatch(/.*profiles.*/);
  });

  it(`test navigates to tags successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(2).click();

    testing_utils.relPathLoaded('tags');
    expect(browser.getCurrentUrl()).toMatch(/.*tags.*/);
  });

  it(`test navigates to login successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(3).click();

    testing_utils.relPathLoaded('auth/login');
    expect(browser.getCurrentUrl()).toMatch(/.*auth\/login.*/);
  });

  it(`test navigates to signup successfully`, () => {
    element.all(by.css('.nav-menu-anchor')).get(4).click();

    testing_utils.relPathLoaded('auth/signup');
    expect(browser.getCurrentUrl()).toMatch(/.*auth\/signup.*/);
  });

  it(`navigates to login page when adding post`, () => {
    browser.get('/');
    element.all(by.css('.add-post-btn')).first().click();
    expect(browser.getCurrentUrl()).toMatch(/auth\/login/);
  });

  it(`Check nav logo is correctly loaded`, () => {
    let footerImg = element.all(by.css('.footer-img')).first();
    expect(testing_utils.imgLoaded(footerImg)).toBeTruthy();
  });

});
