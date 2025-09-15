describe('Edit Note', () => {
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

  it('should edit an existing note', () => {
    cy.createNote(notes.validNotes[1]);
    cy.editNote(notes.updatedNote);

    cy.contains(notes.updatedNote.title).should('exist');
    cy.contains(notes.updatedNote.description).should('exist');
  });

  it('should NOT allow editing note to empty title and description', () => {
    cy.get('[data-testid="note-edit"]').first().click(); 
    cy.get('#title').clear();
    cy.get('#description').clear();
    cy.get('button').contains('Save').click();

    cy.contains(notes.validationMessages.titleRequired).should('exist');
    cy.contains(notes.validationMessages.descriptionRequired).should('exist');
  });

});
