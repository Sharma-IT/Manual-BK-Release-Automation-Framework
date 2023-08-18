// Export functions
module.exports = {
  runAutomationTests,
  findPassAndBlockedBuild,
  unBlockBuild,
  captureReleaseNotes
}

const CI_tool_Automation_Tests_Pipeline_URL = Cypress.env('CI_tool_Automation_Tests_Pipeline_URL')
const CI_tool_Application_Pipeline_URL = Cypress.env('CI_tool_Application_Pipeline_URL')
const Create_Release_button = Cypress.env('Create_Release_button')
const Approve_Release_button = Cypress.env('Approve_Release_button')

// Function to run Automation Tests
const runAutomationTests = () => {
  cy.visit(CI_tool_Automation_Tests_Pipeline_URL)
  cy.intercept('GET', '**/app/build', {
    timeout: 1800000, // Stops test after 30 minutes
    onTimeout: (err) => {
      // Runs after final timeout
      if (!loggedAlready) {
        cy.print('Unable to verify automation tests have passed. Check log for more info.')
        cy.log('Unable to verify automation tests have passed:\n\n' + err.message)
        loggedAlready = true
      }
    }
  })
  cy.get('[data-testid="newBuild"]')
    .should('be visible')
    .click()
    .wait(200)
    .type('{enter}')
    .retry({ openMode: 2 }) // retry on disconnects

  cy.get('body', { timeout: 60000 }) // retry every minute
    .then(body => {
      if (body.text().includes('Passed in')) {
        return true
      }
    })

  cy.then(() => {
    cy.wait(2000)
      .visit(CI_tool_Application_Pipeline_URL)
  })
}

// Function to find blocked build    
const findPassAndBlockedBuild = () => {
  cy.get('body').then((body) => {
    if (body.text().includes('Passed in') && text.includes('blocked')) {
      // If a blocked build is found, click it
      cy.contains('Passed in').click()
    } else {
      cy.get('button:contains("Next ›")').catch(() => {
        cy.log('No pages left. No blocked build was found.\n\n' + err.message)
        throw new Error("No pages left. No blocked build was found. Check log for more info.")
      }).then(() => {
        // Click next button and call function again
        cy.get('button:contains("Next ›")').click()
        findPassAndBlockedBuild()
      })
    }
  })
}

// Function to wait for build to be unblocked    
const unBlockBuild = () => {
  cy.contains('a', Create_Release_button).click()
  cy.intercept('GET', '**/app/build', {
    timeout: 1800000, // Stops test after 30 minute
    onTimeout: (err) => {
      // Runs after final timeout
      if (!loggedAlready) {
        cy.print("'Changes' heading could not be found within 2 minutes. Check log for more info. Check log for more info.")
        cy.log('The Approve Release button was clicked before the Create Release step completed. Or the Create Release step has failed.\n\n' + err.message)
        loggedAlready = true
      }
    }
  })
  cy.get('body', { timeout: 60000 }) // retry every minute
    .then(body => {
      if (body.text().includes('unblocked')) {
        return true
      }
    })
  cy.then(() => {

    /* Insert cy.wait command here for however long required for any manual testing on the QA env.*/

    cy.get('a', Approve_Release_button).should('be.visible').click()
  })
}

// Function to capture release notes
const captureReleaseNotes = () => {
  cy.intercept('GET', '**/app/build', {
    timeout: 300000, // Stops test after 5 minutes
    onTimeout: (err) => {
      // Runs after final timeout
      if (!loggedAlready) {
        cy.print('The Approve Release button was clicked before the Create Release step completed. Or the Create Release step has failed. Check log for more info.')
        cy.log("'Changes' heading could not be found within 2 minutes.\n\n}" + err.message)
        loggedAlready = true
      }
    }
  })
  cy.get('h3', { timeout: 1000 }) // retry every second
    .then(h3 => {
      if (h3.text().includes('Changes')) {
        return true
      }
    }).then(() => {
      // 'Changes' heading found, get release notes

      // Select only the 'Changes' section

      cy.get('h3').contains('Changes').next('ul').find('li').should('have.length.above', 0).retry({ openMode: 2 })
        .then((listItems) => {
          if (listItems.length === 0) {
            cy.log("No list items found beneath 'Changes' heading.\n\n" + err.message)
            throw new Error("No list items found beneath 'Changes' heading. Check log for more info.")
          }
          // Get the current date  
          const date = new Date().toLocaleDateString();

          let releaseNotes = `${date}:\n\n`;

          // Get the text of the current list item
          const text = listItem.text();

          releaseNotes += text + '\n\n';
        })

      // Write the release notes to a text file
      require('fs').writeFile('release notes.txt', releaseNotes, (err) => {
        if (err) throw err;
        console.log('Release notes saved!');
      });
    })
}
