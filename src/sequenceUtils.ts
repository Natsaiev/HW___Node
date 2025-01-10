// Задание 4

// Функция для генерации последовательности Фибоначчи до указанного числа
export function generateFibonacci(limit: number): number[] {
  const fibonacci: number[] = [0, 1]; // Первые два числа Фибоначчи

  // Генерация последовательности, пока последнее число меньше указанного лимита
  while (fibonacci[fibonacci.length - 1] < limit) {
    const nextFibonacci =
      fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]; // Следующее число как сумма двух предыдущих
    fibonacci.push(nextFibonacci); // Добавляем следующее число в массив
  }

  return fibonacci; // Возвращаем последовательность чисел
}

// Функция для генерации простых чисел до указанного числа
export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = []; // Инициализация массива для простых чисел

  // Проверяем числа от 2 до указанного лимита
  for (let i = 2; i <= limit; i++) {
    let isPrime = true; // Флаг, указывающий, является ли число простым

    // Проверяем, делится ли число на любое из предыдущих чисел
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        // Если делится нацело, значит не простое
        isPrime = false;
        break; // Прерываем проверку
      }
    }

    if (isPrime) {
      // Если число простое, добавляем его в массив
      primes.push(i);
    }
  }

  return primes; // Возвращаем массив простых чисел
}

// Пример использования функций
const limit = 10; // Лимит для генерации последовательностей

// Генерация последовательности Фибоначчи
const fibonacciSequence = generateFibonacci(limit);
console.log("Fibonacci sequence:", fibonacciSequence); // [0, 1, 1, 2, 3, 5, 8]

// Генерация простых чисел
const primeNumbers = generatePrimeNumbers(limit);
console.log("Prime numbers:", primeNumbers); // [2, 3, 5, 7]
