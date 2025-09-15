describe('Delete Note Tests', () => {
  let notes;

  before(() => {
    cy.fixture('noteData').then((data) => {
      notes = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.loginUI(Cypress.env('validemail'), Cypress.env('validpassword'));
    cy.createNote(notes.validNotes[0]); // Create a note to delete
  });

  it('should delete the note successfully', () => {
    cy.deleteNote();

    cy.contains(notes.validNotes[0].title).should('not.exist');
  });

  it('should cancel deletion when user clicks cancel (if cancel option exists)', () => {
    cy.get('[data-testid="note-delete"]').first().click();
    cy.get('button').contains('Cancel').click(); 
    cy.contains(notes.validNotes[0].title).should('exist');
    
  });
});
