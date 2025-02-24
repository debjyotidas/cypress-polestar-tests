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
  
    it('should navigate to reports page', () => {

      //click on Reports subitem
      cy.get('#reports_subitem').should('be.visible').click();

      cy.get('#reports-content')
      .should('be.visible')

      // Click on Today's Appointments card
    cy.get('div.report-card.clickable[data-timeframe="today"]')
    .should('be.visible')
    .click();

    // Wait for the table to load   
    cy.get('#job-details-content')
    .should('be.visible')

    cy.get('#back-to-reports').click();

    // Wait a bit and then click on This Week's Appointments
    cy.wait(1000); // Wait for any potential data loading
    cy.get('div.report-card.clickable[data-timeframe="week"]')
        .should('be.visible')
        .click();

    cy.get('#job-details-content')
    .should('be.visible')

    cy.get('#back-to-reports').click();

    // Wait a bit and then click on This Month's Appointments
    cy.wait(1000); // Wait for any potential data loading
    cy.get('div.report-card.clickable[data-timeframe="month"]')
        .should('be.visible')
        .click();   

    cy.get('#job-details-content')
    .should('be.visible')

    cy.get('#back-to-reports').click();

    cy.intercept('GET', '**/fetchjobs.php*').as('fetchJobs');

    // Select export format
    cy.get('#exportFormat')
      .should('be.visible')
      .select('excel')
      .should('have.value', 'excel');

    // Select timeframe
    cy.get('#timeframeSelect')
      .should('be.visible')
      .select('week')
      .should('have.value', 'week');

    // Optional: Click export button
    cy.get('#exportButton')
      .should('be.visible')
      .click();

      // Wait for and verify the API response
    cy.wait('@fetchJobs').then((interception) => {
        // Verify status code
        expect(interception.response.statusCode).to.equal(200);
        
        // Verify response structure
        expect(interception.response.body).to.have.property('jobs');
        
        // Verify jobs data
        expect(interception.response.body.jobs).to.be.an('array');
        
        // Optional: Verify specific job properties
        interception.response.body.jobs.forEach(job => {
            expect(job).to.have.property('jobId');
            expect(job).to.have.property('jobName');
            expect(job).to.have.property('customerId');
            expect(job).to.have.property('mobileId');
            expect(job).to.have.property('serviceId');
            expect(job).to.have.property('jobCreationTime');
            expect(job).to.have.property('plannedLoanerId');
            expect(job).to.have.property('loanerCarPic1', null);
            expect(job).to.have.property('loanerCarPic2', null);
            expect(job).to.have.property('loanerCarPic3', null);
            expect(job).to.have.property('loanerCarPic4', null);
            expect(job).to.have.property('customerCarPic1', null);
            expect(job).to.have.property('customerCarPic2', null);
            expect(job).to.have.property('customerCarPic3', null);
            expect(job).to.have.property('customerCarPic4', null);
            expect(job).to.have.property('active');
            expect(job).to.have.property('linked');
        });
      });
      
    })
  })