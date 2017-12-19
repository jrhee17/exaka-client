import {browser, ExpectedConditions, by, element, protractor} from "protractor";
import {testing_utils} from "../../testing/utils/helper.util";
/**
 * Created by john on 06/11/2017.
 */

// var faker = require('faker');
import * as faker from 'faker';
import {getEmail, cleanInbox} from "../../testing/mailtrap";

var request = require('request');

function deleteRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, {method: 'DELETE'},(error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

describe(`Sign up and delete account test`, () => {

  beforeEach(async(done) => {
    await browser.get(`#`);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    // Check if logged in, logout if true
    let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
    if(signedIn) {
      let signOutBtn = await element.all(by.css('.sign-out-btn')).first().click();
      await element.all(by.css('.login-btn')).first().isPresent();
    }

    await browser.get(`#/auth/signup`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

    done();
  });

  afterEach(async(done) => {

    // Remove all instances of email
    await browser.get(`exakadev.com:4000/users/sign_out`);

    done();
  });

  it(`signup by email`, async(done) => {

    await cleanInbox;

    let email = faker.internet.email();

    await element(by.id('email')).sendKeys(email);
    await element(by.id('password')).sendKeys('asdfASDF123');
    await element(by.id('passwordConfirmation')).sendKeys('asdfASDF123');
    await element(by.id('signup-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/\#\/auth\/emailConfirm/), 20 * 1000);

    await element(by.css('.nav-home-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/\#\/$/))

    let dom = await getEmail(email);

    let redirect_link = dom.window.document.querySelector(".confirm-link").href;

    await browser.get(redirect_link);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    await browser.get(`#/auth/login`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/login/));

    await element(by.id('inputEmail')).sendKeys(email);
    await element(by.id('inputPassword')).sendKeys('asdfASDF123');
    await element(by.id('login-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();

    // Click on profile
    await element.all(by.css('.nav-menu-anchor')).get(3).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/main/));

    // Click on edit
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/edit/));

    // Click on delete
    await element.all(by.css('.profile-edit-delete-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/delete/));

    await element.all(by.css('.profile-delete-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    done();
  });

  it(`signup by oauth test`, async(done) => {

    let email = 'user@example.com';
    let password = 'doorkeeper';

    await element(by.css('.exaka-oauth-btn')).click();

    let window_handle_1, window_handle_2;
    await browser.driver.getAllWindowHandles().then((vals) => {
      window_handle_1 = vals[0];
      window_handle_2 = vals[1];
    });

    await browser.switchTo().window(window_handle_2);
    await testing_utils.matchesPathLoaded(/users\/sign_in/);

    await browser.driver.findElement(by.id('user_email')).sendKeys(email);
    await browser.driver.findElement(by.id('user_password')).sendKeys(password);

    await browser.driver.findElement(by.css('.actions .btn')).click();

    await browser.switchTo().window(window_handle_1);

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();

    await element.all(by.css('.nav-menu-anchor')).get(3).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/main/));

    // Click on edit
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/edit/));

    // Click on delete
    await element.all(by.css('.profile-edit-delete-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/\w+\/delete/));

    await element.all(by.css('.profile-delete-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    done();
  });

});

describe(`Error handling`, () => {

  describe(`Signup`, () => {

    beforeEach(async(done) => {
      await browser.get(`#`);
      await browser.wait(testing_utils.matchesPathLoaded(/#/));

      // Check if logged in, logout if true
      let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
      if(signedIn) {
        let signOutBtn = await element.all(by.css('.sign-out-btn')).first().click();
        await element.all(by.css('.login-btn')).first().isPresent();
      }

      await browser.get(`#/auth/signup`);
      await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

      done();
    });

    it(`Signup error message visible`, async(done) => {

      await element(by.id('email')).sendKeys('a@b');
      await element(by.id('password')).sendKeys('asdfASDF123');
      await element(by.id('passwordConfirmation')).sendKeys('asdfASDF123');
      await element(by.id('signup-btn')).click();

      await browser.wait(() => element.all(by.css('.error-message')).isPresent());

      expect(element.all(by.css('.error-message')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.password-form .text-info')).count()).toBe(0);
      expect(element.all(by.css('.confirm-form .text-info')).count()).toBe(0);

      expect(element(by.id('email')).getAttribute('value')).toBeTruthy();
      expect(element(by.id('password')).getAttribute('value')).toBeFalsy();
      expect(element(by.id('passwordConfirmation')).getAttribute('value')).toBeFalsy();

      done();
    })

  });

  describe(`Login`, () => {

    beforeEach(async(done) => {
      await browser.get(`#`);
      await browser.wait(testing_utils.matchesPathLoaded(/#/));

      // Check if logged in, logout if true
      let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
      if(signedIn) {
        let signOutBtn = await element.all(by.css('.sign-out-btn')).first().click();
        await element.all(by.css('.login-btn')).first().isPresent();
      }

      await browser.get(`#/auth/login`);
      await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/login/));

      done();
    });

    it(`error message visible`, async(done) => {

      await element(by.id('inputEmail')).sendKeys('a@b');
      await element(by.id('inputPassword')).sendKeys('asdfASDF123');
      await element(by.id('login-btn')).click();

      await browser.wait(() => element.all(by.css('.error-message')).isPresent());

      expect(element.all(by.css('.error-message')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.password-form .text-info')).count()).toBeFalsy()

      expect(element(by.id('inputEmail')).getAttribute('value')).toBeTruthy();
      expect(element(by.id('inputPassword')).getAttribute('value')).toBeFalsy();

      done();
    })
  });

});


describe(`Multi signup test`, () => {

  let email = 'user@example.com';
  let oauth_password = 'doorkeeper';
  let email_password = 'asdfASDF123';

  beforeEach(async(done) => {
    await browser.get(`#`);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    // Check if logged in, logout if true
    let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
    if(signedIn) {
      let signOutBtn = await element.all(by.css('.sign-out-btn')).first().click();
      await element.all(by.css('.login-btn')).first().isPresent();
    }

    // Remove all instances of email
    await deleteRequest(`http://exakadev.com:3001/api/users?email=${email}`);

    await browser.get(`#/auth/signup`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

    done();
  });

  afterEach(async(done) => {

    let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
    if(signedIn) {
      let signOutBtn = await element.all(by.css('.sign-out-btn')).first().click();
      await element.all(by.css('.login-btn')).first().isPresent();
    }

    // Remove all instances of email
    await deleteRequest(`http://exakadev.com:3001/api/users?email=${email}`);
    await browser.get(`exakadev.com:4000/users/sign_out`);

    done();
  });

  it(`email -> oauth`, async(done) => {

    await cleanInbox();

    await element(by.id('email')).sendKeys(email);
    await element(by.id('password')).sendKeys(email_password);
    await element(by.id('passwordConfirmation')).sendKeys(email_password);
    await element(by.id('signup-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/\#\/auth\/emailConfirm/), 20 * 1000);

    await element(by.css('.nav-home-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/\#\/$/))

    const dom = await getEmail(email);

    let redirect_link = dom.window.document.querySelector(".confirm-link").href;

    await browser.get(redirect_link);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    await browser.get(`#/auth/login`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/login/));

    await element(by.id('inputEmail')).sendKeys(email);
    await element(by.id('inputPassword')).sendKeys(email_password);
    await element(by.id('login-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();
    let email_username = await element.all(by.css('.auth-name')).getText();

    // Sign out
    await element.all(by.css('.sign-out-btn')).click();

    // Navigate to sign up page
    await browser.get(`#/auth/signup`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

    await element(by.css('.exaka-oauth-btn')).click();

    let window_handle_1, window_handle_2;
    await browser.driver.getAllWindowHandles().then((vals) => {
      window_handle_1 = vals[0];
      window_handle_2 = vals[1];
    });

    await browser.switchTo().window(window_handle_2);
    await testing_utils.matchesPathLoaded(/users\/sign_in/);

    await browser.driver.findElement(by.id('user_email')).sendKeys(email);
    await browser.driver.findElement(by.id('user_password')).sendKeys(oauth_password);

    await browser.driver.findElement(by.css('.actions .btn')).click();

    await browser.switchTo().window(window_handle_1);

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();
    let oauth_username = await element.all(by.css('.auth-name')).getText();

    expect(email_username != oauth_username);

    done();
  });

  it(`oauth -> email`, async(done) => {

    // Sign up via oauth
    await element(by.css('.exaka-oauth-btn')).click();

    let window_handle_1, window_handle_2;
    await browser.driver.getAllWindowHandles().then((vals) => {
      window_handle_1 = vals[0];
      window_handle_2 = vals[1];
    });

    await browser.switchTo().window(window_handle_2);
    await testing_utils.matchesPathLoaded(/users\/sign_in/);

    await browser.driver.findElement(by.id('user_email')).sendKeys(email);
    await browser.driver.findElement(by.id('user_password')).sendKeys(oauth_password);

    await browser.driver.findElement(by.css('.actions .btn')).click();

    await browser.switchTo().window(window_handle_1);

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();
    let oauth_username = await element.all(by.css('.auth-name')).getText();

    // Sign out
    await element.all(by.css('.sign-out-btn')).click();

    // Navigate to sign up page
    await browser.get(`#/auth/signup`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

    await cleanInbox();

    // Sign up via email
    await element(by.id('email')).sendKeys(email);
    await element(by.id('password')).sendKeys(email_password);
    await element(by.id('passwordConfirmation')).sendKeys(email_password);
    await element(by.id('signup-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/\#\/auth\/emailConfirm/), 20 * 1000);

    await element(by.css('.nav-home-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/\#\/$/))

    const dom = await getEmail(email);

    let redirect_link = dom.window.document.querySelector(".confirm-link").href;

    await browser.get(redirect_link);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    await browser.get(`#/auth/login`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/login/));

    await element(by.id('inputEmail')).sendKeys(email);
    await element(by.id('inputPassword')).sendKeys(email_password);
    await element(by.id('login-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));

    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();
    let email_username = await element.all(by.css('.auth-name')).getText();

    expect(email_username != oauth_username);

    done();
  });

});
