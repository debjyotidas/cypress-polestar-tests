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
    
    cy.get('#users-subitem')
      .should('be.visible')
      .click();

    cy.get('#users-content')
      .should('be.visible')
      .should('have.css', 'display', 'block');

    //click on add user button
    cy.get('#add-user-btn').should('be.visible').click();

    //verify add user modal
    cy.get('#addUserModal').should('be.visible');

    //type in first name
    cy.get('#addUserFirstName').type('JohnTest');

    //type in last name
    cy.get('#addUserFirstName').type('Test');

    //type in usrname
    cy.get('#addUsername').type('johnautomated');

    //type in password
    cy.get('#addUserPassword').type('Test@12345');

    //type email
    cy.get('#addUserEmail').type('testAutomated@gmail.com');

    cy.get('#addUserRole').select('Admin');

    //click on save button
    cy.get('#save-add-user').click();


    //click on drivers subitem
    cy.get('#drivers-subitem').should('be.visible').click();

    //click on add driver button
    cy.get('#add-driver-btn').should('be.visible').click();

    //modal should be visible
    cy.get('#addDriverModal').should('be.visible');

    //type in driver name
    cy.get('#addDriverModal').type('TestAutomated');

    //enter contact number
    cy.get('#driver-contact').type('1234567890');

    //enter imei
    cy.get('.select2-selection.select2-selection--single').select('0863000081');

    //enter email address
    cy.get('#driver-email').type('testAutomated@gmail.com');

    //click on add driver
    cy.get('#save-driver-btn').click();


      
})
})