import { browser, by, element } from 'protractor';
import {testing_utils} from "../testing/utils/helper.util";
require('../../config/helpers');

describe('App', () => {

  beforeAll(() => {
    browser.get('/');
  });


  it('test login works successfully', () => {

    expect(element.all(by.css('.nav-menu-anchor')).get(0).getText()).toEqual('Home');
    expect(element.all(by.css('.nav-menu-anchor')).get(1).getText()).toEqual('Users');
    expect(element.all(by.css('.nav-menu-anchor')).get(2).getText()).toEqual('Tags');
    expect(element.all(by.css('.nav-menu-anchor')).get(3).getText()).toEqual('Profile');
    expect(element.all(by.css('.nav-menu-anchor')).get(4).getText()).toEqual('Sign Out');

    element.all(by.css('.nav-menu-anchor')).count().then((cnt) => { expect(cnt).toEqual(5)});

  });

});
