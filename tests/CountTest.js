'use strict';

const AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class CountTest extends AbstractTestCase
{
    testArray()
    {
        this.assertCount(0, []);
        this.assertCount(1, [7]);
        this.assertCount(3, ['test', 2, {}]);
    }

    testMap()
    {
        this.assertCount(0,  new Map());

        let map3 = new Map();
        map3.set('age', 1);
        map3.set('name', 'Jonh');
        map3.set('options', {});
        this.assertCount(3, map3);
    }

    testSet()
    {
        this.assertCount(0,  new Set());

        let set5 = new Set();
        set5.add('sheme');
        set5.add('host');
        set5.add('port');
        set5.add('db');
        set5.add('table');
        this.assertCount(5, set5);
    }

    _makeClassOfIteratorInterface(internalArray)
    {
        class OfIteratorInterface
        {
            constructor(internalArray)
            {
                if (false === internalArray instanceof Array) {
                    throw new Error('internalArray expected to be instanceof Array');
                }

                this._internalArray = internalArray;
            }

            [Symbol.iterator]() {
                const arr = this._internalArray;
                let i = 0;
                return {
                    next() {
                        if(i >= arr.length) {
                            return { 'value': undefined, done: true };
                        }

                        return { 'value': arr[i++], done: false };
                    }
                };
            };
        }

        return new OfIteratorInterface(internalArray);
    }

    testIterator()
    {
        let emptyArr = [];
        this.assertCount(0, emptyArr.entries());
        let arr = [1, 2, 3];
        this.assertCount(3, arr.entries());

        this.assertCount(0, this._makeClassOfIteratorInterface([]));
        this.assertCount(2, this._makeClassOfIteratorInterface([4, 8]));
        this.assertCount(3, this._makeClassOfIteratorInterface(['test', {'name': 'test'}, [1, 2, 3]]));
    }

    testObject()
    {
        this.assertCount(2, {'length' : 2});
        this.assertCount(2, { length() { return 2;} });

        this.assertCount(5, {'size' : 5});
        this.assertCount(5, { size() { return 5;} });
    }
};
