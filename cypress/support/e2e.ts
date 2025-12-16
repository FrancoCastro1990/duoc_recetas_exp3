// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

// Prevent TypeScript errors when using cy.get with data-testid
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestId('search-input')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
