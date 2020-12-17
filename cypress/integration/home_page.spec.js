describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/') // dev URL
      cy.contains('Products').click()
      cy.url().should('include', '/products')
      cy.contains('Shop').click()
      cy.url().should('include', '/')
    })
  })