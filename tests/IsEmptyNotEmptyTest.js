'use strict';

const AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class IsEmptyNotEmptyTest extends AbstractTestCase
{
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

    testIsEmpty()
    {
        this.assertIsEmpty(undefined);
        this.assertIsEmpty(0);
        this.assertIsEmpty(0.0);
        this.assertIsEmpty(null);
        this.assertIsEmpty(false);
        this.assertIsEmpty([]);
        this.assertIsEmpty({});
        class A {};
        this.assertIsEmpty(new A());
        this.assertIsEmpty(new Map());
        this.assertIsEmpty(new Set());
        this.assertIsEmpty(this._makeClassOfIteratorInterface([]));
    }

    testIsNotEmpty()
    {
        this.assertIsNotEmpty(1);
        this.assertIsNotEmpty(0.001);
        this.assertIsNotEmpty('0');
        this.assertIsNotEmpty('test');
        this.assertIsNotEmpty(true);
        this.assertIsNotEmpty([1]);
        this.assertIsNotEmpty({'name': 'test'});
        class A
        {
            constructor(name)
            {
                this.name = name;
            }
        }
        this.assertIsNotEmpty(new A());
        class B extends A
        {
        }
        this.assertIsNotEmpty(new B());
        this.assertIsNotEmpty(this._makeClassOfIteratorInterface(['a']));
        this.assertIsNotEmpty(new Set([1, 2, 3]));
        let map = new Map();
        map.set('name', 'Test');
        map.set('options', {});
        this.assertIsNotEmpty(map);
    }
};
