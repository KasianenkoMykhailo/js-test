>> unit test framework

>> The simplest way to use is:

 - @console: npm install js-unit-test@0.* --save-dev
 - create directory "tests" int project root directory
 - add TestCase js files there (extend from AbstractTestCase)
 - add or update "test" property in your project package.json file with:

 {
    ...
    "test": "js-unit-test run-tests"
    ...
 }

 - @console: npm test
