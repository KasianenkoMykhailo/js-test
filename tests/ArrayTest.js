'use strict';

const AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class ArrayTest extends AbstractTestCase
{
    __setUp()
    {
        this.arrayWithOneAndFiveIndexes = ['a', 'b', 'c', 'd', 'e', 'f'];
        this.anotherArrayWithOneAndFiveIndexes = new Array(6);
    }

    testArrayHasIndexConstraint()
    {
        this.assertArrayHasIndex(1, this.arrayWithOneAndFiveIndexes);
        this.assertArrayHasIndex(5, this.arrayWithOneAndFiveIndexes);

        this.assertArrayHasIndex(1, this.anotherArrayWithOneAndFiveIndexes);
        this.assertArrayHasIndex(5, this.anotherArrayWithOneAndFiveIndexes);
    }

    testArrayHasNoIndex()
    {
        this.assertArrayHasNoIndex(6, this.arrayWithOneAndFiveIndexes);
        this.assertArrayHasNoIndex(6, this.anotherArrayWithOneAndFiveIndexes);
    }
};
