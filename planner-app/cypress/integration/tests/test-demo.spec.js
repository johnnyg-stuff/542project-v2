describe('Demo Test Suite', () => {
    it('Open Study Planner', () => {
      cy.visit('http://localhost:3000')
    })

    it('Go to dashboard', () => {
      expect(1+1).to.equal(2)
    })

  })