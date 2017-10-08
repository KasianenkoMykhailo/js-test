'use strict';

module['exports'] = class CompositeReport
{
    /**
     * @param {...Report} reports
     */
    constructor(...reports)
    {
        this.__reports = reports;
    }

    /**
     * @returns {Number}
     */
    get testsCount()
    {
        return this.__reports.reduce((acc, report) => acc + report.testsCount, 0);
    }

    /**
     * @returns {Number}
     */
    get assertionsCount()
    {
        return this.__reports.reduce((acc, report) => acc + report.assertionsCount, 0);
    }

    /**
     * @returns {...TestResult}
     */
    get testResults()
    {
        return this.__reports.reduce((acc, report) => acc.concat(report.testResults), []);
    }
};
