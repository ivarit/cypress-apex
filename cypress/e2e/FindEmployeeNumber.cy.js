describe('Click on next page until employee number is found ', () => {
    const tableSelector = '#R14853732541096865363_content';
    const columnSelector = '[headers="C14853732913567865365"]'
    it('Click next', () => {
        cy.visit('f?p=193000:LOGIN_DESKTOP')
        cy.get('#P101_USERNAME').clear().type('guest')
        cy.get('#P101_PASSWORD').clear().type('apex_demo')
        cy.get('#B12990413369985692775').click()
        cy.get('#t_Button_navControl').should('be.visible').click()
        cy.get('#t_Body_nav').should('be.visible')
        cy.get('#t_TreeNav_2 > .a-TreeView-content').click()
        cy.get('#R14853732541096865363_worksheet_region').should('be.visible')
        cy.findEmployeeNumber('7934',columnSelector,tableSelector)
    });
});