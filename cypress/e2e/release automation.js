import {   
  runAutomationTests,
  findPassAndBlockedBuild,
  unBlockBuild,   
  captureReleaseNotes
} from './release functions'

const util = require('./util');

describe('Perform release', () => {
  
  it('Runs automation tests and verifies that they have all passed', () => {
    const params = {
      title: 'Automation Tests',
      startTime: Date.now()
    };

    util.someFunction(params);

    runAutomationTests()

  })

  it('Finds a passed and blocked build in appliation client pipeline', () => {
    const params = {
      title: 'Find Passed and Blocked Build',
      startTime: Date.now()
    };

    util.someFunction(params);

    findPassAndBlockedBuild()

  })
  
  it('Unblocks the build: It will create a release, deploy and activate it on the QA environment, then approve the release, and will activate the release on production', () => {
    const params = {
      title: 'Unblock Build',
      startTime: Date.now()
    };

    util.someFunction(params);

    unBlockBuild()

  })

  it('Captures release notes', () => {
    const params = {
      title: 'Capture Release Notes',
      startTime: Date.now()
    };

    util.someFunction(params);
    
    captureReleaseNotes()

  })

})