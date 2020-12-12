/*
This test plan automates testing the "View Problem" function. 
Author: Michael Lau
*/

describe('View Problem Test Suite', () => {
    describe('View a problem', () => {
        it('Should open the view problem list', () => {  //open view problems page and check for elements
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //find table headers
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -header"]').as('ColHeader')
            
            //verify table header text
            cy.get('@ColHeader').should('contain', 'Problem')
            cy.get('@ColHeader').should('contain', 'Category')
            cy.get('@ColHeader').should('contain', 'Sub Category')
            cy.get('@ColHeader').should('contain', 'Actions')

            //verify the table has 4 columns
            cy.get('@ColHeader')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').should('have.length', 4)

            //by default should load 10 rows
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').should('have.length', 10)
          })

          it('Should filter and open the \'Shuffle the Array\' problem', () => {  //open view problems page and check for elements
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Shuffle the Array' into Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Shuffle the Array')

            //click View button for "Shuffle the Array" problem
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').first()
            .find('button[id="view"]').click()

            //by default the note and answer should be blank
            cy.get('textarea[id="note"]').should('have.value', '')
            cy.get('textarea[id="answer"]').should('have.value', '')

            //display note and answer on click
            cy.get('button[id="answer"]').click()
            cy.get('button[id="note"]').click()

            //verify the note and answer text has not changed
            cy.get('textarea[id="note"]').should('contain', '12345')
            cy.get('textarea[id="answer"]').should('contain', '12345')

            //click the button again the text should hide
            cy.get('button[id="answer"]').click()
            cy.get('button[id="note"]').click()
            cy.get('textarea[id="note"]').should('have.value', '')
            cy.get('textarea[id="answer"]').should('have.value', '')

            //close the modal
            cy.get('button[id="close"]').click()

          })
    })
})
