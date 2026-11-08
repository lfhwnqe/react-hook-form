const MAX_ARRAY_INDEX = 2 ** 32 - 1;

export default (key: string) => {
  const index = Number(key);

  return (
    Number.isInteger(index) &&
    index >= 0 &&
    index < MAX_ARRAY_INDEX &&
    String(index) === key
  );
};
