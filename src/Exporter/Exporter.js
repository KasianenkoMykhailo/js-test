'use strict';

module['exports'] = class Exporter
{
    /**
     * @param value
     * @returns {String}
     * @private
     */
    __recursiveExport(value)
    {
        switch (typeof value) {
            case 'undefined':
                return 'undefined';
            case 'object':
                if (null === value) {
                    return 'null';
                }

                if (value.hasOwnProperty('toString')) {
                    return value.toString();
                }

                if (value instanceof Array) {
                    let arrayExported = '';
                    for (let key of value.keys()) {
                        let val = this.__recursiveExport(value[key]);
                        arrayExported += `${key} => ${val} \n`;
                    }

                    return arrayExported;
                }

                return 'object';
            case 'boolean':
                return Boolean(value).toString();
            case 'number':
                return Number(value).toString();
            case 'string':
                return value;
            case 'symbol':
                return 'symbol';
            case 'function':
                return 'function';
            default:
            break;
        }

        return 'Unknown monkey';
    }

    /**
     * @param value
     * @returns {String}
     */
    export(value)
    {
        return this.__recursiveExport(value);
    }
};
