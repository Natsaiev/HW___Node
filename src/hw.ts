// Задание 1

class Animal {
  public name: string;
  public species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  sound(): void {
    console.log("The animal makes a sound");
  }
}

class Dog extends Animal {
  public breed: string;

  constructor(name: string, species: string, breed: string) {
    super(name, species);
    this.breed = breed;
  }

  sound(): void {
    console.log(`The dogs ${this.breed}`);
  }
}

const animal = new Animal("Animal", "Unknown");
const dog = new Dog("Dog", "Dog", "Breed");

animal.sound();
dog.sound();

// Задание 2

class Library {
  static totalBooks: number = 0;

  addBook(): void {
    Library.totalBooks++;
  }
}

const library = new Library();
const library2 = new Library();
const library3 = new Library();

library.addBook();
library2.addBook();
library3.addBook();

console.log(Library.totalBooks);

// Задание 3

class Vehicle {
  public make: string;
  public model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  public type: string;

  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}

const motorcycle = new Motorcycle("Audi", "A8", "Sport");
console.log(motorcycle);
