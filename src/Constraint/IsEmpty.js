'use strict';

const AbstractConstraint = require('./AbstractConstraint');
const TypeHelper = require('../Helper/TypeHelper');

module['exports'] = class IsEmpty extends AbstractConstraint
{
    /**
    * @param {Object} object
    *
    * @returns {boolean}
    */
    _isEmptyObject(object)
    {
        return Object.getOwnPropertyNames(object).length <= 0 && Object.getOwnPropertySymbols(object).length <= 0;
    }

    /**
     * @param other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        let otherType = typeof other;
        switch (otherType) {
            case 'undefined':
                return true;
            case 'boolean':
                return !other;
            case 'number':
                return 0 === other;
            case 'string':
                return '' === other;
            case 'symbol':
            case 'function':
                return false;
            case 'object':
                if (TypeHelper.isNull(other)) {
                    return true;
                }

                if (TypeHelper.isCountable(other)) {
                    let sizeOrLength = TypeHelper.getSizeOrLength(other);
                    if (null !== sizeOrLength) {
                        return 0 === sizeOrLength;
                    }

                    return 0 === TypeHelper.countIterable(other);
                }

                return this._isEmptyObject(other);
            default:
                break;
        }

        throw new Error(`Javascript has been changed dramatically, new type introduced: ${otherType}`);
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return 'is Empty';
    }
};
