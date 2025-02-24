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
  
    it('should navigate to messages page', () => {

      //click on messages subitem
      cy.get('#messages_subitem').should('be.visible').click();

      cy.get('#messages-content')
      .should('be.visible')

      // Find and click the search input
        cy.get('#messages-table_filter input[type="search"]')
        .should('be.visible')
        .click()
        .type('tes');

        // Wait for table to filter
        cy.get('#messages-table')
        .should('be.visible');

        // Find and click Messages button for testDDD
        cy.contains('tr', 'testDDD')
        .within(() => {
            cy.get('button.btn.btn-primary.btn-sm')
            .contains('Messages')
            .should('be.visible')
            .click();
        });

        // Verify modal opens and check its contents
        cy.get('#myModalAlert_messageModule')
        .should('be.visible')
        .within(() => {
        // Verify modal header
        cy.contains('Name: testDDD');

        // Verify messages content
        cy.get('.modal-content-messageModule')
            .should('be.visible');

        // Verify message input exists
        cy.get('.message-input-messageModule')
            .should('be.visible');

            // Type new message
        cy.get('#messageInput_messageModule')
        .should('be.visible')
        .type('This is a test message');

        // Click Send button
        cy.get('.sendBut')
            .should('be.visible')
            .click();

        // Verify message appears in the chat
        cy.get('.messages-messageModule')
            .should('contain', 'This is a test message')
            .and('contain', 'Admin'); // Assuming sender appears as Admin
            
        });

        // Close the modal
        cy.get('span.close-messageModule')
        .should('be.visible')
        .click();

        // Verify modal is closed
        cy.get('#myModalAlert_messageModule')
            .should('not.be.visible');

    })
  })