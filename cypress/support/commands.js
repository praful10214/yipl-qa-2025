// login commands
Cypress.Commands.add('loginUI', (email, password) => {
  cy.get('#email').clear().type(email);
  cy.get('#password').clear().type(password);
  cy.get('[data-testid="login-submit"]').click();
});

// register commands
Cypress.Commands.add('fillRegisterForm', (user) => {
  if (user.email !== undefined) {
    cy.get('#email').clear().type(user.email);
  }
  if (user.name !== undefined) {
    cy.get('#name').clear().type(user.name);
  }
  if (user.password !== undefined) {
    cy.get('#password').clear().type(user.password);
  }
  if (user.confirmPassword !== undefined) {
    cy.get('#confirmPassword').clear().type(user.confirmPassword);
  }
});

Cypress.Commands.add('createNote', (note) => {
  cy.get('button').contains('+ Add Note').click(); 
  cy.get('#title').clear().type(note.title);
  cy.get('#description').clear().type(note.description);
  cy.get('button').contains('Create').click(); 
});

Cypress.Commands.add('editNote', (updatedNote) => {
  cy.get('[data-testid="note-edit"]').first().click(); 
  cy.get('#title').clear().type(updatedNote.title);
  cy.get('#description').clear().type(updatedNote.description);
  cy.get('button').contains('Save').click();
});

Cypress.Commands.add('deleteNote', () => {
  cy.get('[data-testid="note-delete"]').first().click(); 
  cy.contains('Delete note?').should('exist');
  // cy.get('button').contains('Delete').click(); 
  cy.get('[data-testid="note-delete-confirm"]').click();
});

