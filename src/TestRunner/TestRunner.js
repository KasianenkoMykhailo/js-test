'use strict';

const fs = require('fs');
const UnexpectedValueError = require('../Error/UnexpectedValueError');
const ReportManager = require('../Report/ReportManager');

module['exports'] = class TestRunner
{
    constructor(testDirPath)
    {
        if (false === ('string' === typeof testDirPath)) {
            throw new UnexpectedValueError('TestRunner: <testDirPath> must be string');
        }

        if (false === fs.existsSync(testDirPath)) {
            throw new UnexpectedValueError('TestRunner: <testDirPath> dir not found');
        }

        this.__testsDir = testDirPath;
    }

    /**
     * @return {String}
     */
    get testsDir()
    {
        return this.__testsDir;
    }

    run()
    {
        let reports = [];
        fs.readdirSync(this.testsDir).forEach(fileName => {
            if ('Test' === fileName.slice(-7, -3)) {
                let TestClass = require(`${this.testsDir}/${fileName}`);
                let test = new TestClass();
                reports.push(test.run(true));
            }
        });

        ReportManager.printReports(...reports);
    }
};
