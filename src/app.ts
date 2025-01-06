// Задание 1
const numbers = [1, 2, 3, 4, 5, 6];

const sum = sumEvenNumbers(numbers);

function sumEvenNumbers(numbers: number[]): number {
  let sum = 0;
  for (let number of numbers) {
    if (number % 2 === 0) {
      sum += number;
    }
  }
  return sum;
}
console.log(sum);

// Задание 2

interface StringToBooleanFunction {
  (value: string): boolean;
}

const isEmptyString: StringToBooleanFunction = (value: string): boolean => {
  return value.length === 0;
};

console.log(isEmptyString(""));
console.log(isEmptyString("Hello"));


// Задание 3

type CompareStrings = (a: string, b: string) => boolean;

const compareStrings: CompareStrings = (a: string, b: string): boolean => {
  return a === b;
};

console.log(compareStrings("Hello", "Hello"));
console.log(compareStrings("Hello", "World"));

// Задание 4
function getLastElement<T>(array: T[]): T {
  return array[array.length - 1];
}

console.log(getLastElement([1, 2, 3, 4, 5]));
console.log(getLastElement(["a", "b", "c"]));


// Задание 5

function makeTriple<T>(arg1: T, arg2: T, arg3: T): T[] {
  return [arg1, arg2, arg3];
}

console.log(makeTriple(1, 2, 3));
console.log(makeTriple("a", "b", "c"));
