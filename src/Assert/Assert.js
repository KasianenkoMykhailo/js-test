'use strict';

let UnexpectedValueError = require('../Error/UnexpectedValueError');
let ConstraintMismatchError = require('../Error/ConstraintMismatchError');
let TestResult = require('../TestResult/TestResult');
let AbstractConstraint = require('../Constraint/AbstractConstraint');
let ArrayHasIndex = require('../Constraint/ArrayHasIndex');
let ArrayHasNoIndex = require('../Constraint/ArrayHasNoIndex');
let IsTypeOf = require('../Constraint/IsTypeOf');

let assertionsCount = 0;
let failMessages = [];

module['exports'] = class Assert
{
    /**
     * @returns {number}
     * @protected
     */
    get __assertionsCount()
    {
        return assertionsCount;
    }

    __resetAssertionsCount()
    {
        assertionsCount = 0;
    }

    /**
     * @param value
     * @param {AbstractConstraint} constraint
     * @param {String} message
     * @protected
     */
    __assertThat(value, constraint, message = '')
    {
        if (false === ('object' === typeof constraint)
            || false === constraint instanceof AbstractConstraint
        ) {
            throw new UnexpectedValueError('constraint expected to be instance of AbstractConstraint');
        }

        assertionsCount++;

        try {
            constraint.evaluate(value, message);
        } catch (e) {
            if (e instanceof ConstraintMismatchError) {
                failMessages.push(e.message);
            } else {
                throw e;
            }
        }
    }

    /**
     * @param {String}   testName
     *
     * @returns {TestResult}
     * @protected
     */
    __runTestByName(testName)
    {
        if (false === ('string' === typeof testName)) {
            throw new UnexpectedValueError('__runTest <testName> must be string');
        }

        this[testName]();
        if (failMessages.length === 0) {
            return new TestResult(testName);
        }

        let testResult = new TestResult(testName, failMessages);
        failMessages = [];

        return testResult;
    }

    /**
     * @param {Number} index
     * @param {Array} array
     * @param {String} message
     */
    assertArrayHasIndex(index, array, message = '')
    {
        let constraint = new ArrayHasIndex(index);

        this.__assertThat(array, constraint, message)
    }

    /**
     * @param {Number} index
     * @param {Array} array
     * @param {String} message
     */
    assertArrayHasNoIndex(index, array, message = '')
    {
        let constraint = new ArrayHasNoIndex(index);

        this.__assertThat(array, constraint, message)
    }

    /**
     * @param {String} type
     * @param value
     * @param {String} message
     */
    assertIsTypeOf(type, value, message = '')
    {
        let constraint = new IsTypeOf(type);

        this.__assertThat(value, constraint, message)
    }
};
