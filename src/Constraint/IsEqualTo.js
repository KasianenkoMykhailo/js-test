'use strict';

const AbstractConstraint = require('./AbstractConstraint');

module['exports'] = class IsEqualTo extends AbstractConstraint
{
    /**
     * @param value
     */
    constructor(value)
    {
        super();
        this.value = value;
    }

    /**
     * @param other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        return other === this.value;
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return `is Equal to <${this.exporter.export(this.value)}>`;
    }
};
