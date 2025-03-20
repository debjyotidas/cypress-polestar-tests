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
      
      cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps_as.php#');
      
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
            .type('mainJobAutomatedTest');
    
            // Enter Customer Mobile
            cy.get('.dhx_cal_ltext')
                .eq(4)  // Fourth section for Mobile
                .type('9777321211');
    
            // Enter Customer Email
            cy.get('.dhx_cal_ltext')
                .eq(5)  // Fifth section for Email
                .type('mainJobAutomatedTest@gmail.com');
        
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
    
            //    Select Loaner Model
            cy.get('div.dhx_cal_ltext.dhx_cal_select select')
                .eq(2)  // Adjust index based on your form's structure
                .select('Polestar8').eq(0);
    
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

            cy.wait(2000);

            // Click the close button using the scheduler icon class
            // cy.get('.dhx_cal_litle_close_btn.scheduler_icon_close')
            // .should('be.visible')
            // .click();

            // cy.wait(2000);

            cy.visit('https://www.tracking1.matrack.io/gpstracking/client/MatrackDemo/maps/index2_ps_as.php#');

            cy.get('.sidebar').realHover();

            cy.wait(2000); // Hover for 2 seconds

            // Click on the toggle button in the Calendar menu item
            // cy.get('.toggle-button')
            // .should('be.visible')
            // .click();

            cy.get('.sidebar').trigger('mouseleave', { force: true });  

            // cy.get('#calendar_subitem')
            // .should('be.visible')
            // .click();           
            
            // cy.get('#calendar-content')
            // .should('be.visible');

            cy.wait(2000);

            cy.get('#newServiceAgreement')
            .should('be.visible')
            .click();

            // cy.get('.dhx_scale_time_slot.dhx_scale_time_slot_hour_start[data-slot-date="2025-03-09 02:30"]', { timeout: 20000 })
            // .should('be.visible')
            // .click({ force: true })
            // .wait(500)
            // .dblclick({ force: true });

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
          .type('linkedJobAutomatedTest');
  
          // Enter Customer Mobile
          cy.get('.dhx_cal_ltext')
              .eq(4)  // Fourth section for Mobile
              .type('9647321211');
  
          // Enter Customer Email
          cy.get('.dhx_cal_ltext')
              .eq(5)  // Fifth section for Email
              .type('linkedJobAutomatedTest@gmail.com');
      
          // Select Service Start Time
          cy.get('select[aria-label="Hour Minute"]')
          .eq(0)
              .select('02:35');
          
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
          //    cy.get('div.dhx_cal_ltext.dhx_cal_select select')
          //      .eq(1)  // Adjust index based on your form's structure
          //      .select('Tom');
  
          //    Select Loaner Model
          // cy.get('div.dhx_cal_ltext.dhx_cal_select select')
          //     .eq(2)  // Adjust index based on your form's structure
          //     .select('TEST').eq(0);
  
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

        cy.get('#MobileBtn').should('exist').click();
        cy.get('#jobCardsContainer').should('be.visible');

        // Click on search box and type "test"
        cy.get('#jobSearch')
        .should('be.visible')
        .click()
        .clear()
        .type('mainJobAutomatedTest');

        // Wait for search results to appear
        cy.wait(1000);

        // Verify the mainJobAutomatedTest card is visible  
        cy.get('.card .card-body .customerName')
        .contains('mainJobAutomatedTest')
        .should('be.visible');

        // Find the card with customer name and verify its badge
        cy.get('.card') 
        .contains('.card-body .customerName', 'mainJobAutomatedTest')
        .should('be.visible');

        // Click on the card
        cy.get('.card')
        .contains('.card-body .customerName', 'mainJobAutomatedTest')
        .click();
            
        })

})