'use strict';

const UnexpectedValueError = require('../Error/UnexpectedValueError');

module['exports'] = class Report
{
    /**
     * @param {Number} testsCount
     * @param {Number} assertionsCount
     * @param {...TestResult} testResults
     */
    constructor(testsCount, assertionsCount, ...testResults)
    {
        if (false === ('number' === typeof testsCount)) {
            throw new UnexpectedValueError('<testsCount> expected to be Number');
        }

        if (false === ('number' === typeof assertionsCount)) {
            throw new UnexpectedValueError('<assertionsCount> expected to be Number');
        }

        this.__testsCount = testsCount;
        this.__assertionsCount = assertionsCount;
        this.__testResults = testResults;
    }

    /**
     * @returns {Number}
     */
    get testsCount()
    {
        return this.__testsCount;
    }

    /**
     * @returns {Number}
     */
    get assertionsCount()
    {
        return this.__assertionsCount;
    }

    /**
     * @returns {...TestResult}
     */
    get testResults()
    {
        return this.__testResults;
    }
};
