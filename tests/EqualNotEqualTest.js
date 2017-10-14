'use strict';

const AbstractTestCase = require('../src/TestCase/AbstractTestCase');

module['exports'] = class EqualNotEqualTest extends AbstractTestCase
{
    testUndefined()
    {
        this.assertEquals(undefined, undefined);
        this.assertEquals(undefined, {}.name);
        this.assertEquals(undefined, {'n': 't'}[0]);
        this.assertEquals(undefined, [][0]);

        this.assertNotEquals(undefined, {});
        this.assertNotEquals(undefined, []);
        this.assertNotEquals(undefined, [1, 2, 3]);
        this.assertNotEquals(undefined, ['name', false]);
        this.assertNotEquals(undefined, [false]);
        this.assertNotEquals(undefined, true);
        this.assertNotEquals(undefined, false);
        this.assertNotEquals(undefined, 10);
        this.assertNotEquals(undefined, 9.99);
        this.assertNotEquals(undefined, NaN);
        this.assertNotEquals(undefined, null);
        this.assertNotEquals(undefined, 'name');
        this.assertNotEquals(undefined, Symbol());
        this.assertNotEquals(undefined, Symbol('undefined'));
        this.assertNotEquals(undefined, function() {});
        this.assertNotEquals(undefined, function() {return false;});
        this.assertNotEquals(undefined, function() {return undefined;});
        this.assertNotEquals(undefined, function() {return null;});
    }

    testObject()
    {
        let obj, sameObj;
        obj = sameObj = {'name': 'test'};
        this.assertEquals(obj, sameObj);

        this.assertNotEquals({'name': 'test'}, obj);
        this.assertNotEquals({'name': 'test'}, sameObj);
        this.assertNotEquals({'name': 'test'}, undefined);
        this.assertNotEquals({'name': 'test'}, {'name': 'test'});
        this.assertNotEquals({'name': 'test'}, []);
        this.assertNotEquals({'name': 'test'}, [1, 2, 3]);
        this.assertNotEquals({'name': 'test'}, ['name', false]);
        this.assertNotEquals({'name': 'test'}, [false]);
        this.assertNotEquals({'name': 'test'}, true);
        this.assertNotEquals({'name': 'test'}, false);
        this.assertNotEquals({'name': 'test'}, 8);
        this.assertNotEquals({'name': 'test'}, 0);
        this.assertNotEquals({'name': 'test'}, 0.1);
        this.assertNotEquals({'name': 'test'}, 0.0);
        this.assertNotEquals({'name': 'test'}, NaN);
        this.assertNotEquals({'name': 'test'}, null);
        this.assertNotEquals({'name': 'test'}, 'name');
        this.assertNotEquals({'name': 'test'}, 'test');
        this.assertNotEquals({'name': 'test'}, Symbol());
        this.assertNotEquals({'name': 'test'}, function() {});
        this.assertNotEquals({'name': 'test'}, function() {return false;});
        this.assertNotEquals({'name': 'test'}, function() {return undefined;});
        this.assertNotEquals({'name': 'test'}, function() {return null;});
        this.assertNotEquals({'name': 'test'}, function() {return {'name': 'test'};});
    }

    testTrue()
    {
        this.assertEquals(true, true);
        this.assertEquals(true, 1 === 1);

        this.assertNotEquals(true, undefined);
        this.assertNotEquals(true, {'name': 'test'});
        this.assertNotEquals(true, []);
        this.assertNotEquals(true, [1, 2, 3]);
        this.assertNotEquals(true, false);
        this.assertNotEquals(true, 7);
        this.assertNotEquals(true, 0);
        this.assertNotEquals(true, 1.1);
        this.assertNotEquals(true, NaN);
        this.assertNotEquals(true, null);
        this.assertNotEquals(true, 'name');
        this.assertNotEquals(true, Symbol());
    }

    testNotEqualsFalse()
    {
        this.assertEquals(false, false);
        this.assertEquals(false, 0 > 1);

        this.assertNotEquals(false, undefined);
        this.assertNotEquals(false, {'name': 'test'});
        this.assertNotEquals(false, []);
        this.assertNotEquals(false, [][0]);
        this.assertNotEquals(false, {}.name);
        this.assertNotEquals(false, [1, 2, 3]);
        this.assertNotEquals(false, 7);
        this.assertNotEquals(false, 0);
        this.assertNotEquals(false, 1.1);
        this.assertNotEquals(false, NaN);
        this.assertNotEquals(false, null);
        this.assertNotEquals(false, 'name');
        this.assertNotEquals(false, Symbol());
    }

    testArray()
    {
        let arr, sameArr;
        arr = sameArr = [1, 2, 3];
        this.assertEquals(arr, sameArr);

        this.assertNotEquals([1, 7, 100], undefined);
        this.assertNotEquals([1, 7, 100], 1);
        this.assertNotEquals([1, 7, 100], {0:1, 1:7, 2:100});
        this.assertNotEquals([1, 7, 100], new Array(1, 7, 100));
    }

    testInteger()
    {
        this.assertEquals(7, 7);
        this.assertEquals(7, ((n) => n)(7));

        this.assertNotEquals(7, 7.1);
        this.assertNotEquals(7, 10);
        this.assertNotEquals(7, 0);
        this.assertNotEquals(7, false);
        this.assertNotEquals(7, true);
        this.assertNotEquals(7, {'value': 7});
        this.assertNotEquals(7, [7, 7, 7, 7, 7, 7, 7]);
    }

    testNan()
    {
        this.assertNotEquals(NaN, NaN);
        this.assertNotEquals(NaN, undefined);
        this.assertNotEquals(NaN, {});
        this.assertNotEquals(NaN, []);
        this.assertNotEquals(NaN, true);
        this.assertNotEquals(NaN, false);
        this.assertNotEquals(NaN, 0);
        this.assertNotEquals(NaN, 7);
        this.assertNotEquals(NaN, 0.0000000000001);
        this.assertNotEquals(NaN, null);
        this.assertNotEquals(NaN, '');
        this.assertNotEquals(NaN, NaN);
        this.assertNotEquals(NaN, 'name');
        this.assertNotEquals(NaN, ((n) => n)(NaN));
    }

    testString()
    {
        this.assertEquals('test_name', 'test_name');
        this.assertEquals('test_name', ((n) => n)('test_name'));
        this.assertEquals('test_name', String({'toString': () => 'test_name'}));

        this.assertNotEquals('test_name', {'toString': () => 'test_name'});
        this.assertNotEquals('test_name', undefined);
        this.assertNotEquals('test_name', {});
        this.assertNotEquals('test_name', []);
        this.assertNotEquals('test_name', true);
        this.assertNotEquals('test_name', false);
        this.assertNotEquals('test_name', 1);
        this.assertNotEquals('test_name', 0);
        this.assertNotEquals('test_name', NaN);
        this.assertNotEquals('test_name', null);
        this.assertNotEquals('test_name', ['test_name']);
        this.assertNotEquals('test_name', ['t', 'e','s','t','_','n','a','m','e']);
        this.assertNotEquals('test_name', Symbol('test_name'));
        this.assertNotEquals('test_name', () => '');
    }
};