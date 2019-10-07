const puppeteer = require('puppeteer')
const { SLO_MO } = require('./enums')

async function initializeBrowser(defaultSlomo = 0) {
  let headless = process.env.HEADLESS
  let browser = await puppeteer.launch({
    headless: headless !== 'false',
    args: ['--start-fullscreen', '--disk-cache-size=0', '-no-sandbox'],
    slowMo: headless === 'false' ? SLO_MO : defaultSlomo,
    defaultViewport: null,
  })

  return browser
}
async function initializePage(browser) {
  let page = await browser.newPage()
  return page
}

module.exports = {
  initializeBrowser,
  initializePage,
}
