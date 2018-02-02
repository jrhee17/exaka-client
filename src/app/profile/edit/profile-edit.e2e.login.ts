import {testing_utils} from "../../../testing/utils/helper.util";
import {browser, by, element} from "protractor";
import * as faker from 'faker';
/**
 * Created by john on 30/12/2017.
 */


fdescribe(`profile edit`, () => {

  beforeEach(async(done) => {
    let alreadyMatch = await testing_utils.matchesPathLoaded(/\#\/$/);
    if(!alreadyMatch) {
      await browser.get(`#/`);
      await browser.wait(testing_utils.matchesPathLoaded(/\#\/$/), 10000);
    }
    done();
  });

  it(`update userName`, async(done) => {

    let userName = faker.internet.userName();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    await element.all(by.id('newName')).clear();
    await element.all(by.id('newName')).sendKeys(userName);

    await element.all(by.css('.profile-edit-submit-btn')).click();
    await element.all(by.css('.profile-edit-success-message')).isPresent();

    await browser.refresh();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    let newName = await element.all(by.id('newName')).first().getAttribute('value');
    expect(userName).toEqual(newName);

    done();
  });

  it(`update aboutMe`, async(done) => {

    let aboutMe = faker.lorem.sentence();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    await element.all(by.id('aboutMe')).clear();
    await element.all(by.id('aboutMe')).sendKeys(aboutMe);

    await element.all(by.css('.profile-edit-submit-btn')).click();
    await element.all(by.css('.profile-edit-success-message')).isPresent();

    await browser.refresh();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    let newAboutMe = await element.all(by.id('aboutMe')).first().getAttribute('value');
    expect(aboutMe).toEqual(newAboutMe);

    done();
  });

  it(`update website`, async(done) => {

    let website = faker.internet.url();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    await element.all(by.id('newWebsite')).clear();
    await element.all(by.id('newWebsite')).sendKeys(website);

    await element.all(by.css('.profile-edit-submit-btn')).click();
    await element.all(by.css('.profile-edit-success-message')).isPresent();

    await browser.refresh();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    let newWebsite = await element.all(by.id('newWebsite')).first().getAttribute('value');
    expect(website).toEqual(newWebsite);

    done();
  });

  it(`update github`, async(done) => {

    let github = faker.internet.url();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    await element.all(by.id('newGithub')).clear();
    await element.all(by.id('newGithub')).sendKeys(github);

    await element.all(by.css('.profile-edit-submit-btn')).click();
    await element.all(by.css('.profile-edit-success-message')).isPresent();

    await browser.refresh();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    let newGithub = await element.all(by.id('newGithub')).first().getAttribute('value');
    expect(github).toEqual(newGithub);

    done();
  });

  it(`update identicon -> image`, async(done) => {

    let github = faker.internet.url();

    await element.all(by.css('.nav-profile')).isPresent();
    await element.all(by.css('.nav-profile')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);

    await element.all(by.css('.edit-profile-btn')).isPresent();
    await element.all(by.css('.edit-profile-btn')).click();
    await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);

    await element.all(by.css('.change-picture-link')).click();

    // await element.all(by.id('newGithub')).clear();
    // await element.all(by.id('newGithub')).sendKeys(github);
    //
    // await element.all(by.css('.profile-edit-submit-btn')).click();
    // await element.all(by.css('.profile-edit-success-message')).isPresent();
    //
    // await browser.refresh();
    //
    // await element.all(by.css('.nav-profile')).isPresent();
    // await element.all(by.css('.nav-profile')).click();
    // await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/main/), 10000);
    //
    // await element.all(by.css('.edit-profile-btn')).isPresent();
    // await element.all(by.css('.edit-profile-btn')).click();
    // await browser.wait(testing_utils.matchesPathLoaded(/profiles\/[\w]+\/edit/), 10000);
    //
    // let newGithub = await element.all(by.id('newGithub')).first().getAttribute('value');
    // expect(github).toEqual(newGithub);

    await browser.sleep(10000);

    done();
  });

});
