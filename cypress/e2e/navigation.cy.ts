describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays home page', () => {
    cy.contains('Veterinaria Cuidado Animal').should('be.visible');
  });

  it('navigates to clients page from home', () => {
    cy.contains('Ver Clientes').click();
    cy.url().should('include', '/clients');
    cy.contains('Clientes y Mascotas').should('be.visible');
  });

  it('navigates to appointments page from home', () => {
    cy.contains('Ver Citas').click();
    cy.url().should('include', '/appointments');
    cy.contains('Citas del Dia').should('be.visible');
  });

  it('navigates using navbar', () => {
    cy.getByTestId('nav-clients').click();
    cy.url().should('include', '/clients');

    cy.getByTestId('nav-appointments').click();
    cy.url().should('include', '/appointments');

    cy.getByTestId('nav-home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('shows active state on navbar', () => {
    cy.getByTestId('nav-home').should('have.class', 'bg-white');

    cy.getByTestId('nav-clients').click();
    cy.getByTestId('nav-clients').should('have.class', 'bg-white');
    cy.getByTestId('nav-home').should('not.have.class', 'bg-white');
  });

  it('navigates to pet detail from clients page', () => {
    cy.visit('/clients');
    cy.getByTestId('pets-grid').should('be.visible');
    cy.get('[data-testid^="pet-card-"]').first().click();
    cy.url().should('include', '/pets/');
    cy.getByTestId('pet-detail-header').should('be.visible');
  });

  it('navigates back from pet detail', () => {
    cy.visit('/pets/p1');
    cy.getByTestId('back-button').click();
    cy.url().should('include', '/clients');
  });
});
