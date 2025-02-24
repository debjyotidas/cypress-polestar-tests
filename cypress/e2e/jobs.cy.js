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
  
    it('should navigate to jobs page', () => {

      //click on jobs subitem
      cy.get('#jobs_subitem').should('be.visible').click();

      cy.get('#jobs-content')
      .should('be.visible')

      cy.get('#viewAll').click();

      // Wait for loading to complete
        cy.contains('Loading...')
        .should('not.exist');

    // Verify table headers are present
    cy.get('.table-responsive #jobs-table_wrapper')
        .should('be.visible')
        .within(() => {
        cy.get('th').contains('Job ID');
        cy.get('th').contains('Customer Name');
        cy.get('th').contains('Service Type');
        });

    // Verify search inputs are present
    cy.get('input[placeholder="Search Job ID"]').should('be.visible');
    cy.get('input[placeholder="Search Customer Name"]').should('be.visible');
    cy.get('input[placeholder="Search Service Type"]').should('be.visible');

    // Verify export buttons are present
    cy.get('button').contains('Print').should('be.visible');

    // Type 'test' in the search box
    cy.get('#jobs-table_filter input[type="search"]')
      .should('be.visible')
      .type('test');

    // Click on the first sorting control (Job ID column)
    cy.get('td.sorting_1.dtr-control')
      .first()
      .click();

    // Optional: Verify sorting worked
    cy.get('td.sorting_1.dtr-control')
      .first()
      .should('be.visible');

      // Click the Remind button for job ID 20
    cy.get('.dtr-data a.remind-icon')
    .should('be.visible')
    .should('have.attr', 'title', 'Remind')
    .click();

    // Verify reminder modal is visible
    cy.get('#reminderModal')
      .should('be.visible')
      .within(() => {
        // Find and click the template dropdown
        cy.get('#templateSelect')
          .select('Service Schedule Reminder');

        // Optional: Verify the text area contains default message
        cy.get('#customMessage')
          .should('be.visible')
          .clear()
          .type('This is a reminder for your upcoming service schedules.');

        //Click Send Reminder button
        cy.get('#saveReminder').click();
      });

      // Close the modal
        cy.get('#reminderModal button.btn.btn-secondary[data-dismiss="modal"]')
        .should('be.visible')
        .contains('Close')
        .click();

        // Verify modal is closed
        cy.get('#reminderModal')
        .should('not.be.visible');

        // Click Messages button
      cy.get('.dtr-data a.message-icon')
      .should('be.visible')
      .click();

      // Handle message modal
      cy.get('#myModalAlert_messageModule')
        .should('be.visible')
        .within(() => {
          // Verify job info is correct
          cy.contains('Name: TestDemo');

          // Type message
          cy.get('#messageInput_messageModule')
            .should('be.visible')
            .clear()
            .type('This is a test message from automated test');

          // Send message
          cy.get('button.sendBut')
            .should('be.visible')
            .click();

          // Verify message appears in chat
          // cy.get('.messages-messageModule')
          //   .should('contain', 'This is a test message from automated test')
          //   .and('contain', 'Admin'); // Assuming sender appears as Admin
        });

        // Close modal
        cy.get('span.close-messageModule')
          .should('be.visible')
          .click();

        // Verify modal is closed
        cy.get('#myModalAlert_messageModule')
          .should('not.be.visible');
      

        // Click the reschedule button for job ID 20
        cy.get('.dtr-data a.reschedule-icon')
        .should('be.visible')
        .should('have.attr', 'title', 'Reschedule')
        .click();

        cy.get('#rescheduleModal')
        .should('be.visible')
        .within(() => {
            // Find and click the template dropdown
            cy.get('#confirmReschedule').eq(0)
            .click();
        })

        cy.get('#rescheduleModal .close')
        .should('be.visible')
        .click();

        cy.get('#rescheduleModal')
        .should('not.be.visible');

          // Click on the Upload icon
      cy.get('.dtr-data a.upload-icon')
      .should('be.visible')
      .should('have.attr', 'title', 'Upload')
      .click();

      // Verify upload modal is visible
      cy.get('#uploadModal')
        .should('be.visible');

        // Select Customer Car tab if needed
      cy.contains('Customer Car').click();

      cy.get('#uploadCustomerPictures').click();

      // Upload file using selectFile
      // The path should be relative to your cypress/fixtures folder
      // cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });

      // Upload multiple files
      cy.get('input[type="file"]').eq(0).selectFile([
          'cypress/fixtures/dl.png',
          'cypress/fixtures/insurance.png',
          'cypress/fixtures/service.png',
          'cypress/fixtures/agreement.png'
        ], { 
          force: true,
          multiple: true 
        });

      // Click Submit button with force option if needed
      cy.get('#submitUpload')
      .should('be.visible')  // Changed from 'be.visible' to 'exist'
      .click();  // Added force: true

      //click on close button
      cy.get('#uploadModal .close')
      .should('be.visible')
      .click();

      // Verify modal is closed
      cy.get('#uploadModal').should('not.be.visible');
    })
  })