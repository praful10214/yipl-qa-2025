describe('MyNotes App Login Tests', () => {
  let loginData;
  
  before(() => {
    cy.fixture('loginData').then((data) => {
    loginData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should keep login button disabled when both fields are empty', () => {
    cy.get('#email').clear();
    cy.get('#password').clear();
    cy.get('[data-testid="login-submit"]').should('be.visible');
  });

  it('should show required field errors when trying to submit empty fields', () => {
    cy.get('#email').clear();
    cy.get('#password').clear();
    cy.get('[data-testid="login-submit"]').click({ force: true });
    cy.contains('Email address is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });


  it('should show error message for multiple invalid email formats', () => {
    loginData.invalidEmailFormats.forEach(invalidEmail => {
      cy.get('#email').clear().type(invalidEmail);
      cy.get('#password').clear().type(Cypress.env('validpassword'));
      cy.get('[data-testid="login-submit"]').click({ force: true });
      cy.contains('Email address is invalid').should('be.visible');
    });
  });

    it('should show error message for multiple invalid passwords', () => {
    loginData.invalidPasswordFormats.forEach(invalidPassword => {
      cy.get('#email').clear().type(Cypress.env('validemail'));
      cy.get('#password').clear().type(invalidPassword);
      cy.get('[data-testid="login-submit"]').click({ force: true });
      cy.contains('Password should be between 6 and 30 characters').should('be.visible');
    });
  });

  it('should log in successfully with valid credentials', () => {
    cy.loginUI(Cypress.env('validemail'), Cypress.env('validpassword'));
    cy.contains('Practice').should('be.visible');
  });

  it('should navigate to Forgot Password page', () => {
    cy.get('#forgotPasswordLink').click();
    cy.url().should('include', '/forgot-password');
  });

    it('should navigate to Create Account page', () => {
    cy.get('[data-testid="register-view"]').click();
    cy.url().should('include', '/register');
    });

 
});
