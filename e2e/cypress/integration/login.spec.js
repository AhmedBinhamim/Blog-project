const { USERNAME, PASSWORD } = require("./constants");

describe('Test Login Flow', () => {

    it('should login user', () =>{
        cy.visit('/login');
        cy.get('[formControlname="email"]').type(USERNAME);
        cy.get('[formControlname="password"]').type(PASSWORD);
        cy.get('[type="submit"]').click();
        cy.url().should('include', 'admin');
    });
})