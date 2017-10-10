'use strict';

const AbstractConstraint = require('./AbstractConstraint');
const UnexpectedValueError = require('../Error/UnexpectedValueError');

module['exports'] = class IsTypeOf extends AbstractConstraint
{
    /**
     * @param {String} type
     */
    constructor(type)
    {
        super();
        if (false === this.__isValidType(type)) {
            throw new UnexpectedValueError('TypeOfConstraint <type> expected to be valid javascript type');
        }

        this.type = type;
    }

    /**
     * @param {String} type
     * @returns {boolean}
     * @private
     */
    __isValidType(type)
    {
        let validTypes = [
            'undefined',
            'object',
            'boolean',
            'number',
            'string',
            'symbol',
            'function'
        ];


        return 'string' === typeof type || true === validTypes.includes(type);
    }

    /**
     * @param other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        return typeof other === this.type;
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return `is of type <${this.exporter.export(this.type)}>`;
    }
};
