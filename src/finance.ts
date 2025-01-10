// Задание 2

export namespace Finance {
  export class LoanCalculator {
    // Поля для хранения суммы кредита, годовой процентной ставки и срока кредита
    private readonly loanAmount: number;
    private readonly annualInterestRate: number;
    private readonly loanPeriod: number;

    // Конструктор инициализирует поля при создании экземпляра класса
    constructor(
      loanAmount: number, // Сумма кредита
      annualInterestRate: number, // Годовая процентная ставка (в процентах)
      loanPeriod: number // Срок кредита (в годах)
    ) {
      this.loanAmount = loanAmount;
      this.annualInterestRate = annualInterestRate;
      this.loanPeriod = loanPeriod;
    }

    // Метод для расчёта ежемесячного платежа по формуле аннуитета
    calculateMonthlyPayment(): string {
      const monthlyInterestRate = this.annualInterestRate / 100 / 12; // Преобразуем годовую ставку в месячную
      const numberOfPayments = this.loanPeriod * 12; // Общее количество платежей (месяцы)

      // Формула аннуитета: A = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const monthlyPayment =
        (this.loanAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      return monthlyPayment.toFixed(2); // Возвращаем результат, округлённый до двух знаков после запятой
    }
  }

  export class TaxCalculator {
    // Поле для хранения дохода
    private readonly income: number;

    // Конструктор инициализирует поле дохода
    constructor(income: number) {
      this.income = income;
    }

    // Метод для расчёта налога на доход с использованием прогрессивной шкалы
    calculateTax(): string {
      let tax = 0; // Начальное значение налога

      // Логика прогрессивной шкалы налогообложения
      if (this.income <= 50000) {
        tax = this.income * 0.1; // 10% налог для доходов до 50,000
      } else if (this.income <= 100000) {
        tax = 50000 * 0.1 + (this.income - 50000) * 0.15; // 10% на первые 50,000 и 15% на остаток
      } else {
        tax = 50000 * 0.1 + 50000 * 0.15 + (this.income - 100000) * 0.2; // 20% на доходы свыше 100,000
      }

      return tax.toFixed(2); // Возвращаем результат, округлённый до двух знаков после запятой
    }
  }
}
