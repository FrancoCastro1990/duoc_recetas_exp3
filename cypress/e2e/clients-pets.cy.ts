describe('Clients and Pets Page', () => {
  beforeEach(() => {
    cy.visit('/clients');
  });

  it('displays clients grid', () => {
    cy.getByTestId('clients-grid').should('be.visible');
  });

  it('displays client cards with information', () => {
    cy.get('[data-testid^="client-card-"]').should('have.length.at.least', 1);
    cy.contains('Maria Gonzalez').should('be.visible');
  });

  it('displays client contact info', () => {
    cy.contains('+56 9').should('be.visible');
    cy.contains('@email.com').should('be.visible');
  });

  it('displays pets associated with clients', () => {
    cy.contains('Mascotas').should('be.visible');
  });

  it('displays pets grid', () => {
    cy.getByTestId('pets-grid').should('be.visible');
    cy.get('[data-testid^="pet-card-"]').should('have.length.at.least', 1);
  });

  it('displays pet information', () => {
    cy.contains('Max').should('be.visible');
    cy.contains('Perro').should('be.visible');
  });

  it('filters clients by search', () => {
    cy.getByTestId('search-input').type('Maria');
    cy.get('[data-testid^="client-card-"]').should('have.length', 1);
    cy.contains('Maria Gonzalez').should('be.visible');
  });

  it('shows no results when search has no matches', () => {
    cy.getByTestId('search-input').type('ZZZZZ');
    cy.getByTestId('clients-empty').should('be.visible');
  });

  it('clears search and shows all clients', () => {
    cy.getByTestId('search-input').type('Maria');
    cy.get('[data-testid^="client-card-"]').should('have.length', 1);

    cy.getByTestId('search-input').clear();
    cy.get('[data-testid^="client-card-"]').should('have.length.at.least', 3);
  });

  it('displays stats in hero section', () => {
    cy.contains('Total clientes:').should('be.visible');
    cy.contains('Total mascotas:').should('be.visible');
  });
});
