export function removeProps<T = any>(obj: T | T[], props: (keyof T)[]) {
  if (Array.isArray(obj)) {
    for (const o of obj) {
      for (const prop of props) {
        o[prop] = undefined;
        delete o[prop];
      }
    }
  } else {
    for (const prop of props) {
      obj[prop] = undefined;
      delete obj[prop];
    }
  }

  return obj;
}
