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
  
    it('should navigate to settings page', () => {
      // Add wait for element to be interactable
      cy.get('#settings_subitem').should('be.visible').click();
      
      // Add assertions with retry-ability
      cy.get('.settings-submenu')
        .should('be.visible')
        .should('have.css', 'display', 'block');
      
      cy.get('#dealership-cutoff-subitem')
        .scrollIntoView()
        .should('be.visible')
        .click();
      
      cy.get('#dealership-cutoff-content')
        .should('be.visible')
        .should('have.css', 'display', 'block');
  
      // Select times with proper waiting
      cy.get('#pickUp-cutoffStart')
        .should('be.visible')
        .select('10:00 AM');
  
      cy.get('#pickUp-cutoffEnd')
        .should('be.visible')
        .select('12:00 PM');
  
      cy.get('#delivery-cutoffStart')
        .should('be.visible')
        .select('1:00 PM');
  
      cy.get('#delivery-cutoffEnd')
        .should('be.visible')
        .select('5:00 PM');

    // Click on toggle button
    cy.get('.toggle-inner').eq(0).click();

    // Verify the badge status changes to "Inactive"
    cy.get('.status-badge')
      .should('be.visible')
      .and('contain.text', 'Inactive');

     // Click on toggle button
     cy.get('.toggle-inner').eq(0).click();

     // Verify the badge status changes to "Active"
     cy.get('.status-badge')
       .should('be.visible')
       .and('contain.text', 'Active');

    //click on calendar
    cy.get('#toggleLimitEvents').click();

    cy.get('#dailyLimit').should('be.visible');

    cy.get('#monday-limit').clear().type('3');

    cy.get('#tuesday-limit').clear().type('4');

    // Click on the "Save" button
    cy.get('.submit-dealer').click();

    // Wait for the SweetAlert2 modal and click the "OK" button
    cy.get('.swal2-confirm').should('be.visible').click();

    cy.get('#settings_subitem').should('be.visible').click();

    //click on calendar
    cy.get('#toggleLimitEvents').click();

    cy.get('#dailyLimit').should('not.be.visible');

    //click on calendar
    cy.get('#toggleLimitEvents').click();

    cy.get('#dailyLimit').should('be.visible');

    cy.get('#monday-limit').should('have.value', '3');
    cy.get('#tuesday-limit').should('have.value', '4');


    // Scroll up and click on timezone
    cy.get('#timezone-subitem').scrollIntoView().click();

    //modal should be visible
    cy.get('#timezoneModal').should('be.visible');

    // Select the desired timezone radio button
    cy.get('input#gmt-7').check();

    // Click on the "Update Settings" button
    cy.get('#timezoneModal').should('be.visible');

    // Click on the "Update Settings" button
    cy.get('#updateTimezone').click();


    });
})
