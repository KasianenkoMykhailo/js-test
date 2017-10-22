'use strict';

const AbstractConstraint = require('./AbstractConstraint');
const UnexpectedValueError = require('../Error/UnexpectedValueError');
const TypeHelper = require('../Helper/TypeHelper');

module['exports'] = class ArrayHasIndex extends AbstractConstraint
{
    /**
     * @param {Number} index
     */
    constructor(index)
    {
        super();
        if (false === TypeHelper.isInteger(index) || 0 > index) {
            throw new UnexpectedValueError('ArrayHasIndex <index> is not valid');
        }

        this.index = index;
    }

    /**
     * @param {Array} other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        if (false === TypeHelper.isArray(other)) {
            return false;
        }

        return this.index < other.length;
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return 'has the index ' + this.exporter.export(this.index);
    }

    /**
     * @param other
     *
     * @returns {string}
     */
    failureDescription(other)
    {
        return 'an array ' + this.toString();
    }
};
