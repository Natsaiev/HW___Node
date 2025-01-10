// Задание 1
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Dog barks";
  }
}

class Cat extends Animal {
  makeSound(): string {
    return "Cat meows";
  }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => {
  console.log(animal.makeSound());
});

// Задание 2
abstract class Shape {
  abstract color: string;
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract getColorAndNameOfShape(): string;
  abstract name: string;
}

class ColoredCircle extends ColoredShape {
  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
  constructor(
    public name: string,
    public radius: number,
    public color: string
  ) {
    super();
  }
  getColorAndNameOfShape(): string {
    return `Name: ${this.name}, Color: ${this.color}`;
  }
}

class ColoredRectangle extends ColoredShape {
  calculateArea(): number {
    return this.width * this.height;
  }
  constructor(
    public name: string,
    public width: number,
    public height: number,
    public color: string
  ) {
    super();
  }
  getColorAndNameOfShape(): string {
    return `Name: ${this.name}, Color: ${this.color}`;
  }
}

const coloredShapes: ColoredShape[] = [
  new ColoredCircle("Circle", 5, "red"),
  new ColoredRectangle("Rectangle", 4, 6, "blue"),
];

coloredShapes.forEach((shape) => {
  console.log(shape.calculateArea());
  console.log(shape.getColorAndNameOfShape());
});

// Задание 3

abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing machine turned on");
  }
  turnOff(): void {
    console.log("Washing machine turned off");
  }
}
class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator turned on");
  }
  turnOff(): void {
    console.log("Refrigerator turned off");
  }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];

appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});

// Задание 4

abstract class Account {

    abstract deposit(amount: number): number;

    abstract withdraw(amount: number): number;

}

class SavingsAccount extends Account {
    private balance: number;
    constructor(balance: number) {
        super();
        this.balance = balance;
    }
    deposit(amount: number): number {
        return this.balance += amount;
    }

    withdraw(amount: number): number {
        return this.balance -= amount;
    }

}


class CheckingAccount extends Account {
    private balance: number;
    constructor(balance: number) {
        super();
        this.balance = balance;
    }

    deposit(amount: number): number {
        return this.balance += amount;
    }

    withdraw(amount: number): number {
        return this.balance -= amount;
    }
}

const savingsAccount = new SavingsAccount(5000);
console.log("savingsAccount: ", savingsAccount);
console.log("savingsAccount.deposit(10): ", savingsAccount.deposit(10));
console.log("savingsAccount.withdraw(50): ", savingsAccount.withdraw(50));

console.log("");

const checkingAccount = new CheckingAccount(5000);
console.log("checkingAccount: ", checkingAccount);
console.log("checkingAccount.deposit(10): ", checkingAccount.deposit(10));
console.log("checkingAccount.withdraw(50): ", checkingAccount.withdraw(50));
// ===============================================================================

// Задание 5

abstract class Media {
  abstract play(): void;
}

class Audios extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

const media: Media[] = [new Audios(), new Video()];

media.forEach((medium) => {
  medium.play();
});
