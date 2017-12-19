/**
 * Created by john on 15/10/2017.
 */

require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/**/**.e2e.login.ts'),
    helpers.root('src/**/*.e2e.login.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  // chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.33',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    },
  },

  // multiCapabilities: [{
  //   'browserName': 'chrome'
  // }, {
  //   'browserName': 'firefox'
  // }],
  // maxSessions: 1,

  onPrepare: function() {


    browser.ignoreSynchronization = true;

    browser.get('#/auth/login');

    element(by.id('inputEmail')).sendKeys('jay5751@naver.com');
    element(by.id('inputPassword')).sendKeys('asdfASDF123');
    element(by.id('login-btn')).click();
    browser.wait(() => {
      return browser.getCurrentUrl().then(function(actualUrl) {
        var rel_url = /^(.*)\/#\/(.*)$/.exec(actualUrl)[2];
        return rel_url === '';
      });
    }, 10000);
    browser.sleep(1000);
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};
