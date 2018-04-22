const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768, isLandscape: true})
  await loginToMSFT(browser, CREDS.username, CREDS.password);
  
  page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768, isLandscape: true})
  await page.goto('https://www.bing.com/');

  // TODO the thing
  
  // browser.close();
}

/**
 * Logs into Microsoft
 * @param {object} browser 
 * @param {string} username 
 * @param {string} password 
 */
async function loginToMSFT(browser, username, password) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768, isLandscape: true})
  await page.goto('https://login.live.com/');
 
  const USERNAME_SELECTOR = "input[name='loginfmt']";
  const PASSWORD_SELECTOR = "input[name='passwd']";

  await fillForm(page, USERNAME_SELECTOR, username, '#idSIButton9');
  await fillForm(page, PASSWORD_SELECTOR, password, '#idSIButton9');

  return browser
}

async function fillForm(page, textSelector, fillText, submitSelector) {
  await page.click(textSelector);
  await page.keyboard.type(fillText);
  await page.click(submitSelector);
  await page.waitForNavigation();
}

run();