'use strict';

let Report = require('./Report');
let CompositeReport = require('./CompositeReport');
let UnexpectedValueError = require('../Error/UnexpectedValueError');
let TestResult = require('../TestResult/TestResult');
let colors = require('colors/safe');

module['exports'] = class ReportManager
{
    /**
     * @param {Report} report
     *
     * @returns {boolean}
     */
    static __isValidReport(report)
    {
        return 'object' === typeof report && (report instanceof Report || report instanceof CompositeReport);
    }

    /**
     * @param {TestResult} testResult
     *
     * @returns {boolean}
     */
    static __isValidTestResult(testResult)
    {
        return 'object' === typeof testResult && testResult instanceof TestResult;
    }

    /**
     * @param {...TestResult} testResults
     * @returns {String}
     * @private
     */
    static __createErrorsLog(...testResults)
    {
        let errorsLog = '';
        let errorNum = 1;
        for (let testFail of testResults) {
            let failedTestName = testFail.testName;
            for (let failMessage of testFail.failMessages) {
                errorsLog += `${errorNum}) ${failedTestName}: \n`;
                errorsLog += `${failMessage} \n`;
                errorNum++;
            }
        }

        return errorsLog;
    }

    /**
     * @param {Report} report
     *
     * @returns {void}
     */
    static printReport(report)
    {
        if (false === ReportManager.__isValidReport(report)) {
            throw new UnexpectedValueError('ReportManager <report> is not valid');
        }

        let testResults = report.testResults;
        if (false === testResults.every((testResult) => ReportManager.__isValidTestResult(testResult))) {
            throw new UnexpectedValueError('ReportManager <testResults> are not valid');
        }

        let isSuccessful = report.testResults.every((testResult) => testResult.isSuccessful());
        let reportString = `Tests: ${report.testsCount}, Assertions: ${report.assertionsCount}`;
        if (isSuccessful) {
            console.log(colors.green('OK'));
            console.log(colors.green(reportString));

            return;
        }

        let failuresCount = testResults.reduce((acc, testResult) => acc + testResult.failMessages.length, 0);
        let errorsLog = `There were ${failuresCount} failures: \n`;
        errorsLog += `${ReportManager.__createErrorsLog(...testResults)} \n`;
        console.log(errorsLog);
        console.log(colors.red('FAILURES!'));
        console.log(colors.red(`${reportString}, Failures: ${failuresCount}.`));
    }

    /**
     * @param {...Report} reports
     *
     * @return {Report}
     */
    static mergeReports(...reports)
    {
        if (false === reports.every((report) => ReportManager.__isValidReport(report))) {
            throw new UnexpectedValueError('ReportManager <reports> are not valid');
        }

        return new CompositeReport(...reports);
    }

    /**
     * @param {...Report} reports
     *
     * @return {void}
     */
    static printReports(...reports)
    {
        let compositeReport = ReportManager.mergeReports(...reports);
        ReportManager.printReport(compositeReport);
    }
};
