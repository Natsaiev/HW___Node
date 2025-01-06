// Задание 1
function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greetUser("John"));

// Задание 2

interface Person {
  name: string;
  age: number;
  city: string;
}
function printPersonInfo(person: Person) {
  Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

printPersonInfo({ name: "John", age: 27, city: "New York" });

// Задание 3
function squareNumber(num: number): number {
  return num * num;
}

console.log(squareNumber(5));

// Задание 4
function isEven(num: number): boolean {
  return num % 2 === 0;
}

console.log(isEven(5));
console.log(isEven(4));

// Задание 5
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student) {
  Object.entries(student).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

printStudentInfo({ name: "John", grade: 100 });

// Задание 6
function logMassage(massage: string): void {
  console.log(massage);
}

logMassage("Hello, TypeScript!");
