describe('Create Note', () => {
  let notes;

  before(() => {
    cy.fixture('noteData').then((data) => {
      notes = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.loginUI(Cypress.env('validemail'), Cypress.env('validpassword')); 
  });

  it('should show validation errors for empty inputs', () => {
   
    cy.get('button').contains('+ Add Note').click();
    cy.get('button').contains('Create').click();

    const messages = notes.validationMessages;
    cy.contains(messages.titleRequired).should('exist');
    cy.contains(messages.descriptionRequired).should('exist');
  });

  it('should create note with valid data', () => {
    cy.createNote(notes.validNotes[0]);
    cy.contains(notes.validNotes[0].title).should('exist');
    cy.contains(notes.validNotes[0].description).should('exist');
  });
});
