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
      // cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps.php#');

      cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps_as.php#');
      
      // Verify the URL
      // cy.url().should('include', 'MatrackDemo/maps/index2_ps.php');
      
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
        cy.get('#customer-search')
        .should('be.visible')
        .clear()
        .type('test');

        // Verify ddtest row appears and contains correct information
        cy.get('#customer-records-table tbody tr')
        .should('contain', 'ddtest')
        .within(() => {
            cy.get('td').eq(0).should('contain', 'ddtest');
            cy.get('td').eq(1).should('contain', 'da@gmail.com');
            cy.get('td').eq(2).should('contain', '9777454545');
            cy.get('td').eq(3).should('contain', 'San Ramon, CA, United States');
            });

        // Click on ddtest in Customer Name column
        cy.get('a.customer-name')
        .contains('ddtest')
        .should('be.visible')
        .click();

        // Verify customer details modal opens
        cy.get('#customerDetailsModal')
        .should('be.visible')
        .within(() => {
            // Verify modal title shows customer name
            cy.contains('ddtest').should('be.visible');
            
            // Verify CONTACT INFORMATION section
            cy.contains('CONTACT INFORMATION').should('be.visible');
            
            // Verify customer details
            cy.get('.info-grid')
            .should('be.visible')
            .within(() => {
            // Verify phone number
            cy.contains('9777454545').should('be.visible');
            // Verify email
            cy.contains('da@gmail.com').should('be.visible');
            // Verify address
            cy.contains('San Ramon, CA, United States').should('be.visible');
            });
        });

        // Click on the "close" button
        cy.get('#customerDetailsModal .btn.btn-secondary')
        .should('be.visible')
        .click();

        // Click on the briefcase icon for ddtest
        cy.get('button.action-btn.jobs')
        .contains('View Jobs')
        .parents('tr')
        .contains('ddtest')
        .parents('tr')
        .find('.fas.fa-briefcase')
        .should('be.visible')
        .click();

        // Verify jobs modal opens and check its contents
      cy.get('#customerJobsModal')
      .should('be.visible')
      .within(() => {
        // Verify modal header shows customer name
        cy.get('.modal-header')
          .should('contain', 'ddtest')
          .and('contain', 'Job History');

        // Verify table headers
        cy.contains('Job ID').should('be.visible');
        cy.contains('Job Name').should('be.visible');
        cy.contains('Start Time').should('be.visible');
        cy.contains('End Time').should('be.visible');
        cy.contains('Status').should('be.visible');
        cy.contains('Driver').should('be.visible');
        cy.contains('Loaner').should('be.visible');
        cy.contains('Documents').should('be.visible');

        // Verify job details in the row
        cy.get('tr').within(() => {
          cy.contains('#73').should('be.visible');
          cy.contains('ddtest').should('be.visible');
          cy.contains('03/07/2025 23:15').should('be.visible');
          cy.contains('03/07/2025 23:20').should('be.visible');
          cy.contains('Completed').should('be.visible');
          cy.contains('Jhon Peter').should('be.visible');
          cy.contains('N/A').should('be.visible');
          cy.contains('Loaner Car').should('be.visible');
        });
      });

      // Click on the "close" button
      cy.get('#customerJobsModal .btn.btn-secondary')
      .scrollIntoView()
      .should('be.visible')
      .click();

      // Click on Customer Car document icon
      cy.get('button.btn.btn-link.doc-btn[data-doc-type="custom"]')
      .should('be.visible')
      .within(() => {
        cy.get('i.fas.fa-file-contract')
          .should('be.visible')
          .click();
      });

      // Verify document viewer modal and expand button
      cy.get('.modal.fade.show#documentViewerModal')
      .should('be.visible')
      .within(() => {
        // Verify modal title
        cy.contains('Job #73 - Customer Car Documents').should('be.visible');
        
        // Verify document gallery
        cy.get('.document-gallery')
          .should('be.visible')
          .within(() => {
            // Verify document item with customer type
            cy.get('.document-item[data-type="customer"]')
              .should('be.visible')
              .within(() => {
                // Verify document image
                cy.get('.document-image')
                  .should('be.visible');
                
                // Verify document actions including expand button
                cy.get('.document-actions')
                  .should('be.visible')
                  .within(() => {
                    cy.get('.action-button.view-image')
                      .should('be.visible')
                      .find('.fas.fa-expand')
                      .should('exist');
                  });
                
                // Verify image name
                cy.contains('customerCar_1.jpg').should('be.visible');
              });
          });
      });

        
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