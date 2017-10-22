'use strict';

const AbstractConstraint = require('./AbstractConstraint');
const UnexpectedValueError = require('../Error/UnexpectedValueError');
const TypeHelper = require('../Helper/TypeHelper');

module['exports'] = class Count extends AbstractConstraint
{
    /**
    * @param {Number} expectedCount
    */
    constructor(expectedCount)
    {
        super();
        if (false === TypeHelper.isValidCount(expectedCount)) {
            throw new UnexpectedValueError('expectedCount is not valid <count>');
        }

        this._expectedCount = expectedCount;
    }

    /**
     * @param {Countable} other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        if (false === TypeHelper.isCountable(other)) {
            return false;
        }

        let otherCount = TypeHelper.getSizeOrLength(other);
        if (null !== otherCount) {
            return this._expectedCount === otherCount;
        }

        return this._expectedCount === TypeHelper.countIterable(other);
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return `count matches <${this.exporter.export(this._expectedCount)}>`;
    }
};
