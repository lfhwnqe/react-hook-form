import isArrayIndex from '../../utils/isArrayIndex';

describe('isArrayIndex', () => {
  it('return true for a canonical array index', () => {
    expect(isArrayIndex('0')).toBeTruthy();
    expect(isArrayIndex('1')).toBeTruthy();
    expect(isArrayIndex('42')).toBeTruthy();
    expect(isArrayIndex('4294967293')).toBeTruthy();
  });

  it.each(['01', '1e2', ' 1', '+1', '00', '0x1'])(
    'reject the non-canonical numeric string %s',
    (key) => {
      expect(isArrayIndex(key)).toBeFalsy();
    },
  );

  it('reject values outside the array index range', () => {
    expect(isArrayIndex('-1')).toBeFalsy();
    expect(isArrayIndex('4294967294')).toBeTruthy();
    expect(isArrayIndex('4294967295')).toBeFalsy();
    expect(isArrayIndex('9007199254740991')).toBeFalsy();
  });

  it('reject non-numeric and empty keys', () => {
    expect(isArrayIndex('')).toBeFalsy();
    expect(isArrayIndex('foo')).toBeFalsy();
    expect(isArrayIndex('1.5')).toBeFalsy();
    expect(isArrayIndex('NaN')).toBeFalsy();
    expect(isArrayIndex('Infinity')).toBeFalsy();
  });
});
