export function printObject(obj: any) {
  const keys = Object.keys(obj);
  let maxKeyLength = 0;
  let maxValueLength = 0;

  const printBorder = () => {
    let line = '+';

    for (let i = 0; i < maxKeyLength + maxValueLength + 4; i++) {
      line += '-';
    }

    console.log(`${line}+`);
  };

  for (const key of keys) {
    if (key.length > maxKeyLength) {
      maxKeyLength = key.length;
    }

    if (`${obj[key]}`.length > maxValueLength) {
      maxValueLength = `${obj[key]}`.length;
    }
  }

  printBorder();

  for (const key of keys) {
    let line = '| ';

    for (let i = 0; i < maxKeyLength - key.length; i++) {
      line += ' ';
    }

    line += `${key.toUpperCase()}: ${obj[key]}`;

    for (let i = 0; i < maxValueLength - `${obj[key]}`.length; i++) {
      line += ' ';
    }

    console.log(`${line} |`);
  }

  printBorder();
}
