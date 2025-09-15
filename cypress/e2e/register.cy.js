describe('Register Page Tests', () => {
  let registerData;

  before(() => {
    cy.fixture('registerData').then((data) => {
      registerData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/register');
  });

  // Empty field validation
  it('should show required errors when all fields are empty', () => {
    const messages = registerData.validationMessages;

    cy.get('button').contains('Register').click();

    cy.contains(messages.emailRequired).should('exist');
    cy.contains(messages.nameRequired).should('exist');
    cy.contains(messages.passwordRequired).should('exist');
    cy.contains(messages.confirmPasswordRequired).should('exist');
  });

  // Invalid email and password mismatch
  it('should show errors for invalid email and mismatched passwords', () => {
    cy.fillRegisterForm(registerData.invalidUsers[1]);
    cy.get('button').contains('Register').click();
    cy.contains(registerData.validationMessages.invalidEmail).should('exist');

    cy.fillRegisterForm(registerData.invalidUsers[2]);
    cy.get('button').contains('Register').click();
    cy.contains(registerData.validationMessages.passwordMismatch).should('exist');
  });

  // Valid submissions
  it('should register successfully with valid data', () => {
    registerData.validUsers.forEach((user) => {
      cy.fillRegisterForm(user);
      cy.get('button').contains('Register').click();

      // Confirm success by checking redirection or message
      cy.contains('User account created successfully').should('exist');

      // Back to register for next user
      cy.visit('/notes/app/register');
    });
  });

  // Navigation to login
  it('should navigate to login page', () => {
    cy.contains('Log in here!').click();
    cy.url().should('include', '/login');
  });
});
