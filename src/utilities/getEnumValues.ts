interface Enum {
  [id: number]: string | number;
}

export default (enumType: Enum, valueType: 'number' | 'string') =>
  Object.values(enumType).filter((x) => typeof x === valueType);
