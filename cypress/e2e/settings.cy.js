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
      .select('13:00 PM');

    cy.get('#delivery-cutoffEnd')
      .should('be.visible')
      .select('15:00 PM');

    // Handle toggle with proper checks
    cy.get('#toggleLimitEvents')
      .should('be.visible')
      .then($checkbox => {
        if (!$checkbox.is(':checked')) {
          cy.wrap($checkbox).click();
        }
      });

    // Verify checkbox state
    cy.get('#toggleLimitEvents').should('be.checked');

    // Handle input with proper waiting
    cy.get('#tuesday-limit')
      .should('be.visible')
      .clear()
      .type('1');

    // Click save with proper waiting
    cy.get('.submit-dealer')
      .should('be.visible')
      .click();

    //click on Users subitem
    cy.get('#settings_subitem').should('be.visible').click();
    cy.get('#users-subitem').should('be.visible').click();

    cy.get('#users-content')
      .should('be.visible')
      .should('have.css', 'display', 'block');

    //click on Add User button
    cy.get('#add-user-btn')
      .should('be.visible')
      .click();

    cy.get('#addUserModal')
      .should('be.visible')
      .should('have.css', 'display', 'block');

    cy.get('#addUsername')
      .should('be.visible')
      .click().type('AutoTestUser',{force: true});

    cy.get('#addUserEmail')
      .should('be.visible')
      .click().type('AutoTestUser@gmail.com',{force: true}  );

    cy.get('#addUserRole')
      .should('be.visible')
      .select('Admin',{force: true});

    cy.get('#save-add-driver')
      .click()

      // Handle error dialog
    cy.get('button.swal2-confirm.swal2-button-small.swal2-styled')
    .should('be.visible')
    .and('contain.text', 'OK')
    .click();

    // Click close button on the add user modal
    cy.get('#addUserModal button.close[data-dismiss="modal"]')
      .should('be.visible')
      .click();
    
    // Wait for modal to close
    cy.wait(500);

    // Verify user appears in table
    cy.get('#users-table_wrapper')
      .should('be.visible');

    // Search for the new user using a more specific selector
    cy.get('#users-table_wrapper input[type="search"]')  // More specific selector
    .should('be.visible')
    .type('AutoTestUser');

    // Verify the user data exists in the table
    cy.get('#users-table_wrapper')
      .should('contain', 'AutoTestUser')
      .and('contain', 'AutoTestUser@gmail.com')
      .and('contain', 'Admin');

      //click on Drivers subitem
    cy.get('#settings_subitem').should('be.visible').click();
    cy.get('#drivers-subitem').should('be.visible').click();

    cy.get('#drivers-content')
      .should('be.visible')
      .should('have.css', 'display', 'block');

      //click on Add Driver button
    cy.get('#add-driver-btn')
      .should('be.visible')
      .click();

    cy.get('#addDriverModal')
      .should('be.visible')
      .should('have.css', 'display', 'block');

    cy.get('#driver-name')
      .should('be.visible')
      .click().type('AutoTestDriver',{force: true});

    cy.get('#driver-contact')
      .should('be.visible')
      .click().type('8777267654',{force: true});

    cy.get('#driver-imei')
      .should('be.visible')
      .click().type('798645312869',{force: true});

    cy.get('#save-driver-btn')
      .click()

      // Click close button on the add user modal
    cy.get('#addDriverModal button.close[data-dismiss="modal"]')
    .should('be.visible')
    .click();

    // Search for the new user using a more specific selector
    cy.get('#drivers-table_wrapper input[type="search"]')  // More specific selector
    .should('be.visible')
    .type('AutoTestDriver');
      
})
})