describe('Homepage', () =>{
    
    it('should load successfully', () =>{
        cy.visit('/');
    });

    it('should contain right spelled texts ', () =>{
       cy.visit('/')
       cy.contains('Users');
       cy.contains('Admin');
       cy.get('mat-select').click();
       cy.contains('Login');
       cy.contains('Register');
    });
})