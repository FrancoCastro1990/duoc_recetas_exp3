/**
 * E2E Test: Recipe Filtering
 * Tests category filtering functionality
 */

describe('Recipe Filtering', () => {
  beforeEach(() => {
    cy.visit('/recipes');
    // Wait for recipes to load
    cy.getByTestId('recipes-grid').should('be.visible');
  });

  it('should display all filter buttons', () => {
    cy.getByTestId('recipe-filters').should('be.visible');
    cy.getByTestId('filter-all').should('be.visible');
    cy.getByTestId('filter-dessert').should('be.visible');
    cy.getByTestId('filter-main-course').should('be.visible');
  });

  it('should have "Todas" filter active by default', () => {
    cy.getByTestId('filter-all').should('have.class', 'bg-gradient-primary');
  });

  it('should filter recipes by "Postres" category', () => {
    // Click on dessert filter
    cy.getByTestId('filter-dessert').click();

    // Verify filter is now active
    cy.getByTestId('filter-dessert').should('have.class', 'bg-gradient-primary');

    // Should show recipes (might be all or some)
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);
  });

  it('should filter recipes by "Platos Principales" category', () => {
    // Click on main-course filter
    cy.getByTestId('filter-main-course').click();

    // Verify filter is now active
    cy.getByTestId('filter-main-course').should('have.class', 'bg-gradient-primary');

    // Should show recipes
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);
  });

  it('should show all recipes when clicking "Todas" after filtering', () => {
    // First filter by desserts
    cy.getByTestId('filter-dessert').click();
    cy.get('[data-testid^="recipe-card-"]').then(($filteredCards) => {
      const filteredCount = $filteredCards.length;

      // Now click on "Todas"
      cy.getByTestId('filter-all').click();

      // Should show more or equal recipes
      cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', filteredCount);
    });
  });

  it('should update recipe count when filtering', () => {
    // Wait for animation to complete
    cy.wait(1000);
    cy.contains('Recetas encontradas:').should('exist');

    // Filter by desserts
    cy.getByTestId('filter-dessert').click();

    // Count should still be present after filtering
    cy.contains('Recetas encontradas:').should('exist');
  });
});
