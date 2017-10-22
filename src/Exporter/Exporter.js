'use strict';

const TypeHelper = require('../Helper/TypeHelper');

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
                if (TypeHelper.isNull(value)) {
                    return 'null';
                }

                if (value.hasOwnProperty('toString')) {
                    return value.toString();
                }

                if (TypeHelper.isArray(value)) {
                    let arrayExported = 'Array[ \n';
                    for (let key of value.keys()) {
                        let val = this.__recursiveExport(value[key]);
                        arrayExported += `\t ${key} => ${val} \n`;
                    }

                    return arrayExported + ']';
                }

                if (TypeHelper.isMap(value)) {
                    let mapExported = 'Map[ \n';
                    for (let [key, v] of value.keys()) {
                        let val = this.__recursiveExport(v);
                        mapExported += `\t ${key} => ${val} \n`;
                    }

                    return mapExported + ']';
                }

                if (TypeHelper.isSet(value)) {
                    let setExported = 'Set[ \n';
                    for (let item of value) {
                        let val = this.__recursiveExport(item);
                        setExported += `\t ${val}, \n`;
                    }

                    return setExported + ']';
                }

                return `{${value.constructor.name}}`;
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
