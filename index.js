const mixed = { a: [1, 2, { b: 3 }], c: { d: 4, e: [5, { f: 6 }] } };

function sumNested(obj) {
  let sum = 0;

  if (typeof obj === "number") {
    sum += obj;
  }
  if (Array.isArray(obj)) {
    for (let index = 0; index < obj.length; index++) {
      sum += sumNested(obj[index]);
    }
  }
  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (const key in obj) {
      sum += sumNested(obj[key]);
    }
  }

  return sum;
}

// console.log();

console.log(sumNested(mixed));
