'use strict';

let AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class TypeOfTest extends AbstractTestCase
{
    __setUp()
    {
        this.undef = undefined;
        this.obj = {};
        this.array = [];
        this.true = true;
        this.false = false;
        this.intNumber = 7;
        this.floatNumber = 9.99;
        this.nan = NaN;
        this.nil = null;
        this.str = 'name';
        this.sym = Symbol();
        this.func = function () {};
    }

    testIsTypeOf()
    {
        this.assertIsTypeOf('undefined', this.undef);
        this.assertIsTypeOf('object', this.obj);
        this.assertIsTypeOf('object', this.array);
        this.assertIsTypeOf('boolean', this.true);
        this.assertIsTypeOf('boolean', this.false);
        this.assertIsTypeOf('number', this.intNumber);
        this.assertIsTypeOf('number', this.floatNumber);
        this.assertIsTypeOf('number', this.nan);
        this.assertIsTypeOf('object', this.nil);
        this.assertIsTypeOf('string', this.str);
        this.assertIsTypeOf('symbol', this.sym);
        this.assertIsTypeOf('function', this.func);
    }
};
