describe('Recent snippets', () => {
  const SNIPPETS_MAX_LIMIT = 20

  it('should visit recent snippet page and load last 20 snippets', () => {
    cy.visit('/recent')
      .get('.recent-snippet-item').should('have.length', SNIPPETS_MAX_LIMIT)
  })

  it('should do nothing on Prev button click', () => {
    cy.get('.pagination-item.next').should('have.class', 'disabled')
  })

  it('should go to previous page with recent snippets', () => {
    const recentItem = '.recent-snippet-item'
    const recentItemTitle = '.recent-snippet-meta-title'

    cy.get(recentItem).first()
      .then((item) => {
        const prevPageFirstItemTitle = item.find(recentItemTitle).text()

        cy.get('.pagination-item.prev')
          .should('not.have.class', 'disabled')
          .click()
          .wait(2000)
          .then(() => {
            cy.get(recentItem).first()
              .then((newItem) => {
                expect(newItem.find(recentItemTitle).text()).to.not.contain(prevPageFirstItemTitle)
              })
          })
      })
  })
})
