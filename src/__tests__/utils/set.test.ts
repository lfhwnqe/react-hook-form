import set from '../../utils/set';

describe('set', () => {
  it('set the correct values', () => {
    const test1 = { a: [{ b: { c: 3 } }] };
    set(test1, 'a[0].b.c', 4);
    expect(test1.a[0].b.c).toEqual(4);

    const test2 = { foo: { bar: 'baz' } };
    set(test2, 'foo.arr[0]', 3);
    expect(test2).toEqual({
      foo: {
        bar: 'baz',
        arr: [3],
      },
    });

    const test3 = { foo: { bar: 'baz' } };
    set(test3, 'foo.arr["1"]', true);
    expect(test3).toEqual({
      foo: {
        bar: 'baz',
        arr: [, true],
      },
    });

    const test4 = { foo: { bar: 'baz' } };
    set(test4, 'foo.obj.key', 'test');
    expect(test4).toEqual({
      foo: {
        bar: 'baz',
        obj: { key: 'test' },
      },
    });

    const test5 = { foo: 1 };
    set(test5, 'foo.obj.key', 3);
    expect(test5).toEqual({
      foo: {
        obj: {
          key: 3,
        },
      },
    });

    const test6 = {};
    set(test6, 'foo.arr[0].obj.key', 1);
    expect(test6).toEqual({
      foo: {
        arr: [
          {
            obj: {
              key: 1,
            },
          },
        ],
      },
    });

    const test7 = { a: [{ b: { c: 3 } }] };
    set(test7, 'a', undefined);
    expect(test7).toEqual({
      a: undefined,
    });
  });

  it('not populate prototype', () => {
    set({}, '__proto__[test2]', '456');
    expect(Object.prototype).toEqual({});
  });

  it.each(['01', '1e2', ' 1', '+1', '4294967295'])(
    'keep the non-canonical numeric key %s as an object property',
    (key) => {
      const target = {};
      set(target, `codes.${key}`, 'value');

      expect(target).toEqual({ codes: { [key]: 'value' } });
      expect(Array.isArray((target as { codes: unknown }).codes)).toBe(false);
    },
  );

  it('create an array for a canonical numeric key', () => {
    const target = {};
    set(target, 'items.0', 'first');

    expect(target).toEqual({ items: ['first'] });
    expect(Array.isArray((target as { items: unknown }).items)).toBe(true);
  });
});
