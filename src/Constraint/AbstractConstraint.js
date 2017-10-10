'use strict';

const Exporter = require('../Exporter/Exporter');
const ConstraintMismatchError = require('../Error/ConstraintMismatchError');

module['exports'] = class AbstractConstraint
{
    constructor()
    {
        this.exporter = new Exporter();
    }

    /**
     * @param other
     *
     * @returns {boolean}
     */
    matches(other)
    {
        return false;
    }

    /**
     *
     * @param other
     * @param {String} description
     * @param {boolean} returnResult
     *
     * @returns {boolean}
     */
    evaluate(other, description = '', returnResult = false)
    {
        let success = false;

        if (this.matches(other)) {
            success = true;
        }

        if (returnResult) {
            return success;
        }

        if (false === success) {
            this.fail(other, description);
        }
    }

    /**
     * @param other
     * @returns {string}
     */
    failureDescription(other)
    {
        return `<${this.exporter.export(other)}> ` + this.toString();
    }

    /**
     * @param other
     * @param {String} description
     */
    fail(other, description)
    {
        let otherDescription = this.failureDescription(other);
        let failureDescription = `Failed asserting that ${otherDescription}`;
        if (description) {
            failureDescription = `${description} ${failureDescription}`;
        }

        throw new ConstraintMismatchError(failureDescription);
    }
};
