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
  
    it('should navigate to mobile vehicle page', () => {

        // Click on Mobile Service radio button
        cy.get('#calendarTypeDropdown').select('Mobile Service');
        cy.wait(1000);

        //click on mobile vehicle subitem
        cy.get('#mobile_vehicle_subitem').should('be.visible').click();

        cy.get('#mobile-vehicle-content')
        .should('be.visible')

        //click on add service button
        cy.get('#add-mobile-vehicle-btn').should('be.visible').click();

        //modal should be visible
        cy.get('#addMobileVehicleModal')
        .should('be.visible')

         // Fill out the vehicle form
         cy.get('#mobile-vehicle-name')
         .type('Test Vehicle',{force:true})
         cy.wait(1000);
       
       cy.get('#mobile-vehicle-capacity')
         .type('25')
       
       cy.get('#mobile-vehicle-max-capacity')
         .type('50')

        //click on save button
        cy.get('#addMobileVehicleModal .submit')
        .should('be.visible')
        .click();

        // Verify the vehicle is added
        cy.get('#mobile-vehicle-table')
        .should('be.visible')
        .and('contain', 'Test Vehicle');

        // // Additional verification for other fields if needed
        // cy.get('#mobile-vehicle-table tbody tr')
        // .contains('Test Vehicle')
        // .parent('tr')
        // .within(() => {
        //     cy.contains('25')  // Verify capacity
        //     cy.contains('50')  // Verify max capacity
        //     cy.contains('Vacant') // Verify status
        // });

        // Click the edit icon for Test Vehicle
        cy.get('#mobile-vehicle-table tbody')
        .contains('td', 'Test Vehicle')  // Find the cell containing Test Vehicle
        .parent('tr')  // Get the parent row
        .find('.fas.fa-edit.edit-icon[data-name="Test Vehicle"]')  // Find edit icon with specific data-name
        .click();

        // Verify edit modal is visible
        cy.get('#editMobileVehicleModal')
        .should('be.visible');

        // Edit the form fields with new values
        cy.get('#editMobileVehicleModal')
        .within(() => {
            // Clear existing values and type new ones
            cy.get('#mobile-vehicle-name')
                .clear()
                .type('Updated Test Vehicle',{force:true});
                cy.wait(1000);
            
            cy.get('#mobile-vehicle-capacity')
                .clear()
                .type('35');
            
            cy.get('#mobile-vehicle-max-capacity')
                .clear()
                .type('75');

            // Click Save changes button
            cy.get('.btn.btn-primary.submit').click();
        });

        // Verify the updated values in the table
        cy.get('#mobile-vehicle-table tbody tr')
        .contains('Updated Test Vehicle')
        .parent('tr')
        .within(() => {
            cy.contains('35')  // Verify updated capacity
            cy.contains('75')  // Verify updated max capacity
            cy.contains('Vacant') // Status should remain Vacant
        });

        // Click the delete icon for Updated Test Vehicle
        cy.get('#mobile-vehicle-table tbody')
        .contains('td', 'Updated Test Vehicle')  // Find the cell containing Test Vehicle
        .parent('tr')  // Get the parent row
        .find('.fas.fa-trash.delete-icon[data-name="Updated Test Vehicle"]')  // Find delete icon with specific data-name
        .click();


        // Verify the vehicle is removed from the table
        cy.get('#mobile-vehicle-table tbody')
        .should('not.contain', 'Updated Test Vehicle');

        // Additional verification that the row is completely gone
        cy.get('#mobile-vehicle-table tbody tr')
        .each(($row) => {
            cy.wrap($row).should('not.contain', 'Updated Test Vehicle');
            cy.wrap($row).should('not.contain', '35'); // Capacity we set
            cy.wrap($row).should('not.contain', '75'); // Max capacity we set
        });

    })
  })