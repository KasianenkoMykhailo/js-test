'use strict';

let AbstractConstraint = require('../src/Constraint/AbstractConstraint');
let ConstraintMismatchError = require('../src/Error/ConstraintMismatchError');
let colors = require('colors/safe');

let abstractConstraint = new AbstractConstraint();

if (false !== abstractConstraint.evaluate(11, 'Check Abstract Constraint behaviour', true)) {
    console.log(colors.red('Self test failed! abstract evaluate should return false'));
}

try {
    abstractConstraint.evaluate('foo');
    console.log(colors.red('Self test failed! abstract evaluate should throw error'));

    return;
} catch(e) {
    if (false === e instanceof ConstraintMismatchError) {
        console.log(colors.red('ConstraintMismatchError expected'));

        return;
    }
}

console.log(colors.green('Self test successfully passed!'));