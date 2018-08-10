# Doctor Doctor

### **Ryan Murry** | Epicodus Javascript Week 2 Code Review, 08.10.2018

## Planning


### *Configuration/dependencies*

  | Dependency                           | Description                                                                  |
  | ------------------------------------ | ---------------------------------------------------------------------------- |
  | babel-core v. 6.26.0                 | Babel compiler core                                                          |
  | babel-loader v. 7.1.3                | Babel loader for webpack                                                     |
  | babel-present-es2015 v. 6.24.1       | Specifies how Babel can convert ES6 to ES5                                   |
  | clean-webpack-plugin v. 0.1.18       | Clean your build folder(s) before building                                   |
  | css-loader v. 0.28.10                | Interprets `@import` and `url()` like `import/require()` and resolves them   |
  | dotenv-webpack v. 1.5.7              | A secure webpack plugin that supports dotenv and other environment variables |
  | eslint v. 4.18.2                     | Identifies and reports on patterns found in Javscript code                   |
  | eslint-loader v. 2.0.0               | ESLint loader for webpack                                                    |
  | html-webpack-plugin v. 3.0.6         | Simplifies creation of HTML files to serve webpack bundles                   |
  | jasmine v. 3.1.0                     | Allows Jasmine specs to be run                                               |
  | jasmine-core v. 2.99.1               | JavaScript BDD testing framework                                             |
  | karma v. 2.0.0                       | Allows the execution of JavaScript code in multiple *real* browsers          |
  | karma-chrome-launcher v. 2.2.0       | Launcher for Google Chrome, Google Chrome Canary, and Google Chromium        |
  | karma-cli v. 1.0.1                   | Use Karma from the command line                                              |
  | karma-jasmine v. 1.1.1               | Plugin - adapter for Jasmine testing framework                               |
  | karma-jasmine-html-reporter v. 0.2.2 | Dynamically shows test results at debug.html page                            |
  | karma-jquery v. 0.2.2                | Plugin - adapter for jQuery framework                                        |
  | karma-sourcemap-loader v. 0.3.7      | Preprocessor that locates and loads existing source maps                     |
  | karma-webpack v. 2.0.13              | Use webpack to preprocess files in Karma                                     |
  | style-loader v. 0.20.2               | adds CSS to the DOM by injecting a `<style>` tag                             |
  | uglifyjs-webpack-plugin v. 1.2.2     | Minifies JavaScript                                                          |
  | webpack v. 4.0.1                     | A module bundler used to bundle JavaScript files and additional resources    |
  | webpack-cli v. 2.0.9                 | Use webpack from command line                                                |
  | webpack-dev-server v. 3.1.0          | Provides live reloading during development                                   |

### *Specs*
| Input                                       | Output                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| enters a medical issue                      | receives a list of doctors in the Portland area that fit the search query                        |
| enters a doctors last name                  | receives a list of doctors in the Portland area that fit that search query                       |
| any query response that matches to a doctor | doctor first and last name and specialties. practice address, phone number, and status on accepting new patients |
| any query that results in an error          | error notification that states what error was                                                    |
| any query that returns zero results         | notification that no doctors meet the criteria                                                   |


 ### *UX/UI*
  * Include and modify bootstrap/css etc.
  * Develop doctor theme

### *Polish*
  * Refactor / polish styles and javascript files
  * Add input and output values for additional specs
  * Revise README

## Description

### *Setup on OSX*

* Install Node.js
* Install karma-cli globally: `npm install -g karma-cli`
* Clone the repo
* `npm install` to install dependencies
* `npm run start` to build and start the dev server
* `npm run lint` to explicitly run ESLint
* `npm run test` to run the unit tests with Karma and Jasmine.

### *Contribution Requirements*

1. Clone the repo
2. Make a new branch
3. Commit and push your changes
4. Create a PR

### *Technologies Used*

* JavaScript
* Node.js
* jQuery 3.3.1
* Bootstrap 4.1.3
* Babel
* Webpack
* ESLint
* Jasmine
* Karma

### *License*

This software is licensed under the MIT license.

Copyright (c) 2018 **Ryan Murry**