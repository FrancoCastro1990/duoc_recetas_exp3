/**
 * E2E Test: Navigation
 * Tests basic navigation flows through the application
 */

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display home page with welcome message', () => {
    cy.contains('h1', 'Bienvenido').should('be.visible');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should navigate from home to recipes page using nav link', () => {
    // Click on Recetas nav link
    cy.getByTestId('nav-recipes').click();

    // Verify URL changed
    cy.url().should('include', '/recipes');

    // Wait for animation to complete and verify recipes grid
    cy.getByTestId('recipes-grid', { timeout: 15000 }).should('exist');
  });

  it('should navigate from recipes page back to home', () => {
    // First go to recipes
    cy.getByTestId('nav-recipes').click();
    cy.url().should('include', '/recipes');

    // Then navigate back home
    cy.getByTestId('nav-home').click();

    // Verify we are back home
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('h1', 'Bienvenido').should('be.visible');
  });

  it('should display recipe cards when visiting recipes page', () => {
    cy.visit('/recipes');

    // Wait for recipes to load
    cy.getByTestId('recipes-grid').should('be.visible');

    // Verify at least one recipe card is displayed
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);
  });

  it('should show active state on current nav link', () => {
    // Home should be active initially
    cy.getByTestId('nav-home').should('have.class', 'bg-white');

    // Navigate to recipes
    cy.getByTestId('nav-recipes').click();

    // Recipes nav should now have active state
    cy.getByTestId('nav-recipes').should('have.class', 'bg-white');
  });
});
