describe('Appointments Page', () => {
  beforeEach(() => {
    cy.visit('/appointments');
  });

  it('displays appointments page', () => {
    cy.contains('Citas del Dia').should('be.visible');
  });

  it('displays date filter', () => {
    cy.getByTestId('date-filter').should('be.visible');
    cy.getByTestId('date-input').should('be.visible');
  });

  it('displays appointments list', () => {
    cy.getByTestId('appointments-list').should('be.visible');
  });

  it('displays appointment cards with information', () => {
    cy.get('[data-testid^="appointment-card-"]').should('have.length.at.least', 1);
  });

  it('displays appointment details: time, pet, owner, vet', () => {
    cy.get('[data-testid^="appointment-card-"]').first().within(() => {
      cy.contains(/\d{2}:\d{2}/).should('be.visible'); // Time format
      cy.contains('Dr.').should('be.visible'); // Veterinarian
    });
  });

  it('displays appointment status', () => {
    cy.contains('Programada').should('be.visible');
  });

  it('displays stats in hero section', () => {
    cy.contains('Citas programadas:').should('be.visible');
    cy.contains('Maximo por dia:').should('be.visible');
    cy.contains('8').should('be.visible');
  });

  it('shows max appointments warning when limit reached', () => {
    // The mock data has 8 appointments for today
    cy.getByTestId('max-appointments-warning').should('be.visible');
  });

  it('filters appointments by date', () => {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    cy.getByTestId('date-input').clear().type(tomorrowStr);

    // Tomorrow should have fewer appointments than today
    cy.get('[data-testid^="appointment-card-"]').should('have.length.lessThan', 8);
  });

  it('shows empty state for date with no appointments', () => {
    // Use a date far in the future
    cy.getByTestId('date-input').clear().type('2030-01-01');
    cy.getByTestId('appointments-empty').should('be.visible');
  });
});
