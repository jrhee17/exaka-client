/**
 * Created by john on 15/10/2017.
 */
import {browser, element, by, ElementFinder} from "protractor";
import {test} from "shelljs";
import {WebElement} from "selenium-webdriver";

export class testing_utils {

  public static relPathLoaded(url) {
    return () => {
      return browser.getCurrentUrl().then(function(actualUrl) {
        var rel_url = /^(.*)\/#\/(.*)$/.exec(actualUrl)[2];
        return rel_url === url;
      });
    }
  }

  public static matchesPathLoaded(regex: RegExp) {
    return () => {
      return browser.getCurrentUrl().then(function(actualUrl) {
        return regex.test(actualUrl);
      });
    }
  }

  public static login() {
    // console.log('login');
    browser.get('#/auth/login');

    element(by.id('inputEmail')).sendKeys('jay5751@naver.com');
    element(by.id('inputPassword')).sendKeys('asdfASDF123');
    element(by.id('login-btn')).click();
    browser.wait(testing_utils.relPathLoaded(''), 10000);
  }

  public static loginIfNecessary() {
    if(!testing_utils.isLoggedIn()) testing_utils.login();
  }

  public static isLoggedIn(): boolean {
    let isLoggedIn = false;
    browser.wait(element.all(by.css('.nav-menu-anchor')).get(4).getText(), 10000).then((val) => isLoggedIn = (val === 'Sign Out'));
    return isLoggedIn;
  }

  public static logout() {

  }

  public static cssClassLoaded(elementFinder, lookup: string) {
    return () => {
      return elementFinder.getAttribute('class').then(function (classValue) {
        return classValue && new RegExp("\\b" + lookup + "\\b").test(classValue);
      });
    }
  }

  public static imgLoaded(imgElement): boolean {
    return imgElement.getAttribute('complete') && imgElement.getAttribute('naturalHeight') !== 0
  }
}
