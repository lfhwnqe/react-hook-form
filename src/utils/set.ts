import { PROTOTYPE_KEYWORDS } from '../constants';
import type { FieldPath, FieldValues } from '../types';

import isArrayIndex from './isArrayIndex';
import isKey from './isKey';
import isObject from './isObject';
import stringToPath from './stringToPath';

export default (
  object: FieldValues,
  path: FieldPath<FieldValues>,
  value?: unknown,
) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;

  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;

    if (index !== lastIndex) {
      const objValue = object[key];
      newValue =
        isObject(objValue) || Array.isArray(objValue)
          ? objValue
          : isArrayIndex(tempPath[index + 1])
            ? []
            : {};
    }

    if (PROTOTYPE_KEYWORDS.includes(key)) {
      return;
    }

    object[key] = newValue;
    object = object[key];
  }
};
