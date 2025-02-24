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

        //click on customer records subitem
        cy.get('#customer_records_subitem').should('be.visible').click();

        cy.get('#customer-records-content')
        .should('be.visible')

        // Find and use the search input
        cy.get('#customer-records-table_filter input[type="search"]')
        .should('be.visible')
        .should('have.attr', 'placeholder', 'Search customer records...')
        .type('test');

        // Click edit icon for data-id 307
        cy.get('i.fas.fa-edit.edit-icon[data-id="307"]')
        .should('be.visible')
        .click();

        // Verify edit modal opens
        cy.get('#editCustomerModal')
        .should('be.visible');

        // Edit Customer Name
        cy.get('#editCustomerName')
          .clear()
          .type('carltest updated');

        // Edit Customer Email
        cy.get('#editCustomerEmail')
          .clear()
          .type('carltest_updated@gmail.com');

        // Edit Customer Mobile
        cy.get('#editCustomerMobile')
          .clear()
          .type('8777278156');

        // Edit Customer Address
        cy.get('#editCustomerAddress')
          .clear()
          .type('Updated San Ramon, Alajuela, Costa Rica');

          cy.get('#editCustomerInstructions')
          .clear()
          .type('test instructions');

        // Click Save button
        cy.get('#saveEditCustomerBtn')
          .should('be.visible')
          .click();

          // Clear the search input
        cy.get('#customer-records-table_filter input[type="search"]')
        .should('be.visible')
        .clear();

        // Click Jobs button using data attributes
        cy.get('button.btn.btn-sm.btn-info[data-id="336"][data-name="Abrar Issac"]')
            .should('be.visible')
            .contains('Jobs')
            .click();

        // Verify jobs modal or page opens
        cy.get('#customerJobsModal')  // Adjust selector based on your actual modal ID
            .should('be.visible');

        // Wait for jobs modal to open and click on job ID 444
        cy.get('#customer-jobs-table')
        .should('be.visible')
        .within(() => {
        cy.get('a.job-id-link[data-id="444"]')
            .should('be.visible')
            .click();
        });

        //Verify job details modal/page opens
        cy.get('#jobDetailsModal')  // Adjust selector based on your actual modal ID
            .should('be.visible');

        // Click on the "close" button
        cy.get('#JobDetailsModal .close')
        .should('be.visible')
        .click();

        // Click on Abrar Issac's name
        cy.get('a.customer-name[data-id="336"]')
        .should('be.visible')
        .contains('Abrar Issac')
        .click();

        //Verify modal or page that opens after clicking
        cy.get('#customerDetailsModal') // Adjust selector based on your actual modal/page ID
            .should('be.visible');

        // Click on the "close" button
        cy.get('#customerDetailsModal .btn.btn-secondary')
        .should('be.visible')
        .click();

    })
  })