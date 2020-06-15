import * as faker from 'faker';

export function getRandKeyValue<T = any>(obj: T) {
  const keys = Object.keys(obj) as (keyof T)[];
  const rand = faker.random.number(keys.length - 1);
  const key: keyof T = keys[rand];

  return {
    key,
    value: obj[key],
  };
}
