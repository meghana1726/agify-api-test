# Agify API Test Project

This is a test project that does the verification and validation of [Agify API](https://agify.io).  
It estimates people's ages based on their names.

We’re using:

- Cucumber (for BDD tests)
- TypeScript (to write code safely)
- Axios (to call the API)
- Chai (for Assertions)
- HTML Report (to see test results in a graphical format)


## Running in Local

1. Install Node.js
2. Clone this project:

```bash
git clone https://github.com/meghana1726/agify-api-testing.git
cd agify-api-tests
npm install

npm test
```
## Generate Test Report

```bash
npm run report
```

## What’s Being Tested?

We send names like "meghana" or "billybnob" to the Agify API and check:

* Is the response code correct?
* Is the name returned correctly?
* Is the age a number (or null)?
* Does the API respond with the expected number of results (in batch mode)?

## Folder Structure Overview
features/           → Test cases and steps
support/            → API Client  
scripts/            → Report generator
reports/            → HTML report gets saved here

## Sample Test Report
 [View Test Report](https://meghana1726.github.io/agify-api-test)


