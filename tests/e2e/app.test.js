const { initializeBrowser, initializePage } = require('./utils/initialize')
const { TIMEOUT } = require('./utils/enums')
const { apiCalls } = require('./utils/apiCalls')
const { titles } = require('./utils/responses')

const assertion = async (page, selector, value) => {
  let text
  await page.waitForSelector(selector)
  text = await page.$eval(selector, e => e.innerText)
  expect(text).toBe(value)
}

describe(
  'Initial flow',
  () => {
    let page
    let browser

    beforeAll(async () => {
      browser = await initializeBrowser(50)
      page = await initializePage(browser)
    })

    afterAll(async () => {
      browser.close()
    })

    beforeEach(async () => {
      await page.close()
      page = await initializePage(browser)
    })

    it(
      'Should type the snippet, add title, add tags and click post',
      async () => {
        await page.setRequestInterception(true)
        apiCalls(page)

        await page.goto('http://localhost:8080')

        await page.waitForSelector('.ace_content')
        await page.click('.ace_content')
        await page.type('.ace_content', 'This is a test snippet')

        await page.waitForSelector('.new-snippet__code-header > .input')
        await page.click('.new-snippet__code-header > .input')
        await page.type('.new-snippet__code-header > .input', 'Test snippet')

        await page.waitForSelector('.ReactTags__tagInputField')
        await page.click('.ReactTags__tagInputField')
        await page.type('.ReactTags__tagInputField', 'test tags')

        await page.waitForSelector('.new-snippet__code-bottom-bar > input')
        await page.click('.new-snippet__code-bottom-bar > input')

        await assertion(page, '.ace_content', 'This is a test snippet')
        await assertion(page, '.snippet__data-title', 'Test snippet')
        await assertion(page, '.snippet__meta-tag:nth-child(1)', 'test')
        await assertion(page, '.snippet__meta-tag:nth-child(2)', 'tags')
      },
      TIMEOUT
    )

    it(
      'Should go to recent snippets and render snippets correctly',
      async () => {
        await page.setRequestInterception(true)
        apiCalls(page)

        await page.goto('http://localhost:8080')

        await page.waitForSelector('.icon-recent')
        await page.click('.icon-recent')

        await page.waitForSelector('.recent-snippet__meta-title')

        let _titles = await page.$$eval('.recent-snippet__meta-title', titles =>
          titles.map(title => title.innerText)
        )
        let doSnippetTitleMatches =
          JSON.stringify(_titles) === JSON.stringify(titles)
        expect(doSnippetTitleMatches).toBe(true)
      },
      TIMEOUT
    )
  },
  TIMEOUT
)
