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
  
    it('should navigate to loaner inventory view page', () => {

        //click on map view subitem
        cy.get('#loaner_inventory_subitem').should('be.visible').click();

        cy.get('#loaner-inventory-content')
        .should('be.visible')

        cy.get('#add-vehicle-btn')
        .should('be.visible')
        .click();

        cy.get('#addVehicleModal')
        .should('be.visible');

        // Fill out the form
        cy.get('#vehicle-name')
        .should('be.visible')
        .type('Test Vehicle',{force: true});
        cy.wait(2000);

        cy.get('#vehicle-model')
            .should('be.visible')
            .type('Model X');

        cy.get('#vehicle-mileage')
            .should('be.visible')
            .type('5000');

        cy.get('#vehicle-age')
            .should('be.visible')
            .type('2');

        cy.get('#vehicle-number')
            .should('be.visible')
            .type('VH-1234');

        cy.get('#added-date')
            .should('be.visible')
            .type('2024-02-19');

             // Click Add Vehicle (Submit) button
        cy.get('#addVehicleModal')
        .should('be.visible')
        .within(() => {
        cy.get('button.btn.btn-primary.submit')
            .contains('Add Vehicle')
            .click();
        });

    // If needed, click Close button
        cy.get('#addVehicleModal')
            .should('be.visible')
            .within(() => {
            cy.get('button.btn.btn-secondary[data-dismiss="modal"]')
                .contains('Close')
                .click();
            });

            // Find the search input within the loaner inventory table filter
        cy.get('#loaner-inventory-table_filter input.form-control.form-control-sm')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Search inventory...')
            .type('Test Vehicle');

        // Verify search results
        cy.get('#loaner-inventory-table')
            .should('be.visible')
            .within(() => {
            // Verify the vehicle appears in results
            cy.contains('td', 'Test Vehicle');
            cy.contains('td', 'Model X');
            cy.contains('td', 'VH-1234');
            });

            // Approach 1: Use scrollIntoView on the table cell containing the edit icon
            cy.get('td:last-child').first()
            .scrollIntoView({ ensureScrollable: false })
            .within(() => {
            cy.get('i.fas.fa-edit.edit-icon').first()
                .should('be.visible')
                .click();
            });

    // Verify edit modal appears with correct data
    cy.get('#editVehicleModal')
        .should('be.visible')
        .within(() => {
        // Verify all pre-filled fields
        cy.get('#edit-vehicle-name')
            .should('have.value', 'Test Vehicle');

        cy.get('#edit-vehicle-model')
            .should('have.value', 'Model X');

        cy.get('#edit-vehicle-mileage')
            .should('have.value', '5000');

        cy.get('#edit-vehicle-age')
            .should('have.value', '2');

        cy.get('#edit-vehicle-number')
            .should('have.value', 'VH-1234');
        })

    // Make edits in the modal
    cy.get('#editVehicleModal')
      .should('be.visible')
      .within(() => {
        // Edit Vehicle Name
        cy.get('#edit-vehicle-name')
          .should('be.visible')
          .clear()
          .type('Updated Test Vehicle');

        // Edit Vehicle Model
        cy.get('#edit-vehicle-model')
          .should('be.visible')
          .clear()
          .type('Model Y');

        // Edit Vehicle Mileage
        cy.get('#edit-vehicle-mileage')
          .should('be.visible')
          .clear()
          .type('6000');

        // Click Save Changes button
        cy.get('#save-edit-vehicle')
          .click();
      })

      cy.get('#loaner-inventory-table_filter input.form-control.form-control-sm')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Search inventory...')
      .clear()
      .type('Test Ve');

    // Click Decommission button
    cy.get('button.btn.btn-sm.btn-danger.decommission-btn').first()
      .should('be.visible')
      .contains('Decommission')
      .click();

    // Handle the confirmation modal
    cy.get('.swal2-modal')
      .should('be.visible')
      .within(() => {
        // Verify confirmation message
        cy.contains('Are you sure?');
        // Click Yes, decommission it!
        cy.get('.swal2-confirm')  // Updated class name
          .contains('Yes, decommission it!')
          .click();
      });

     // Wait for success modal
     cy.get('.swal2-modal')
     .should('be.visible');
   
   cy.contains('Decommissioned!')
     .should('be.visible');
   
   cy.contains('Loaner has been decommissioned successfully.')
     .should('be.visible');

   // Click OK on success modal
   cy.get('.swal2-confirm')
     .contains('OK')
     .click();

   // Verify vehicle status updated in table
   cy.get('#loaner-inventory-table')
     .should('contain', 'Decommissioned');

    })
  })