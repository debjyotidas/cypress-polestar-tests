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
  
    it('should navigate to calendar view page', () => {

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
    cy.get('div.dhx_scale_time_slot[data-slot-date="2025-02-23 11:00"]')
    .should('be.visible')
    .dblclick();

    // Verify the modal appears
    cy.get('.dhx_cal_light')
      .should('be.visible')
      .within(() => {
        // Verify modal title and content
        cy.get('.dhx_cal_ltitle .dhx_title')
          .should('contain', 'New Pickup and Delivery Job');

        // Verify the "Pickup" and "Delivery" options are visible 
        
        // Select Service Type (first dropdown)
        cy.get('div.dhx_cal_ltext.dhx_cal_select select')
          .first()
          .select('Pick Up');

        // Select Service Type (second dropdown)
        cy.get('div.dhx_cal_ltext.dhx_cal_select select')
          .eq(1)
          .select('Brake System Concern/Repair/Replace'); 

           // Enter Customer Name (text input)
        cy.get('.dhx_cal_ltext')
        .eq(3)  // Third section for Customer Name
        .type('testDAutomated');

      // Enter Customer Mobile
      cy.get('.dhx_cal_ltext')
        .eq(4)  // Fourth section for Mobile
        .type('8777278142');

      // Enter Customer Email
      cy.get('.dhx_cal_ltext')
        .eq(5)  // Fifth section for Email
        .type('testDAutomated@gmail.com');

       // Select Service Start Time
       cy.get('select[aria-label="Hour Minute"]')
       .eq(0)
         .select('11:15');
       
       cy.get('select[aria-label="Day"]')
       .eq(0)
         .select('23');

       cy.get('select[aria-label="Month"]')
       .eq(0)
         .select('February');

       cy.get('select[aria-label="Year"]')
       .eq(0)
         .select('2025');
   
           // Select a driver
           cy.get('div.dhx_cal_ltext.dhx_cal_select select')
             .eq(2)  // Adjust index based on your form's structure
             .select('Test Driver');
   
           // Select Loaner Model
           cy.get('div.dhx_cal_ltext.dhx_cal_select select')
             .eq(3)  // Adjust index based on your form's structure
             .select('Polestar 6');

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
        
          // Click Save button using data-action attribute
          cy.get('[data-action="dhx_save_btn"]')
            .should('be.visible')
            .click();
          
      });
    })
  })