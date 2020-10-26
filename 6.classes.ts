// Classes
class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return `Hello, ${this.greeting}`
  }
}

let greeter = new Greeter('world')

// Inheritance
class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}
class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}

let sam = new Snake('Sammy the Python')
let tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(34)

// public by default
class Animal2 {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// ECMAScript Private Fields
class Animal3 {
  #name: string
  constructor(theName: string) {
    this.#name = theName
  }
}

// new Animal('Cat').#name // error!

// Understanding TypeScript's private
// However, when comparing types that have private and protected members, we treat these types differently. For two types to be considered compatible, if one of them has a private member, then the other must have a private member that originated in the same declaration. The same applies to protected members.
class Animal4 {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}
class Rhino extends Animal4 {
  constructor() {
    super('Rhino')
  }
}
class Employee {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}
let animal = new Animal4('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')
animal = rhino
 // animal = employee // error

 // Understanding protected
class Person {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}
class Employee2 extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee2('Howard', 'Sales')
console.log(howard.getElevatorPitch());
// console.log(howard.name); // error!
// let john = new Person("John") // error!

// Readonly Modifier
class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8

  constructor(theName: string) {
    this.name = theName
  }
}

let dad = new Octopus("Man with the 8 strong legs")
// dad.name = "Man with the 3-piece suit"

// Parameter properties
class Octopus2 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}
let dad2 = new Octopus("Man with the 8 strong legs");
dad2.name;

// Accessors
const fullNameMaxLength = 10

class Employee3 {
  private _fullName: string = ''

  get fullName() {
    return this._fullName
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error(`full name has max length of ${fullNameMaxLength}`)
    }
    this._fullName = newName
  }
}

// Static Properties
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

// Abstract Classes
abstract class Animal {
  abstract makeSound(): void

  move(): void {
    console.log('roaming the earth...')
  }
}
