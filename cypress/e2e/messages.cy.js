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
  
    it('should navigate to messages page', () => {

      //click on messages subitem
      cy.get('#messages_subitem').should('be.visible').click();

      cy.get('#messages-content')
      .should('be.visible')

      cy.get('#createNewMessageBtn').click()

      // Verify the modal appears and proceed with form filling
      cy.get('.dhx_cal_light')
      .should('be.visible')
      .within(() => {
        
        // Select Service Type (first dropdown)
        cy.get('div.dhx_cal_ltext.dhx_cal_select select')
          .first()
          .select('Loaner Drop Off');

        // Select Service Type (second dropdown)
        cy.get('.dhx_cal_ltext textarea')
        .eq(1)
        .type('Mobile Repair/Replace',{force: true}); 

        // Enter Customer Name (text input)
        cy.get('.dhx_cal_ltext')
        .eq(3)  // Third section for Customer Name
        .type('MobileAutomatedTest');

        // Enter Customer Mobile
        cy.get('.dhx_cal_ltext')
            .eq(4)  // Fourth section for Mobile
            .type('2093060838');

        // Enter Customer Email
        cy.get('.dhx_cal_ltext')
            .eq(5)  // Fifth section for Email
            .type('testDAutomated@gmail.com');
    
        // Select Service Start Time
        cy.get('select[aria-label="Hour Minute"]')
        .eq(0)
            .select('10:10');
        
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
        //      .select('Test Driver');

        //    Select Loaner Model
        // cy.get('div.dhx_cal_ltext.dhx_cal_select select')
        //     .eq(2)  // Adjust index based on your form's structure
        //     .select('Test Vehicle').eq(0);

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
    
      
      // Find and click the search input
        // cy.get('#messageSearch')
        // .should('be.visible')
        // .click()
        // .type('tes');

        // // Wait for table to filter
        // cy.get('#messages-table')
        // .should('be.visible');

        // // Find and click Messages button for testDDD
        // cy.contains('tr', 'testDDD')
        // .within(() => {
        //     cy.get('button.btn.btn-primary.btn-sm')
        //     .contains('Messages')
        //     .should('be.visible')
        //     .click();
        // });

        // Verify modal opens and check its contents
       
        cy.get('#myModalAlert_messageModule')
        .should('be.visible')
        .within(() => {
        // Verify modal header
        cy.contains('MobileAutomatedTest');

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

                  // Find and click the search input
        cy.get('#messageSearch')
        .should('be.visible')
        .click()
        .type('PUNAMTEST');

        // Wait for table to filter
        cy.get('#messages-table')
        .should('be.visible');

        // Find and click Messages button for testDDD
        // cy.contains('tr', 'PUNAMTEST')
        // .within(() => {
        //     cy.get('button.btn.btn-primary.btn-sm')
        //     .contains('Messages')
        //     .should('be.visible')
        //     .click();
        // });

        // Find and click View Messages for PUNAMTEST
        cy.get('a.message-view-link[onclick*="PUNAMTEST"]')
          .should('be.visible')
          .click();

        // Verify modal opens and check its contents
       
        cy.get('#myModalAlert_messageModule')
        .should('be.visible')
        .within(() => {
        // Verify modal header
        cy.contains('PUNAMTEST');

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