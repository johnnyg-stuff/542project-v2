/*
This test plan goes through each of the basic CRUD operations in Study Planner.
To be used for demonstrations.
Author: Son (Alex) Truong 
*/

describe('Demo test Suite', () =>{
    describe('Study Planner view  problem', () =>{
        it('Should the problem', () => {

            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //find table 
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -header"]').as('ColHeader')

            //checking the table component 
            cy.get('@ColHeader').should('contain', 'Problem')
            cy.get('@ColHeader').should('contain', 'Category')
            cy.get('@ColHeader').should('contain', 'Sub Category')
            cy.get('@ColHeader').should('contain', 'Actions')

            //return the 8 closest results from database 
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').should('have.length', 8)
        }) 
    });
    describe('Edit a problem', () => {
        it('filter out the \'Array\' problem and edit it', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Array' into the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('')

            //table query return results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Array').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })

            //view the 'Array' entry by clicking the button
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').first()
            .find('button[id="view"]').click()

            cy.get('textarea[id="question"]').clear()
            cy.get('textarea[id="question"]').type('array edit test')
            cy.get('button[id="save"]').click()
            
            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('array edit test').should(($tr) => {
                expect($tr.length).to.equal(1)
            })

        })
    });
    describe('Remove a problem', () => {
        it('Should filter the \'Array\' problem and remove it', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Array' into the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Array')

            //table query return results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Array').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })

            //remove the 'Array' entry by clicking the remove button
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').first()
            .find('button[id="remove"]').click()

            //search again to verify 'Array' has been deleted
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Array').should(($tr) => {
                expect($tr.length).to.equal(0)
            })
        })
    });
});