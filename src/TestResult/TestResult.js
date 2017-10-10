'use strict';

const UnexpectedValueError = require('../Error/UnexpectedValueError');
const ConstraintMismatchError = require('../Error/ConstraintMismatchError');

module['exports'] = class TestResult
{
    /**
     * @param {String} testClass
     * @param {String} testName
     * @param {Array|ConstraintMismatchError[]} errors
     */
    constructor(testClass, testName, errors = [])
    {
        if (false === ('string' === typeof testClass)) {
            throw new UnexpectedValueError('testClass expected to be string');
        }

        if (false === ('string' === typeof testName)) {
            throw new UnexpectedValueError('testName expected to be string');
        }

        if (false === ('object' === typeof errors)
            || false === errors instanceof Array
        ) {
            throw new UnexpectedValueError('errors expected to be Array');
        }

        this.__testClass = testClass;
        this.__testName = testName;
        this.__errors = errors;
    }

    get testClass()
    {
        return this.__testClass;
    }

    get testName()
    {
        return this.__testName;
    }

    get errors()
    {
        return this.__errors;
    }

    /**
     * @returns {boolean}
     */
    isSuccessful()
    {
        return 0 === this.__errors.length;
    }
};
