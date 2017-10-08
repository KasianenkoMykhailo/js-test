'use strict';

const TestRunner = require('../src/TestRunner/TestRunner');
const testDirPath = __dirname + '/../tests';
let testRunner = new TestRunner(testDirPath);

testRunner.run();
