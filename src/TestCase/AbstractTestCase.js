'use strict';

const Assert = require('../Assert/Assert');
const Report = require('../Report/Report');
const ReportManager = require('../Report/ReportManager');

module['exports'] = class AbstractTestCase extends Assert
{
    /**
     * @protected
     */
    __setUp()
    {
    }

    /**
     * @protected
     */
    __tearDown()
    {
    }

    /**
     * @returns {Array}
     * @protected
     */
    __fetchTests()
    {
        let tests = [];
        for (let methodName of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if ('test' !== methodName.slice(0, 4) || 'function' === this[methodName]) {
                continue;
            }

            tests.push([methodName, this[methodName]]);
        }

        return tests;
    }

    /**
     * @param {boolean} returnReport
     *
     * @return {Report}
     */
    run(returnReport = false)
    {
        let tests = this.__fetchTests();
        let testResults = [];
        for (let test of tests) {
            this.__setUp();
            testResults.push(this.__runTestByName(test[0]));
            this.__tearDown();
        }

        let report = new Report(tests.length, this.__assertionsCount, ...testResults);
        this.__resetAssertionsCount();

        if (returnReport) {
            return report;
        }

        ReportManager.printReport(report);
    }
};
