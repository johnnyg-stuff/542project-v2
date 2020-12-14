/*
This test plan automates testing the "add problem" function. 
Author: John Gardner
*/

describe('Add Problem Test Suite', () => {
    describe('Add a basic problem', () => {
        it('Should open add problem', () => {  //open add problems page and check for elements
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //check for all text descriptions
            let addArr = ['Question', 'Question Description', 'Answer', 'Note', 'Importance', 'Category', 'Sub Category'] 
            for (let i = 0; i < addArr.length; i++){
                cy.contains(addArr[i])
            }

            //verify the four text areas are visible and enabled
            cy.get('textarea[id="question"]').should('be.visible').should('be.enabled')
            cy.get('textarea[id="description"]').should('be.visible').should('be.enabled')
            cy.get('textarea[id="answer"]').should('be.visible').should('be.enabled')
            cy.get('textarea[id="note"]').should('be.visible').should('be.enabled')

            //verify the three inputs are visible and enabled
            cy.get('input[id="importance"]').should('be.visible').should('be.enabled')
            cy.get('input[id="category"]').should('be.visible').should('be.enabled')
            cy.get('input[id="sub_category"]').should('be.visible').should('be.enabled')

            //verify the button is labeled "Submit" and is enabled
            cy.get('button[type=button]').contains('Submit').as('submitBtn')
            cy.get('@submitBtn').should('be.enabled')
            
          })

          it('Should fill out problem details and submit', () => {
            //baseline regression test for the "Add problem" function
            //will add a basic problem and check that the submission is successful
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('Car mpg')
            cy.get('textarea[id="description"]').type('A car got 33 miles per gallon using gasoline that cost $2.95 per gallon. Approximately what was the cost, in dollars, of the gasoline used in driving the car 350 miles?\nA. $10\nB. $20\nC. $30\nD. $40\nE. $50')
            cy.get('textarea[id="answer"]').type('C. $30')
            cy.get('textarea[id="note"]').type('The car used 350 over 33 gallons of gasoline, so the cost was (350 over 33) * 2.95 dollars. You can estimate the product (350 over 33) * 2.95 by estimating 350 over 33 a little low, 10, and estimating 2.95 a little high, 3, to get approximately 10 times 3 = 30 dollars. The calculator yields the decimal 31.287... which rounds to 30 dollars. Thus the correct answer is Choice C, $30.')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('5')
            cy.get('input[id="category"]').type('GRE')
            cy.get('input[id="sub_category"]').type('Math')

            //click submit
            cy.contains('Submit').click()

            //search for "Car" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Car')

            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Car').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })

        })
    });

    describe('View a problem', () => {
        it('Should open the view problem list', () => {  //open add problems page and check for elements
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

          it('Should filter and open the \'Car MPG\' problem', () => {  //open add problems page and check for elements
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Car' into Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Car')

            //click View button for "Car MPG" problem
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
            cy.get('textarea[id="note"]').should('contain', 'The car used 350 over 33 gallons of gasoline, so the cost was (350 over 33) ')
            cy.get('textarea[id="answer"]').should('contain', 'C. $30')

            //click the button again the text should hide
            cy.get('button[id="answer"]').click()
            cy.get('button[id="note"]').click()
            cy.get('textarea[id="note"]').should('have.value', '')
            cy.get('textarea[id="answer"]').should('have.value', '')

            //close the modal
            cy.get('button[id="close"]').click()

          })
    });

    describe('Add a set of problems', () => {
          it('Should return wrong data type error for text in "importance" field', () => {
            //"important" field can only accept integers, so the system should type check
            //and reject a string input in this field
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('test1')
            cy.get('textarea[id="description"]').type('test1')
            cy.get('textarea[id="answer"]').type('test1')
            cy.get('textarea[id="note"]').type('test1')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('test1')
            cy.get('input[id="category"]').type('test1')
            cy.get('input[id="sub_category"]').type('test1')

            //click submit
            cy.contains('Submit').click()

            //search for "test1" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('test1')

            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('test1').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })
        });

        it('Should return out of bounds error for "importance" field', () => {
            //the "importance" field should only accept values betwen 1-10, so
            //other integer should be rejected
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('test2')
            cy.get('textarea[id="description"]').type('test2')
            cy.get('textarea[id="answer"]').type('test2')
            cy.get('textarea[id="note"]').type('test2')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('11')
            cy.get('input[id="category"]').type('test2')
            cy.get('input[id="sub_category"]').type('test2')

            //click submit
            cy.contains('Submit').click()

            //search for "test2" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('test2')

            //table query results, test2 should not appear
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('test2').should(($tr) => {
                expect($tr.length).to.equal(0)
            })

        })

        it('Should return error for blank "question" field', () => {
            //the "question" field should not be left blank, system should reject
            //attempts to add blank questions
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('')
            cy.get('textarea[id="description"]').type('test3')
            cy.get('textarea[id="answer"]').type('test3')
            cy.get('textarea[id="note"]').type('test3')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('5')
            cy.get('input[id="category"]').type('test3')
            cy.get('input[id="sub_category"]').type('test3')

            //click submit
            cy.contains('Submit').click()

            //search for "test2" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('test3')

            //table query results, test2 should not appear
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('').should(($tr) => {
                expect($tr.length).to.equal(0)
            })

        })

        it.only('Should return error for blank "category" field', () => {
            //the "category" field should not be left blank, the system should block attempts
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('test4')
            cy.get('textarea[id="description"]').type('test4')
            cy.get('textarea[id="answer"]').type('test4')
            cy.get('textarea[id="note"]').type('test4')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('5')
            cy.get('input[id="category"]').type(' ')
            cy.get('input[id="sub_category"]').type('test4')

            //click submit
            cy.contains('Submit').click()

            //search for "test2" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('test4')

            //table query results, test4 should not appear
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('test4').should(($tr) => {
                expect($tr.length).to.equal(0)
            })

        })

        
    });

})