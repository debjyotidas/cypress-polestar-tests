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
    //   cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps.php#');

      cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps_as.php#');
      
      // Verify the URL
    //   cy.url().should('include', 'MatrackDemo/maps/index2_ps.php');
      
      // Verify key elements are present - fixed syntax
      cy.get('#settings_subitem').should('exist');
      cy.get('#jobs_subitem').should('exist');
      cy.get('#loaner_inventory_subitem').should('exist'); // Fixed syntax
      cy.get('#customer_records_subitem').should('exist'); // Fixed syntax
    });
  
    it('should navigate to map view page', () => {

        // Wait for the sidebar-menu to be visible (corrected class from the HTML)
        cy.get('ul.sidebar-menu', { timeout: 30000 })
          .should('be.visible');

        // Click on In Service using the exact HTML structure
        cy.get('ul.sidebar-menu li.sidebar-item#in_service_subitem')
          .should('be.visible')
          .click({ force: true });

        // Wait for content area to be visible using the correct class from HTML
        cy.get('main.content', { timeout: 30000 })
          .should('be.visible');

        // Wait a bit for the content to stabilize
        cy.wait(2000);

        // ... existing code ...
        cy.wait(2000);

        // Visit the page again to ensure fresh state
        cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps.php#');

        // Wait for the page to fully load
        cy.wait(5000);

        // Click on In Service menu
        cy.get('ul.sidebar-menu li.sidebar-item#in_service_subitem')
          .should('be.visible')
          .click();

        // Wait for content to be visible
        cy.get('.tab-content')
          .should('be.visible');

        // Click on Scheduled Jobs tab
        cy.get('a.nav-link[data-toggle="tab"][href="#scheduled"]')
          .should('be.visible')
          .click();

        // Wait for the table wrapper to be visible
        cy.get('#scheduled-table_wrapper')
          .should('be.visible');

        // Search for the customer name using the search input
        cy.get('input.form-control.form-control-sm[type="search"][aria-controls="scheduled-table"]')
          .should('be.visible')
          .clear()
          .type('testDAutomatedTest');

        // Verify the search results in the table
        cy.get('#scheduled-table')
          .should('be.visible')
          .find('td')
          .contains('testDAutomatedTest')
          .should('be.visible');

        // Click on the Message icon for testDAutomatedTest using specific data attributes
        cy.get('a.message-icon-button[data-customername="testDAutomatedTest"]')
          .should('be.visible')
          .click();

        // Verify message modal appears
        cy.get('#myModalAlert_messageModule')
          .should('be.visible')
          .within(() => {
            // Verify the modal title contains the customer name
            cy.get('#jobNameDisplay')
              .should('contain', 'testDAutomatedTest');

            // Type message in the input field
            cy.get('#messageInput_messageModule')
              .should('be.visible')
              .type('This is an automated test message');

            // Click the Send button
            cy.get('button.sendBut')
              .should('be.visible')
              .click();

            //click on close button
            cy.get('#myModalAlert_messageModule .close-messageModule')
            .should('be.visible')
            .click();
          });


          // Verify upload modal appears
        cy.get('#myModalAlert_messageModule')
        .should('be.visible')
        .within(() => {
          // Verify the modal title contains the customer name
          cy.get('#jobNameDisplay')
            .should('contain', 'testDAutomatedTest');

          // Type message in the input field
          cy.get('#messageInput_messageModule')
            .should('be.visible')
            .type('This is an automated test message');

          // Click the Send button
          cy.get('button.sendBut')
            .should('be.visible')
            .click();

          //click on close button
          cy.get('#myModalAlert_messageModule .close-messageModule')
          .should('be.visible')
          .click();
        });

    });
  })
