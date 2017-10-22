'use strict';

const AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class IsTrueFalseTest extends AbstractTestCase
{
    testIsTrue()
    {
        this.assertIsTrue(true);
        this.assertIsTrue(1 > 0);
        this.assertIsTrue(0 === [].length);

        this.assertIsNotTrue(0);
        this.assertIsNotTrue(1);
        this.assertIsNotTrue(false);
        this.assertIsNotTrue(undefined);
        this.assertIsNotTrue(null);
        this.assertIsNotTrue(NaN);
        this.assertIsNotTrue('');
        this.assertIsNotTrue('test');
        this.assertIsNotTrue(Symbol());
        this.assertIsNotTrue({});
        this.assertIsNotTrue({'name': 'test'});
        this.assertIsNotTrue([]);
        this.assertIsNotTrue([1]);
    }

    testIsFalse()
    {
        this.assertIsFalse(false);
        this.assertIsFalse(0 > 1);
        this.assertIsFalse(0 !== [].length);

        this.assertIsNotFalse(0);
        this.assertIsNotFalse(1);
        this.assertIsNotFalse(true);
        this.assertIsNotFalse(undefined);
        this.assertIsNotFalse(null);
        this.assertIsNotFalse(NaN);
        this.assertIsNotFalse('');
        this.assertIsNotFalse('test');
        this.assertIsNotFalse(Symbol());
        this.assertIsNotFalse({});
        this.assertIsNotFalse({'name': 'test'});
        this.assertIsNotFalse([]);
        this.assertIsNotFalse([1]);
    }
};
