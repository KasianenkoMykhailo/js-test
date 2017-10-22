'use strict';

const UnexpectedValueError = require('../Error/UnexpectedValueError');

module['exports'] = class TypeHelper
{
    /**
     * @param {String} type
     * @returns {boolean}
     */
    static isValidType(type)
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


        return TypeHelper.isString(type) && validTypes.includes(type);
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isNull(value)
    {
        return null === value;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isObject(value)
    {
        return 'object' === typeof value && !TypeHelper.isNull(value);
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isFunction(value)
    {
        return 'function' === typeof value;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isString(value)
    {
        return 'string' === typeof value;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isArray(value)
    {
        return TypeHelper.isObject(value) && value instanceof Array;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isMap(value)
    {
        return TypeHelper.isObject(value) && value instanceof Map;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isSet(value)
    {
        return TypeHelper.isObject(value) && value instanceof Set;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isNumber(value)
    {
        return 'number' === typeof value;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isInteger(value)
    {
        return TypeHelper.isNumber(value) && Number.isInteger(value);
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isNaN(value)
    {
        return TypeHelper.isNumber(value) && Number.isNaN(value);
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isValidCount(value)
    {
        return TypeHelper.isInteger(value) && value >= 0;
    }

    /**
     * @param value
     *
     * @returns {Number|null}
     */
    static normalizeCount(value)
    {
        let count = value;
        if (TypeHelper.isFunction(value)) {
            count = count();
        }

        if (TypeHelper.isValidCount(count)) {
            return count;
        }

        return null;
    }

    /**
     * @param value
     *
     * @returns {Number|null}
     */
    static getSizeOrLength(value)
    {
        if (false === TypeHelper.isObject(value)) {
            return null;
        }

        let size = value['size'];
        if (null !== (size = TypeHelper.normalizeCount(size))) {
            return size;
        }

        let length = value['length'];
        if (null !== (length = TypeHelper.normalizeCount(length))) {
            return length;
        }

        return null;
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isIterable(value)
    {
        if (false === TypeHelper.isObject(value)) {
            return false;
        }

        return TypeHelper.isFunction(value[Symbol.iterator]);
    }

    /**
    * @param value
    *
    * @returns {boolean}
    */
    static isCountable(value)
    {
        let count = TypeHelper.getSizeOrLength(value);
        if (false === TypeHelper.isNull(count)) {
            return true;
        }

        return TypeHelper.isIterable(value);
    }

    /**
    * @param value
    *
    * @returns {Number}
    */
    static countIterable(value)
    {
        if (false === TypeHelper.isIterable(value)) {
            throw new UnexpectedValueError('cant not count non iterable value');
        }

        let iterator = value[Symbol.iterator]();
        let count = 0;
        while (!iterator.next().done) {
            count++;
        }

        return count;
    }
};
