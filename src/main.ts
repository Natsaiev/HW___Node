import { capitalize, reverseString } from "./stungsUtils";
import { Finance } from "./finance";
import { UserManagement } from "./userManagement";
import { generateFibonacci, generatePrimeNumbers } from "./sequenceUtils";

console.log(capitalize("hello"));
console.log(reverseString("world"));

// =========================================================

const loanCalculator = new Finance.LoanCalculator(100000, 10, 5);
console.log(
  "loanCalculator.calculateMonthlyPayment(): ",
  loanCalculator.calculateMonthlyPayment()
); // 2124.02

const taxCalculator = new Finance.TaxCalculator(60000);
console.log("taxCalculator.calculateTax(): ", taxCalculator.calculateTax()); // 6500

// ==========================================================

const adminUser = new UserManagement.Admin.AdminUser(
  "John Doe",
  "johndoe123@example.com",
  true
);
console.log("adminUser.getInfo(): ", adminUser.getInfo());
adminUser.setSuperAdminStatus(false);
console.log("adminUser.getInfo(): ", adminUser.getInfo());

// ==========================================================

const fibonacciSequence = generateFibonacci(10);
console.log("fibonacciSequence: ", fibonacciSequence); // [0, 1, 1, 2, 3, 5, 8, 13];
const primeNumbers = generatePrimeNumbers(10);
console.log("primeNumbers: ", primeNumbers); // [ 2, 3, 5, 7 ]
