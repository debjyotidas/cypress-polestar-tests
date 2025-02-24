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
      
      // Visit the second URL
      cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps.php#');
      
      // Verify the URL
      cy.url().should('include', 'MatrackDemo/maps/index2_ps.php');
      
      // Verify key elements are present - fixed syntax
      cy.get('#settings_subitem').should('exist');
      cy.get('#jobs_subitem').should('exist');
      cy.get('#loaner_inventory_subitem').should('exist'); // Fixed syntax
      cy.get('#customer_records_subitem').should('exist'); // Fixed syntax
    });
  
    it('should navigate to map view page', () => {

        //click on map view subitem
        cy.get('#map_view_subitem').should('be.visible').click();

        cy.get('#map-view-content')
        .should('be.visible')

        // Search for test
        cy.get('#jobSearch')
        .should('be.visible')
        .type('test');

        // Click on the job list item with data-job-id="103"
        cy.get('li.job-list-item[data-job-id="103"]')
            .should('be.visible')
            .click();

        // Verify the info box appears with correct job details
        cy.get('.H_ib_body') // Adjust selector based on your map info box class
            .should('be.visible')
            .within(() => {
            cy.contains('Job #103');
            cy.contains('Rebessa tim');
            cy.contains('San Ramon, CA, United States');
            cy.contains('Status: 3');
            cy.contains('Service: service');
            });

    })
  })