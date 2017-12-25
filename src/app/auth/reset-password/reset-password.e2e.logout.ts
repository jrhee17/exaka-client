import {browser, element, by} from "protractor";
import {testing_utils} from "../../../testing/utils/helper.util";
import {getEmail, cleanInbox} from "../../../testing/mailtrap";
/**
 * Created by john on 12/12/2017.
 */

import * as faker from 'faker';

describe(`reset password`, () => {

  beforeEach(async(done) => {
    await browser.get(`#`);
    await browser.wait(testing_utils.matchesPathLoaded(/#/));

    // Check if logged in, logout if true
    let signedIn = await element.all(by.css('.sign-out-btn')).isPresent();
    if(signedIn) {
      await element.all(by.css('.sign-out-btn')).first().click();
      await element.all(by.css('.login-btn')).first().isPresent();
    }

    await browser.get(`#/auth/signup`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/signup/));

    done();
  });

  fit(`email change password`, async(done) => {

    await cleanInbox;

    let email = faker.internet.email();

    await element(by.id('email')).sendKeys(email);
    await element(by.id('password')).sendKeys('asdfASDF123');
    await element(by.id('passwordConfirmation')).sendKeys('asdfASDF123');
    await element(by.id('signup-btn')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/\#\/auth\/emailConfirm/), 20 * 1000);

    await element(by.css('.nav-home-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/\#\/$/));

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

    // Change password
    await browser.wait(element(by.css('.nav-profile')).isPresent());
    await element(by.css('.nav-profile')).click();

    await browser.wait(testing_utils.matchesPathLoaded(/#\/profiles\/\w+\/main/));
    await browser.wait(element(by.css('.edit-profile-btn')).isPresent());

    await element(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/#\/profiles\/\w+\/edit/));

    await element(by.css('.reset-password-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/#\/profiles\/\w+\/password/));

    await element(by.id('passwordCurrent')).sendKeys('asdfASDF123');
    await element(by.id('password')).sendKeys('fdsaFDSA321');
    await element(by.id('passwordConfirmation')).sendKeys('fdsaFDSA321');

    await element(by.id('profilePasswordBtn')).click();

    await browser.get(`#`);
    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/), 10000);

    // Logout
    await element.all(by.css('.sign-out-btn')).click();

    // Login using new credentials
    await browser.get(`#/auth/login`);
    await browser.wait(testing_utils.matchesPathLoaded(/\/#\/auth\/login/));

    await element(by.id('inputEmail')).sendKeys(email);
    await element(by.id('inputPassword')).sendKeys('fdsaFDSA321');
    await element(by.id('login-btn')).click();

    // Check login successful
    await browser.wait(testing_utils.matchesPathLoaded(/#\/$/));
    expect(element.all(by.css('.sign-out-btn')).isPresent()).toBeTruthy();

    // Delete user
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
