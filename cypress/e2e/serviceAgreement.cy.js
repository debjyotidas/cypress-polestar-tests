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
      //  cy.url().should('include', 'MatrackDemo/maps/index2_ps.php');
      
      // Verify key elements are present - fixed syntax
      cy.get('#settings_subitem').should('exist');
      cy.get('#jobs_subitem').should('exist');
      cy.get('#loaner_inventory_subitem').should('exist'); // Fixed syntax
      cy.get('#customer_records_subitem').should('exist'); // Fixed syntax
    });
  
    it('should navigate to service agreement view page', () => {

        //click on map view subitem
        cy.get('#service-agreement-subitem').should('be.visible').click();

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
            .select('Loaner Pick Up');

        // Select Service Type (second dropdown)
        // cy.get('div.dhx_cal_ltext.dhx_cal_select select')
        //     .eq(1)
        //     .select('Brake System Concern/Repair/Replace'); 

        cy.get('div.dhx_cal_ltext')
        .eq(2)
        .type('Brake System Concern/Repair/Replace'); 

            // Enter Customer Name (text input)
        cy.get('.dhx_cal_ltext')
        .eq(3)  // Third section for Customer Name
        .type('testAutomated');

        // Enter Customer Mobile
        cy.get('.dhx_cal_ltext')
        .eq(4)  // Fourth section for Mobile
        .type('8777278149');

        // Enter Customer Email
        cy.get('.dhx_cal_ltext')
        .eq(5)  // Fifth section for Email
        .type('testAutomated@gmail.com');

        // Select Service Start Time
        cy.get('select[aria-label="Hour Minute"]')
        .eq(0)
        .select('11:20');
        
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
            .select('Test Driver');
    
            // Select Loaner Model
            cy.get('div.dhx_cal_ltext.dhx_cal_select select')
            .eq(2)  // Adjust index based on your form's structure
            .select('Polestar 8');

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
            })
    })
})