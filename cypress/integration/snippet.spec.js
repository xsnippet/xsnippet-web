describe('Snippet', () => {
  it('should go to snippet page after clicking on recent item', () => {
    cy.visit('/recent');
    cy.get('.recent-snippet-item').first().as('snippet');

    cy.get('@snippet')
      .then((item) => {
        const link = item.find('.recent-snippet-meta-title').attr('href');

        cy.get('@snippet').find('.recent-snippet-meta-title').click();

        cy.url().should('contain', link);
      });
  });

  it('should show embed content', () => {
    cy.get('.snippet-embed').should('not.be.visible');

    cy.get('.toggle-embed').click().should('have.class', 'true');

    cy.get('.snippet-embed').should('be.visible');
  });

  it('should hide embed content on close button', () => {
    cy.get('.snippet-embed-close').as('closeEmbed');
    cy.get('.snippet-embed-close').should('be.visible');

    cy.get('@closeEmbed').click();

    cy.get('@closeEmbed').should('not.be.visible');
    cy.get('.toggle-embed').should('have.class', 'false');
  });
});
