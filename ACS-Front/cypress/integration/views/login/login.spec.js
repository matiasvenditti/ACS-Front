context('Local Storage', () => {
  beforeEach(() => {
    cy.visit('/login')
  });

  it('should login a user', () => {

    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem('token')).to.be.null;
    });

    cy.get('[data-cy=username-input]').click().type('admin', {delay: 100});

    cy.get('[data-cy=password-input]').click().type('pass', {delay: 100});

    cy.get('[data-cy=submit-button]').click().should(() => {
      expect(localStorage.getItem('token')).to.eq('logged');
    })

  })
});
