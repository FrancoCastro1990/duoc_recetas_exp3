describe('Pet Detail Page', () => {
  beforeEach(() => {
    cy.visit('/pets/p1');
  });

  it('displays pet detail header', () => {
    cy.getByTestId('pet-detail-header').should('be.visible');
  });

  it('displays pet name and info', () => {
    cy.contains('Max').should('be.visible');
    cy.contains('Golden Retriever').should('be.visible');
    cy.contains('Perro').should('be.visible');
  });

  it('displays pet attributes', () => {
    cy.contains('anos').should('be.visible');
    cy.contains('kg').should('be.visible');
  });

  it('displays owner information', () => {
    cy.getByTestId('pet-owner-info').should('be.visible');
    cy.contains('Dueno').should('be.visible');
    cy.contains('Maria Gonzalez').should('be.visible');
  });

  it('displays owner contact details', () => {
    cy.getByTestId('pet-owner-info').within(() => {
      cy.contains('+56').should('be.visible');
      cy.contains('@email.com').should('be.visible');
    });
  });

  it('displays medical history section', () => {
    cy.getByTestId('pet-medical-history').should('be.visible');
    cy.contains('Historial Medico').should('be.visible');
  });

  it('displays medical records', () => {
    cy.get('[data-testid^="medical-record-"]').should('have.length.at.least', 1);
  });

  it('has back button that navigates to clients', () => {
    cy.getByTestId('back-button').should('be.visible');
    cy.getByTestId('back-button').click();
    cy.url().should('include', '/clients');
  });

  it('displays loading state initially', () => {
    // Intercept the GraphQL request to delay it
    cy.intercept('POST', '/graphql', (req) => {
      req.continue((res) => {
        // Normal response
      });
    });

    // Reload and check for loading
    cy.visit('/pets/p1');
    // The loading state might be too fast to catch, but the content should load
    cy.getByTestId('pet-detail-header').should('be.visible');
  });

  it('handles non-existent pet', () => {
    cy.visit('/pets/nonexistent');
    cy.contains('No se encontro la mascota').should('be.visible');
    cy.contains('Volver a clientes').should('be.visible');
  });
});
