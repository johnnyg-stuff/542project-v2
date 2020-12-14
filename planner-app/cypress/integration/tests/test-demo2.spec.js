/*
This test plan goes through each of the basic CRUD operations in Study Planner, but will find some errors.
To be used for demonstrations.
Author: Michael Lau
*/

describe('Demo 2 Test Suite', () => {
    describe('Study Planner load and dashboard', () => {
        it('Should open Study Planner with title text and image', () => {  //check for home page elements
            cy.visit('http://localhost:3000')
            cy.title().should('eq', 'Study Planner')
            cy.contains('Study Planner')
            cy.contains('Better solution to take notes and help you study!')
            cy.get('.card-img-top').first().should('have.prop', 'tagName' ).should('eq', 'IMG')
            cy.get('.card-img-top').first().should('be.visible')
          })

          it('Should go to dashboard, url changes but page image and text remain', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Dashboard').click()
            cy.url().should('eq', 'http://localhost:3000/dashboard') //check new url
    
            //re-run home page tests - nothing should have changed
            cy.title().should('eq', 'Study Planner')
            cy.contains('Study Planner')
            cy.contains('Better solution to take notes and help you study!')
            cy.get('.card-img-top').first().should('have.prop', 'tagName' ).should('eq', 'IMG')
            cy.get('.card-img-top').first().should('be.visible')
        })
    });

    describe('Add a problem', () => {
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


            cy.get('button[type=button]').contains('Submit').as('submitBtn')
            cy.get('@submitBtn').should('be.enabled')
            
          })

          it('Should fill out problem details and submit', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('Add Problems').click()

            //Fill the four text areas
            cy.get('textarea[id="question"]').type('Software Testing Definition')
            cy.get('textarea[id="description"]').type('_______ is the process of evaluating a software system or component during, or at the end of, the development cycle in order to determine whether it satisfies specified requirements.\na. Validation\nb. Evaluation\nc. Verification\nd. Testing')
            cy.get('textarea[id="answer"]').type('a. Validation')
            cy.get('textarea[id="note"]').type('Verification is the process of evaluating a software system or component to determine whether the products of a given development phase satisfy the conditions imposed at the start of that phase. Testing can be described as a process used for revealing defects in software, and for establishing that the software has attained a specified degree of quality with respect to selected attributes. A software evaluation is a type of assessment that seeks to determine if software or a combination of software programs is the best possible fit for the needs of a given client.')

            //fill in the three inputs
            cy.get('input[id="importance"]').type('0')
            cy.get('input[id="category"]').type('CPSC')
            cy.get('input[id="sub_category"]').type('Software Testing')

            //click submit
            cy.contains('Submit').click()

            //search for "Software" in the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Software Testing')

            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Software Testing').should(($tr) => {
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

          it('Should filter and open the \'Software Testing Definition\' problem', () => {  //open add problems page and check for elements
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Car' into Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Software Testing')

            //click View button for "Software Testing Definition" problem
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
            cy.get('textarea[id="note"]').should('contain', 'Verification is the process of evaluating a software system or component to determine whether the products of a given development phase satisfy the conditions imposed at the start of that phase. Testing can be described as a process used for revealing defects in software, and for establishing that the software has attained a specified degree of quality with respect to selected attributes. A software evaluation is a type of assessment that seeks to determine if software or a combination of software programs is the best possible fit for the needs of a given client. ')
            cy.get('textarea[id="answer"]').should('contain', 'a. Validation')

            //click the button again the text should hide
            cy.get('button[id="answer"]').click()
            cy.get('button[id="note"]').click()
            cy.get('textarea[id="note"]').should('have.value', '')
            cy.get('textarea[id="answer"]').should('have.value', '')

            //close the modal
            cy.get('button[id="close"]').click()

          })
    });

    describe('Edit a problem', () => {
        it('Should filter the \'Software Testing Definition\' problem and edit it', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Car' into the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Software Testing')

            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Software Testing').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })

            //view the 'Software Testing Definition' entry by clicking the button
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').first()
            .find('button[id="view"]').click()

            cy.get('textarea[id="question"]').clear()
            cy.get('textarea[id="question"]').type('Software Testing Definition')
            cy.get('button[id="save"]').click()
            
            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Software Testind edit test').should(($tr) => {
                expect($tr.length).to.equal(1)
            })

        })
    });


    describe('Remove a problem', () => {
        it('Should filter the \'Software Testing Definition\' problem and remove it', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Problem Set').click()
            cy.contains('View Problem Sets').click()

            //enter 'Software Testing Definition' into the Problem column
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-thead -filters"]')
            .find('div[class="rt-tr"]')
            .find('div[role="columnheader"]').first().type('Software Testing Definition')

            //table query results
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Software Testing').should(($tr) => {
                expect($tr.length).to.be.greaterThan(0)
            })

            //remove the 'Software Testing Definition' entry by clicking the remove button
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').first()
            .find('button[id="remove"]').click()

            //search again to verify 'Software Testing Definition' has been deleted
            cy.get('div[class="rt-table"]')
            .find('div[class="rt-tbody"]')
            .find('div[class="rt-tr-group"]').contains('Software Testing').should(($tr) => {
                expect($tr.length).to.equal(0) //assume there was only one result
            })
        })
    });

  })