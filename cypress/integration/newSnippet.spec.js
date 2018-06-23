describe('New Snippet Form', () => {
  const SYNTAXES_LENGTH = 97

  it('should visit the app and focused on editor', () => {
    cy.visit('/')
      .focused().should('have.class', 'ace_text-input')
  })

  it('should have list of 97 syntaxes', () => {
    cy.get('.new-snippet-lang-item').should('have.length', SYNTAXES_LENGTH)
  })

  it('fills title field for new snippet', () => {
    const title = 'New title'

    cy.get('.new-snippet-code-header > .input').type(title)
      .should('have.value', title)
  })

  it('should add tags', () => {
    cy.get('.ReactTags__tagInputField').type('tag1{enter}').type('tag2{enter}')

    cy.get('.ReactTags__tag').should('have.length', 2)
  })

  it('should have 2 syntaxes left', () => {
    cy.get('.new-snippet-lang-header > .input').type('java')

    cy.get('.new-snippet-lang-item').should('have.length', 2)
  })

  it('should select JavaScript syntax', () => {
    cy.get('.new-snippet-lang-header > .input').clear().type('java')

    cy.get('[data-value="javascript"]').click()
  })

  it('should add snippet content (single line)', () => {
    const snippet = 'console.log(42);'

    cy.get('.ace_text-input').type(snippet, { force: true })

    cy.get('.ace_line').should((item) => {
      expect(item).to.have.length(1)
      expect(item).to.contain(snippet)
    })
  })

  it('should add snippet content (multi lines)', () => {
    const line2 = 'let b = 2;'
    const line3 = 'let a = b;'
    const snippet = `{enter}${line2}{enter}${line3}`

    cy.get('.ace_text-input').type(snippet, { force: true })

    cy.get('.ace_line').should((item) => {
      expect(item).to.have.length(3)
      expect(item.eq(1)).to.contain(line2)
      expect(item.eq(2)).to.contain(line3)
    })
  })

  it('should post snippet', () => {
    // cy.get('.new-snippet').submit()
    // TODO: check whether snippet has been posted
  })
})
