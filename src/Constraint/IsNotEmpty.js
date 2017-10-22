'use strict';

const IsEmpty = require('./IsEmpty');

module['exports'] = class IsNotEmpty extends IsEmpty
{
    /**
     * @param other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        return !super.matches(other);
    }

    /**
     * Returns a string representation of the constraint.
     *
     * @returns {string}
     */
    toString()
    {
        return 'is Not Empty';
    }
};
