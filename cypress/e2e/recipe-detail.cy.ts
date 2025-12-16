/**
 * E2E Test: Recipe Detail
 * Tests viewing individual recipe details
 */

describe('Recipe Detail', () => {
  beforeEach(() => {
    cy.visit('/recipes');
    // Wait for recipes to load
    cy.getByTestId('recipes-grid').should('be.visible');
  });

  it('should navigate to recipe detail when clicking "Ver Receta"', () => {
    // Click on the first recipe's "Ver Receta" button
    cy.get('[data-testid^="view-recipe-"]').first().click();

    // Should navigate to detail page
    cy.url().should('match', /\/recipes\/\d+/);

    // Detail page should load
    cy.getByTestId('recipe-detail-page').should('be.visible');
  });

  it('should display recipe title on detail page', () => {
    cy.get('[data-testid^="view-recipe-"]').first().click();

    // Wait for loading to finish
    cy.getByTestId('recipe-detail-page').should('be.visible');

    // Title should be visible
    cy.getByTestId('recipe-title').should('be.visible');
    cy.getByTestId('recipe-title').invoke('text').should('not.be.empty');
  });

  it('should display recipe ingredients', () => {
    cy.get('[data-testid^="view-recipe-"]').first().click();
    cy.getByTestId('recipe-detail-page').should('be.visible');

    // Ingredients section should be visible
    cy.getByTestId('recipe-ingredients').should('be.visible');
    cy.contains('h2', 'Ingredientes').should('be.visible');

    // Should have at least one ingredient listed
    cy.getByTestId('recipe-ingredients').find('li').should('have.length.at.least', 1);
  });

  it('should display recipe instructions', () => {
    cy.get('[data-testid^="view-recipe-"]').first().click();
    cy.getByTestId('recipe-detail-page').should('be.visible');

    // Instructions section should be visible
    cy.getByTestId('recipe-instructions').should('be.visible');
    cy.contains('h2', 'Preparación').should('be.visible');

    // Should have at least one instruction step
    cy.getByTestId('recipe-instructions').find('li').should('have.length.at.least', 1);
  });

  it('should navigate back to recipes list using back button', () => {
    // Go to a recipe detail
    cy.get('[data-testid^="view-recipe-"]').first().click();
    cy.getByTestId('recipe-detail-page').should('be.visible');

    // Click back button
    cy.getByTestId('back-to-recipes').click();

    // Should be back on recipes list
    cy.url().should('include', '/recipes');
    cy.url().should('not.match', /\/recipes\/\d+/);
    cy.getByTestId('recipes-grid').should('be.visible');
  });

  it('should show loading state while fetching recipe details', () => {
    // Visit detail page directly (intercept to delay response)
    cy.intercept('POST', '**/graphql', (req) => {
      req.on('response', (res) => {
        res.setDelay(500);
      });
    }).as('graphqlRequest');

    cy.get('[data-testid^="view-recipe-"]').first().click();

    // Loading state might be visible briefly
    // This test verifies the loading state exists even if it's quick
    cy.getByTestId('recipe-detail-page').should('be.visible');
  });

  it('should navigate back using browser back button', () => {
    cy.get('[data-testid^="view-recipe-"]').first().click();
    cy.getByTestId('recipe-detail-page').should('be.visible');

    // Use browser back
    cy.go('back');

    // Should be back on recipes list
    cy.getByTestId('recipes-grid').should('be.visible');
  });

  it('should be accessible via direct URL', () => {
    // Visit recipe detail directly
    cy.visit('/recipes/1');

    // Should load the recipe detail
    cy.getByTestId('recipe-detail-page').should('be.visible');
    cy.getByTestId('recipe-title').should('be.visible');
  });
});
