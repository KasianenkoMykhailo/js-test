'use strict';

let AbstractConstraint = require('./AbstractConstraint');
let UnexpectedValueError = require('../Error/UnexpectedValueError');

module['exports'] = class ArrayHasIndex extends AbstractConstraint
{
    /**
     * @param {Number} index
     */
    constructor(index)
    {
        super();
        let indexType = typeof index;
        if ('number' !== indexType || false === Number.isInteger(index) || 0 > index) {
            throw new UnexpectedValueError(
                `ArrayHasIndex <index> expected to be {Integer}, got ${indexType}`
            );
        }

        this.index = Number.parseInt(index);
    }

    /**
     * @param {Array} other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        if (false === ('object' === typeof other)) {
            return false;
        }

        if (false === other instanceof Array) {
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
