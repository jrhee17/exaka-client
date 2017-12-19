import {browser} from "protractor";

/**
 * Created by john on 11/12/2017.
 */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var request = require('request');

var headers: {
  'Content-Type': 'application/json',
  'Api-Token': 'a0f3310f856222786718c8261fc9c005',
};
var options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': 'a0f3310f856222786718c8261fc9c005',
  }
};
var patch_options = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': 'a0f3310f856222786718c8261fc9c005',
  }
};
function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, options,(error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function patchRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, patch_options,(error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

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

async function cleanInbox() {
  return await patchRequest(`https://mailtrap.io/api/v1/inboxes/283729/clean`);
}

async function getEmail(email: string) {
  let retry_count = 0;
  let response_json = [];
  do {
    retry_count++;
    response_json = await doRequest(`https://mailtrap.io/api/v1/inboxes/283729/messages?search=${email}`).then((response: string) => {
      return JSON.parse(response);
    });
    browser.sleep(1000);
  } while (response_json.length == 0 && retry_count <= 5);

  let first_obj = response_json[0];
  let xmlString = first_obj['html_body'];

  const dom = new JSDOM(xmlString);
  return dom;
}

export {getEmail, cleanInbox}
