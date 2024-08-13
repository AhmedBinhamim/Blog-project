describe('Admin Dashboard Page', () =>{
    
    it('should load users table', () =>{
        cy.visit('/')
        cy.get('[routerlink="users"]').click();
        cy.get('mat-table', { timeout: 10000 }).should('be.visible');
    });

    it('should display right column names', () => {
        cy.visit('/users')
        cy.contains('Id');
        cy.contains('Name');
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Role');
    });

    it('should navigate to next page', () => {
        cy.visit('/users')
        cy.get('[aria-label="Next page"]').click();
    });

    it('should filter users by username', () =>{
        cy.visit('/users')
        cy.get('[placeholder="Search Username"]').type('ahmed', { force: true });
        cy.get('mat-table').find('mat-row').should('have.length', 2 );
    })
})