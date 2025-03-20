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
  
    it('should navigate to calendar view page', () => {
        
        cy.get('.sidebar').realHover();

        cy.wait(2000); // Hover for 2 seconds

        // Click on the toggle button in the Calendar menu item
        cy.get('.toggle-button')
          .should('be.visible')
          .click();

        // Verify the toggle state changed (if there's a visual indicator)
        cy.get('.fas.fa-toggle-on')
        .should('exist');

        cy.get('.sidebar').trigger('mouseleave', { force: true });
         
        // Click on calendar subitem
        cy.get('#calendar_subitem')
          .should('be.visible')
          .click();
  
        // Wait for calendar content and ensure it's fully loaded
        cy.get('#calendar-content')
          .should('be.visible');

        // Wait for the calendar to fully load
        cy.wait(2000);

        // Using the exact class name from the HTML structure
        cy.get('.dhx_scale_time_slot.dhx_scale_time_slot_hour_start[data-slot-date="2025-03-09 02:00"]', { timeout: 20000 })
          .should('be.visible')
          .click({ force: true })
          .wait(500)
          .dblclick({ force: true });

        // Verify the modal appears and proceed with form filling
        cy.get('.dhx_cal_light')
          .should('be.visible')
          .within(() => {
            // Verify modal title and content
            cy.get('.dhx_cal_ltitle .dhx_title')
            .should('contain', 'Mobile Service Job');
    
            // Verify the "Pickup" and "Delivery" options are visible 
            
            // Select Service Type (first dropdown)
            // cy.get('div.dhx_cal_ltext.dhx_cal_select select')
            //   .first()
            //   .select('Loaner Drop Off');
    
            // Select Service Type (second dropdown)
            cy.get('.dhx_cal_ltext textarea')
            .eq(1)
            .type('Mobile Repair/Replace',{force: true}); 
    
            // Enter Customer Name (text input)
            cy.get('.dhx_cal_ltext')
            .eq(3)  // Third section for Customer Name
            .type('MobileAutomatedTest2');
    
            // Enter Customer Mobile
            cy.get('.dhx_cal_ltext')
                .eq(4)  // Fourth section for Mobile
                .type('3093060838');
    
            // Enter Customer Email
            cy.get('.dhx_cal_ltext')
                .eq(5)  // Fifth section for Email
                .type('testDAutomated2@gmail.com');
        
            // Select Service Start Time
            cy.get('select[aria-label="Hour Minute"]')
            .eq(0)
                .select('02:10');
            
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
                 .select('Carl');
    
              //  Select Loaner Model
            cy.get('div.dhx_cal_ltext.dhx_cal_select select')
                .eq(2)  // Adjust index based on your form's structure
                .select('Polestar8');
    
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
        
            });

            //visit the driver app url
            cy.visit('https://www.tracking1.matrack.io/gpstracking/PoleStarApp/client/maps/index2_new.php?auth=91edc92ddc4c2b748c7bf06ab323b4c5');

            // cy.get('#MobileBtn').should('be.visible').click({force: true});
            
            // Click on the file icon
            cy.get('.fas.fa-file-alt').eq(1)
            .should('be.visible')
            .click();
            
            cy.get('#jobCardsContainer').should('be.visible');

            // Click on search box and type "test"
            cy.get('#jobSearch')
            .should('be.visible')
            .click()
            .clear()
            .type('MobileAutomatedTest2');

            // Wait for search results to appear
            cy.wait(1000);

            // Verify the MobileAutomatedTest2 card is visible
            cy.get('.card .card-body .customerName')
            .contains('MobileAutomatedTest2')
            .should('be.visible');

            // Find the card with customer name and verify its badge
          cy.get('.card')
          .contains('.card-body .customerName', 'MobileAutomatedTest2')
          .closest('.card')  // Go up to the parent card
          .within(() => {
            // Verify the badge text is "Drop Off"
            cy.get('span.badge')
              .should('be.visible')
              .and('have.text', 'New Job')
              .click();
          });

            // Verify the job details modal appears and has correct content
        cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
        .should('be.visible')
        .within(() => {
          // Verify customer name in modal
          cy.get('.customer-name')
            .should('contain', 'MobileAutomatedTest2');

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
        .type('MobileAutomatedTest2');

        // Wait for search results to appear
        cy.wait(8000);

        // Verify the testDAutomated card is visible
        cy.get('.card .card-body .customerName')
        .contains('MobileAutomatedTest2')
        .should('be.visible')
        .parents('.card')  // Navigate up to the card parent
        .within(() => {
          // Verify that the badge has text "Start Job"
          cy.get('span.badge')
            .should('be.visible')
            .and('have.text', 'Start Job');
        });

        cy.get('.card .card-body .customerName')
          .contains('MobileAutomatedTest2')
          .click();

          //verify modal appears
          cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
          .should('be.visible')
          .within(() => {
            // Verify customer name in modal
            cy.get('.customer-name')
              .should('contain', 'MobileAutomatedTest2');
            
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
        .type('MobileAutomatedTest2');

        // Wait for search results to appear
        cy.wait(2000);

        // Verify the testDAutomated card is visible
        cy.get('.card .card-body .customerName')
        .contains('MobileAutomatedTest2')
        .should('be.visible')
        .parents('.card')  // Navigate up to the card parent
        .within(() => {
          // Verify that the badge has text "Start Job"
          cy.get('span.badge')
            .should('be.visible')
            .and('have.text', 'In Progress');
        });

        cy.get('.card .card-body .customerName')
          .contains('MobileAutomatedTest2')
          .click();

          cy.get('.modal.fade.mobile-job-modal.show')  // Using stable class names from screenshot
        .should('be.visible')
        .within(() => {
          // Verify customer name in modal
          cy.get('.customer-name')
            .should('contain', 'MobileAutomatedTest2');
          
          // Verify location
          cy.get('.address')
            .should('contain', 'San Ramon');
          

            // Verify the Accept button is visible (using button text instead of class)
          cy.get('button')
          .contains('Proceed to Upload Pics')
          .should('be.visible').click();
        });

        cy.get('#startJobModal')
        .should('be.visible');

        // First click on Loaner Car tab (if not already active)
        cy.get('#customerToggle')
        .should('be.visible')
        .click();

        cy.get('#uploadCustomerPictures').click();

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

        

        // Verify service cost modal appears
        cy.get('.modal.fade.mobile-job-modal.show')
        .should('be.visible')

        // Verify the Add Service button exists
        cy.contains('+ Add Service')
          .should('be.visible');

        // Select Charging Issue from dropdown using visible text
        cy.get('select.form-control.service-select')
          .should('be.visible')
          .select('Charging Issue');  // Select by visible text

        // Enter amount 50 in the service amount field
        cy.get('input.form-control.service-amount')
          .should('be.visible')
          .clear()
          .type('50');

        // Verify the amount is entered correctly
        cy.get('input.form-control.service-amount')
          .should('have.value', '50');

        // Verify the total amount is displayed correctly
        cy.get('.total-amount')
          .should('be.visible')
          .within(() => {
            cy.get('#totalAmount')
              .should('be.visible')
              .and('have.text', '50.00');
          });

        cy.get('#addServiceBtn')
        .should('be.visible')
        .click();

        // Select Charging Issue from dropdown using visible text
        cy.get('select.form-control.service-select')
          .eq(1)
          .should('be.visible')
          .select('Charging Issue');  // Select by visible text

        // Enter amount 50 in the service amount field
        cy.get('input.form-control.service-amount')
          .eq(1)  
          .should('be.visible')
          .clear()
          .type('50');

        // Verify the amount is entered correctly
        cy.get('input.form-control.service-amount')
          .should('have.value', '50');

        // Verify the total amount is displayed correctly
        cy.get('.total-amount')
          .should('be.visible')
          .within(() => {
            cy.get('#totalAmount')
              .should('be.visible')
              .and('have.text', '100.00');
          });

          //add hrs
          cy.get('#totalHours')
          .should('be.visible')
          .clear()
          .type('4');

          //add minutes
          cy.get('#totalMinutes')
          .should('be.visible')
          .clear()
          .type('50');

          //click on submit
          cy.get('#submitServiceDetails')
          .should('be.visible')
          .click();

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

          // Verify job close modal appears and its structure
          cy.get('.modal.fade.mobile-job-modal.jobCloseModal2.show')
            .should('be.visible')
            .within(() => {
              // Click the submit button
              cy.get('.btn.btn-primary.w-100')
                .should('be.visible')
                .and('contain', 'Submit')
                .click();
            });
    
    })
  })