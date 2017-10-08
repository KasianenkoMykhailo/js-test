'use strict';

let UnexpectedValueError = require('../Error/UnexpectedValueError');

module['exports'] = class TestResult
{
    /**
     * @param {String} testName
     * @param {Array} failMessages
     */
    constructor(testName, failMessages = [])
    {
        if (false === ('string' === typeof testName)) {
            throw new UnexpectedValueError('testName expected to be string');
        }

        if (false === ('object' === typeof failMessages)
            || false === failMessages instanceof Array
        ) {
            throw new UnexpectedValueError('failMessages expected to be Array');
        }

        this.__testName = testName;
        this.__failMessages = failMessages;
    }

    get testName()
    {
        return this.__testName;
    }

    get failMessages()
    {
        return this.__failMessages;
    }

    /**
     * @returns {boolean}
     */
    isSuccessful()
    {
        return 0 === this.__failMessages.length;
    }
};
