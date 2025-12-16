// ***********************************************
// Custom Commands for Cypress
// ***********************************************

/**
 * Custom command to select DOM element by data-testid attribute.
 * Usage: cy.getByTestId('search-input')
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});
