# Release Automation Framework

Automation framework designed to automate build deploys and releases, with a focus on compatibility with Buildkite. It is intended to work in conjunction with manual checks and inspection to ensure the quality and reliability of the deployment process.

This project consists of a Cypress test automation framework designed to automate build deployment and release processes within the Buildkite CI/CD platform. The goal is to leverage Cypress to programmatically perform critical release tasks such as triggering build pipelines, waiting for approvals, and capturing release notes.

Given the business requirements around manual quality checks and verification, Cypress was selected for its interactive test runner which enables "walking through" automated test steps while inspecting application state and screenshots. This provides greater visibility into the release process compared to headless tools.

The framework is intended to complement, not fully replace, manual testing and validation. Tests are structured around stages requiring human sign-off, such as waiting for builds to be approved and unblocked before progression. This hybrid approach balances automation with manual oversight for the level of reliability and governance needed.

Built-in Cypress capabilities like automatic wait assertions, network stubbing, and test retries provide resilience against flakiness when automating the UI. The test runner's interactive mode also aids debugging and troubleshooting capabilities.

Overall, the solution aims to automate the repetitive aspects of release management, while still maintaining necessary human verification points - improving velocity and reliability of the end-to-end deployment process.

## Features

* **Automation Tests:** The framework includes a function to deploy a build to run automation tests and verify their success. It visits the specified CI tool's automation tests pipeline URL, creates a new build and then checks for successful test results. If the tests fail to pass within a specified timeout, an error message is logged.

* **Finding Blocked Builds:** The framework provides a function to find blocked builds in the application client pipeline. It searches for the latest build that has passed but has also been marked as blocked. Once this type of build is found, the function clicks on it to proceed with unblocking the build.

* **Unblocking Builds:** The framework includes a function to wait for a build to be unblocked. Unblocking the build includes creating a release, deploying and activating it on the QA environment, then approving the release, and activating the release on production. It clicks on the specified "Create Release" button and waits for the build to be unblocked. If the build fails to unblock within a specified timeout, an error message is logged. Otherwise, if it passes, the “Approve Release” button will be clicked on.

* **Capturing Release Notes:** The framework offers a function to capture release notes. It intercepts the specified URL to retrieve the build details. It searches for the "Changes" heading and retrieves the release notes listed beneath it. The release notes are then saved to a text file named "release notes.txt".

## Usage

1. Clone the repository:

```
git clone https://github.com/sharma-it/Release-Automation-Framework.git
```

2. Change into the project directory:

```
cd Release-Automation-Framework
```

3. To install neccessary dependencies:
```
npm install
```

4. Configure the environment variables in the Cypress configuration file (```cypress.env.json```) to provide the required URLs and button names for your CI tool.

5. Comment out or use ```it.skip``` for functions that you don’t want to run.

6. Make sure to add a ```cy.wait``` command before the “Approve Release” button is clicked if you need to do manual testing on the QA environment, the command has to be added within the unBlockBuild function (```release function.js```).

7. Accordingly modify hardcoded variables ‘Passed, ‘blocked’ and ‘Next ›’ in the findPassAndBlockedBuild function (```release function.js```), **if you’re not using Buildkite.**
  
8. Modify any code where needed to better adapt the framework to the CI tool of your choice.
   
9. Run the tests using the Cypress test runner by executing the command:
```
npx cypress run
```

Or:
```
npx cypress open
```

## Dependencies

This automation framework relies on the following dependencies:

* [Cypress:](https://www.cypress.io/) A JavaScript end-to-end testing framework.
* [Lodash:](https://lodash.com/) A JavaScript utility library delivering modularity, performance & extras.

## Compatibility

While this automation framework is designed for Buildkite, this framework may be adaptable to other CI tools with some modification.

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.

## Contact

Shubham Sharma - [My LinkedIn](https://www.linkedin.com/in/sharma-it/) - shubhamsharma.emails@gmail.com.

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENCE) file for details.
