// Задание 1

type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "John",
  permissions: ["read", "write"],
  email: "asdsad@example.com",
};

console.log(adminUser);


// Задание 2

type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
};

function printCarInfo(car: Car) {
  console.log(
    `Make: ${car.make}`,
    `Model: ${car.model}`,
    `Engine type: ${car.engine.type}`,
    `Engine horsepower: ${car.engine.horsepower}`
  );
  if (car.year) {
    console.log(`Year: ${car.year}`);
  }
}

const car: Car = {
  make: "BMW",
  model: "X5",
  engine: {
    type: "V8",
    horsepower: 400,
  },
  year: 2022,
};

printCarInfo(car);

// Задание 3

interface Product {
  name: string;
  price: number;
}

function calculateDiscount(product: Product, discount: number): number {
  return product.price * (1 - discount / 100);
}

const product: Product = {
  name: "Laptop",
  price: 3000,
};

const discountedPrice = calculateDiscount(product, 15);

console.log(`Discounted price: ${discountedPrice}`);

// Задание 4

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "John", salary: 3000 },
  { name: "Alice", salary: 4500 },
  { name: "Bart", salary: 1000 },
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map((employee) => employee.salary);
}

const salaries = getSalaries(employees);

console.log(`Зарплаты: ${salaries}`);

// Задание 5

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "Alice",
  lastName: "Smith",
  grade: 10,
};

function printStudentInfo(student: Student) {
  console.log(
    `Full name: ${student.firstName} ${student.lastName}, Grade: ${student.grade}`
  );
}

printStudentInfo(student);

// Задание 6

interface ConcatStrings {
  (str1: string, str2: string): string;
}

function concatStrings(str1: string, str2: string): string {
  return str1 + str2;
}

const result = concatStrings("Alice ", "Smith");

console.log(`Concatenated string: ${result}`);