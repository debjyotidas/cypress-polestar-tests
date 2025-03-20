describe('Polestar', () => {
    beforeEach(() => {
  
      // Add this to handle uncaught exceptions
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
      });
      // Increase default timeout for all commands
      Cypress.config('defaultCommandTimeout', 10000);
  
      cy.visit('https://www.tracking1.matrack.io/gpstracking/adminnew/view/login.php');
      cy.get('#username').type('debjyoti');
      cy.get('#password').type('@Debjyoti0411');
      
      // Click submit button
      cy.get('button.btn.btn-theme.btn-block.submit')
        .should('be.visible')
        .click();
      
      // Wait for navigation
      cy.url().should('equal', 'https://www.tracking1.matrack.io/gpstracking/adminnew/view/index.php');
      
      cy.visit('https://www.tracking1.matrack.io/gpstracking/PoleStarApp/client/maps/index2_new.php?auth=91edc92ddc4c2b748c7bf06ab323b4c5');

    });

    it('should navigate to driver app view page', () => {

        // Click the menu toggle button and verify menu opens
        cy.get('.fas.fa-bars.text-xl')
        .should('be.visible')
        .click();

        // Verify slide menu is active
        cy.get('.slide-menu')
        .should('have.class', 'active');

        cy.get('#myJobsBtn')
        .click();

        cy.get('#jobCardsContainer')
        .should('be.visible')

        // Click the menu toggle button and verify menu opens
        cy.get('.fas.fa-bars.text-xl')
        .should('be.visible')
        .click();

        // Verify slide menu is active
        cy.get('.slide-menu')
        .should('have.class', 'active');

        cy.get('#currentJobsBtn')
        .click();

        cy.get('#jobCardsContainer')
        .should('be.visible')

        cy.get('#settingBtn')
        .click();

        cy.get('#timezoneModal')
        .should('be.visible')

        // Find and check the GMT-9 radio button
        cy.get('input[type="radio"][value="GMT-9"]')
        .should('be.visible')
        .check();

        // Verify the radio button is checked
        cy.get('input[type="radio"][value="GMT-9"]')
        .should('be.checked');

       cy.get('#timezoneModal .btn-update')
        .click();

       
    })
})