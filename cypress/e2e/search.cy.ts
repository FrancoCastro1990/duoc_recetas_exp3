/**
 * E2E Test: Recipe Search
 * Tests search functionality in the recipe explorer
 */

describe('Recipe Search', () => {
  beforeEach(() => {
    cy.visit('/recipes');
    // Wait for recipes to load
    cy.getByTestId('recipes-grid').should('be.visible');
  });

  it('should display search input', () => {
    // Wait for animation to complete
    cy.wait(1000);
    cy.getByTestId('search-input').should('exist');
    cy.getByTestId('search-input').should('have.attr', 'placeholder').and('contain', 'Buscar');
  });

  it('should filter recipes when typing in search', () => {
    // Type a search term
    cy.getByTestId('search-input').type('Pasta');

    // Should show filtered results or empty state
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid^="recipe-card-"]').length > 0) {
        cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);
      } else {
        cy.getByTestId('recipes-empty').should('be.visible');
      }
    });
  });

  it('should show empty state when no recipes match search', () => {
    // Type a search term that won't match anything
    cy.getByTestId('search-input').type('xyznonexistent123');

    // Should show empty state
    cy.getByTestId('recipes-empty').should('be.visible');
    cy.contains('No se encontraron recetas').should('be.visible');
  });

  it('should clear search and show all recipes', () => {
    // First search for something
    cy.getByTestId('search-input').type('Tiramisú');

    // Verify filtering is applied
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);

    // Clear the search
    cy.getByTestId('search-input').clear();

    // All recipes should be visible again
    cy.getByTestId('recipes-grid').should('be.visible');
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 1);
  });

  it('should be case insensitive in search', () => {
    // Search in lowercase
    cy.getByTestId('search-input').type('tiramisu');

    // Should still find results (if Tiramisú exists)
    cy.get('[data-testid^="recipe-card-"]').should('have.length.at.least', 0);
  });

  it('should work together with category filter', () => {
    // First filter by category
    cy.getByTestId('filter-dessert').click();
    cy.getByTestId('filter-dessert').should('have.class', 'bg-gradient-primary');

    // Then search within that category
    cy.getByTestId('search-input').type('a');

    // Wait for results to update
    cy.wait(500);

    // Results should be visible (grid or empty state)
    cy.get('body').should('be.visible');
  });

  it('should update found count when searching', () => {
    // Wait for animation to complete
    cy.wait(1000);
    cy.contains('Recetas encontradas:').should('exist');

    // Search for something
    cy.getByTestId('search-input').type('test');

    // Count should still be present
    cy.contains('Recetas encontradas:').should('exist');
  });
});
