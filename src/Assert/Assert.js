'use strict';

const UnexpectedValueError = require('../Error/UnexpectedValueError');
const ConstraintMismatchError = require('../Error/ConstraintMismatchError');
const TestResult = require('../TestResult/TestResult');
const AbstractConstraint = require('../Constraint/AbstractConstraint');
const ArrayHasIndex = require('../Constraint/ArrayHasIndex');
const ArrayHasNoIndex = require('../Constraint/ArrayHasNoIndex');
const IsTypeOf = require('../Constraint/IsTypeOf');
const IsEqualTo = require('../Constraint/IsEqualTo');
const IsNotEqualTo = require('../Constraint/IsNotEqualTo');

let assertionsCount = 0;
let errors = [];

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
                errors.push(e);
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

        let testClass = this.constructor.name;
        this[testName]();
        if (errors.length === 0) {
            return new TestResult(testClass, testName);
        }

        let testResult = new TestResult(testClass, testName, errors);
        errors = [];

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

    /**
     * @param value
     * @param {String} message
     */
    assertIsUndefined(value, message = '')
    {
        let constraint = new IsTypeOf('undefined');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsObject(value, message = '')
    {
        let constraint = new IsTypeOf('object');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsBoolean(value, message = '')
    {
        let constraint = new IsTypeOf('boolean');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsNumber(value, message = '')
    {
        let constraint = new IsTypeOf('number');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsString(value, message = '')
    {
        let constraint = new IsTypeOf('string');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsSymbol(value, message = '')
    {
        let constraint = new IsTypeOf('symbol');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param value
     * @param {String} message
     */
    assertIsFunction(value, message = '')
    {
        let constraint = new IsTypeOf('function');

        this.__assertThat(value, constraint, message)
    }

    /**
     * @param expected
     * @param actual
     * @param {String} message
     */
    assertEquals(expected, actual, message = '')
    {
        let constraint = new IsEqualTo(expected);

        this.__assertThat(actual, constraint, message)
    }

    /**
     * @param expected
     * @param actual
     * @param {String} message
     */
    assertNotEquals(expected, actual, message = '')
    {
        let constraint = new IsNotEqualTo(expected);

        this.__assertThat(actual, constraint, message)
    }
};
