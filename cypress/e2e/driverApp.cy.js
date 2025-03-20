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
  
    it('should be able to view calendar view and title should be Calendar', () => {
       //click on map view subitem
       cy.get('#calendar_subitem').should('be.visible').click();

       cy.get('#calendar-content')
       .should('be.visible')

       // Verify initial heading is "Pick up/Drop off Service"
        cy.get('.page-heading').should('contain', 'Pick up/Drop off Service');

        // Click on Mobile Service radio button
        cy.get('.toggle-button').click();
        cy.wait(1000);

        // Verify heading changes to "Mobile Service"
        cy.get('.page-heading').should('contain', 'Mobile Service');

        // Click again to switch back
        cy.get('.toggle-button').click();
        cy.wait(1000);

        // Verify heading changes back to "Pick up/Drop off Service"
        cy.get('.page-heading').should('contain', 'Pick up/Drop off Service');
        
        // Double click on the 11:00 time slot
        cy.get('div.dhx_scale_time_slot[data-slot-date="2025-03-09 13:00"]')
        .scrollIntoView()
        .should('be.visible')
        .dblclick();

            // Verify the modal appears
        cy.get('.dhx_cal_light')
        .should('be.visible')
        .within(() => {
                // Verify modal title and content
                cy.get('.dhx_cal_ltitle .dhx_title')
                  .should('contain', 'New Pickup and Delivery Job');

                // Select Service Type (first dropdown)
                cy.get('div.dhx_cal_ltext.dhx_cal_select select')
                .first()
                .select('Loaner Drop Off');
      
              // Select Service Type
              cy.get('.dhx_cal_ltext textarea')
                .eq(1)
                .type('Brake System Concern/Repair/Replace',{force: true}); 

                // Enter Customer Name (text input)
              cy.get('.dhx_cal_ltext')
              .eq(3)  // Third section for Customer Name
              .type('testDDAutomatedTest');

            // Enter Customer Mobile
            cy.get('.dhx_cal_ltext')
              .eq(4)  // Fourth section for Mobile
              .type('8777278900');

            // Enter Customer Email
            cy.get('.dhx_cal_ltext')
              .eq(5)  // Fifth section for Email
              .type('testDDAutomated@gmail.com');

                  // Select Service Start Time
            cy.get('select[aria-label="Hour Minute"]')
            .eq(0)
              .select('10:15');
            
            cy.get('select[aria-label="Day"]')
            .eq(0)
              .select('9');

            cy.get('select[aria-label="Month"]')
            .eq(0)
              .select('March');

            cy.get('select[aria-label="Year"]')
            .eq(0)
              .select('2025');
    
            // Select a driver
            cy.get('div.dhx_cal_ltext.dhx_cal_select select')
              .eq(1)  // Adjust index based on your form's structure
              .select('Tim');
    
            // Select Loaner Model
            // cy.get('div.dhx_cal_ltext.dhx_cal_select select')
            //   .eq(2)  // Adjust index based on your form's structure
            //   .select('Polestar 6');

              // Enter Customer Address (text input)
            cy.get('div.dhx_cal_ltext')
            .eq(6)  // Fourth input field
            .type('San Ramon');

            // Wait for suggestions and click the third option
            cy.get('.ui-autocomplete-input')
              .should('be.visible')
              .type('{downarrow}') // Press down arrow twice to reach third option
              .type('{downarrow}')
              .type('{enter}'); // Press enter to select

        })

        //visit the driver app url
      cy.visit('https://www.tracking1.matrack.io/gpstracking/PoleStarApp/client/maps/index2_new.php?auth=91edc92ddc4c2b748c7bf06ab323b4c5');

        cy.get('#calendarViewBtn').should('exist').click();
        cy.get('#calendarViewContainer').should('be.visible');

        //click on title
        cy.get('#tileViewBtn').should('exist').click();

        cy.get('#jobCardsContainer').should('be.visible');

        // Click on search box and type "test"
        cy.get('#jobSearch')
        .should('be.visible')
        .click()
        .clear()
        .type('testDDAutomatedTest');
        
        // Wait for search results to appear
        cy.wait(1000);

        // Verify the testDAutomated card is visible
        cy.get('.card .card-body .customerName')
          .contains('testDDAutomatedTest')
          .should('be.visible');

          // Find the card with customer name and verify its badge
          cy.get('.card')
          .contains('.card-body .customerName', 'testDDAutomatedTest')
          .closest('.card')  // Go up to the parent card
          .within(() => {
            // Verify the badge text is "Drop Off"
            cy.get('span.badge')
              .should('be.visible')
              .and('have.text', 'New Job').click();
          });

          // Verify the job details modal appears and has correct content
        cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
        .should('be.visible')
        .within(() => {
          // Verify customer name in modal
          cy.get('.customer-name')
            .should('contain', 'testDDAutomatedTest');
          
          // Verify location
          cy.get('.address')
            .should('contain', 'San Ramon');
          
          // Verify task assigned
          cy.get('.job-assignment')
            .should('contain', 'Loaner Drop Off');

          // Verify the Reject button is visible (using button text instead of class)
          cy.get('button')
            .contains('Reject')
            .should('be.visible');

            // Verify the Accept button is visible (using button text instead of class)
          cy.get('button')
          .contains('Accept')
          .should('be.visible').click();
        });

        // Wait for the status alert modal to be visible and click close
        cy.get('#statusAlertModal.modal.fade.show')
        .should('be.visible')
        .within(() => {
          // Find and click the close button
          cy.get('button.btn.btn-secondary')
            .contains('Close')
            .click();
        });

        cy.get('#statusAlertModal')
        .should('have.class', 'show')
        .find('.modal-footer button.btn.btn-secondary')
        .contains('Close')
        .click();

        // Click on search box and type "test"
        cy.get('#jobSearch')
        .should('be.visible')
        .click()
        .clear()
        .type('testDDAutomatedTest');
        
        // Wait for search results to appear
        cy.wait(8000);

        // Verify the testDAutomated card is visible
        cy.get('.card .card-body .customerName')
        .contains('testDDAutomatedTest')
        .should('be.visible')
        .parents('.card')  // Navigate up to the card parent
        .within(() => {
          // Verify that the badge has text "Start Job"
          cy.get('span.badge')
            .should('be.visible')
            .and('have.text', 'Start Job');
        });

        cy.get('.card .card-body .customerName')
          .contains('testDDAutomatedTest')
          .click();

          //verify modal appears
          cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
          .should('be.visible')
          .within(() => {
            // Verify customer name in modal
            cy.get('.customer-name')
              .should('contain', 'testDDAutomatedTest');
            
            // Verify location
            cy.get('.address')
              .should('contain', 'San Ramon');

            // fill the details
            cy.get('#mileageInput')
            .should('be.visible')
            .clear()
            .type('1500');

            // Enter fuel level
            cy.get('#fuelLevelInput')
            .should('be.visible')
            .clear()
            .type('75');
            
            // Verify the Reject button is visible (using button text instead of class)
            cy.get('button')
              .contains('Cancel')
              .should('be.visible');
  
            // Verify the Accept button is visible (using button text instead of class)
            cy.get('button')
            .contains('Start Job')
            .should('be.visible').click();
          });

          cy.wait(6000);

        // Click on search box and type "test"
        cy.get('#jobSearch')
        .should('be.visible')
        .click()
        .clear()
        .type('testDDAutomatedTest');
        
        // Wait for search results to appear
        cy.wait(2000);

        cy.get('.card .card-body .customerName')
          .contains('testDDAutomatedTest')
          .click();

        cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
        .should('be.visible')
        .within(() => {
          // Verify customer name in modal
          cy.get('.customer-name')
            .should('contain', 'testDDAutomatedTest');
          
          // Verify location
          cy.get('.address')
            .should('contain', 'San Ramon');
          
          // Verify task assigned
          cy.get('.job-assignment')
            .should('contain', 'Loaner Drop Off');

            // Verify the Accept button is visible (using button text instead of class)
          cy.get('button')
          .contains('Proceed to Upload Pics')
          .should('be.visible').click();
        });

        cy.get('#startJobModal')
        .should('be.visible');

        // First click on Loaner Car tab (if not already active)
        cy.get('#loanerToggle')
        .should('be.visible')
        .click();

        cy.get('#uploadLoanerPictures').click();

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

      // Then click on Customer Car tab
      cy.get('#customerToggle')
      .should('be.visible')
      .click();

      // Upload files for Customer Car
      cy.get('#uploadCustomerPictures')  // Adjust ID if different
      .should('exist')
      .selectFile([
        'cypress/fixtures/dl.png',
          'cypress/fixtures/insurance.png',
          'cypress/fixtures/service.png',
          'cypress/fixtures/agreement.png'
      ], { 
        force: true,
        multiple: true 
      });

      // Then click on Insurance Pics tab
      cy.get('#insuranceToggle')
      .should('be.visible')
      .click();

      // Upload files for Customer Car
      cy.get('#uploadInsurancePictures')  // Adjust ID if different
      .should('exist')
      .selectFile([
        'cypress/fixtures/dl.png',
          'cypress/fixtures/insurance.png',
          'cypress/fixtures/service.png',
          'cypress/fixtures/agreement.png'
      ], { 
        force: true,
        multiple: true 
      });

        cy.get('#submitStartJob')
        .should('be.visible')  
        .click();

        //confirm pics and agreement
        cy.get('#confirmPicsModal')
        .should('be.visible');

        cy.get('#proceedToOTP')
        .should('be.visible')
        .click();

        // Verify the OTP modal appears
        cy.get('.modal.fade.mobile-job-modal.jobCloseModal2')
        .should('be.visible')
        
        // Intercept the OTP API call
        cy.intercept('POST', '**/polestarDesign/SMSalerts/sendOtp.php').as('getOTP');

        // Wait for the API call to complete
        cy.wait('@getOTP').then((interception) => {
          // Extract the OTP from the response
          const otp = interception.response.body.otp_verify;
          
          // Type the OTP into the input field
          cy.get('#inpCode')
            .should('be.visible')
            .clear()
            .type(otp);
        });

        // After typing the OTP, click the submit button
        cy.get('.jobCloseModal2 button.btn.btn-primary.w-100')
        .contains('Submit')
        .should('be.visible')
        .click();
        

        cy.get('#statusAlertModal')
        .should('be.visible')
        .within(() => {
          cy.get('.btn.btn-secondary')
          .contains('Close')
          .click();
        });

        cy.wait(2000);

        //click on My jobs
        cy.get('#closedJobsBtn')
        .should('be.visible')
        .click();

        cy.wait(4000);

        cy.get('#jobCardsContainer')
        .should('be.visible');

        // Click on search box and type "test"
        cy.get('#jobSearch')
        .should('be.visible')
        .click()
        .type('test');
        
        // Wait for search results to appear
        cy.wait(2000);

        // Verify the testDAutomated card is visible
        cy.get('.card .card-body .customerName')
          .contains('testDDAutomatedTest')
          .should('be.visible');
        
        cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps.php#');

        cy.get('#in_service_subitem')
        .should('be.visible')
        .click();

        cy.get('#in-service-content')
        .should('be.visible');

        cy.get('#inservice-tab')
        .should('be.visible')
        .click();

        cy.get('#in-service-table')
        .should('be.visible');
        
        // Click on Scheduled Jobs tab first
        cy.get('#scheduled-tab')
          .should('be.visible')
          .click();

        // Wait for the scheduled table to be visible
        cy.get('#scheduled-table')
          .should('be.visible');

        // Search for testDDAutomatedTest in the scheduled jobs table
        cy.get('#scheduled-table_filter input[type="search"]')
          .should('be.visible')
          .clear()
          .type('testDDAutomatedTest');

        // Verify testDDAutomatedTest appears in the Customer Name column
        cy.get('#scheduled-table tbody')
          .find('td')
          .contains('testDDAutomatedTest')
          .should('be.visible');

        // Click on the "Change to Instore Loaner Pick Up" button using specific selectors
        cy.get('button.btn.btn-warning.status-button[data-target="instoreDropoff"]')
          .should('be.visible')
          .click();

        // Verify SweetAlert2 modal appears and contains correct text
        cy.get('.swal2-popup.swal2-modal.swal2-icon-question.swal2-show')
          .should('be.visible')
          .within(() => {
            // Verify modal title
            cy.get('.swal2-title')
              .should('contain', 'Change Status');
        
            // Click the Yes button
            cy.get('.swal2-confirm')
              .should('be.visible')
              .click();
          });

        // Wait for the SweetAlert to close
        cy.get('.swal2-popup').should('not.exist');

        // Add a small wait to ensure the backend process completes
        cy.wait(2000);

        // Reload the page
        cy.reload();

        // Wait for the page to stabilize after reload
        cy.get('body').should('be.visible');

        // Wait for the URL to be correct
        cy.url().should('include', 'MatrackDemo/maps/index2_ps.php');

        // Make sure we're on the In Service tab
        cy.get('#in_service_subitem')
          .should('be.visible')
          .click();

        // Wait for the content to load
        cy.get('#in-service-content')
          .should('be.visible');

        // Click on Scheduled Jobs tab again after reload
        cy.get('#scheduled-tab')
          .should('be.visible')
          .click();

        // Wait for the scheduled table to be visible
        cy.get('#scheduled-table')
          .should('be.visible');

        // Re-search for the test entry to verify the status change
        cy.get('#scheduled-table_filter input[type="search"]')
          .should('be.visible')
          .clear()
          .type('testDDAutomatedTest');

    })
  })