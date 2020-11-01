// Type Guards and Differentiating Types
interface Bird {
  fly(): void
  layEggs(): void
}
interface Fish {
  swim(): void
  layEggs()
}

declare function getSmallPet(): Fish | Bird
let pet = getSmallPet()

if ('swim' in pet) {
  pet.swim()
}
// if (pet.fly) {
//   pet.fly()
// }

// To get the code working, we'll need to use a type assertion
let pet2= getSmallPet()
let fishPet = pet2 as Fish
let birdPet = pet2 as Bird
if (fishPet.swim) {
  fishPet.swim()
} else if (birdPet.fly) {
  birdPet.fly()
}

// User-Defined Type Guards
// To define a type guard, we simply need to define a function whose return type is a type predicate:
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

let pet3 = getSmallPet()
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

// The in operator also acts as a narrowing expression for types
function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim()
  }
  return pet.fly()
}

// typeof type guards
function isNumber(x: any): x is number {
  return typeof x === 'number'
}
function isString(x: any): x is string {
  return typeof x === 'string'
}
function padLeft(value: string, padding: string | number):string {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return `${padding}${value}`
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// It's painful! We can just write this
function padLeft2(value: string, padding: string | number): string {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof type guards
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}

  getPaddingString() {
    return Array(this.numSpaces + 1).join(' ')
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder(' ')
}

let padder: Padder = getRandomPadder()

if (padder instanceof SpaceRepeatingPadder) {
  padder
}
if (padder instanceof StringPadder) {
  padder
}

// Nullable types
// If use --strictNullChecks flag,  null or undefined is not assignable to any types

// Type guards and type assertions
interface UserAccount {
  id: number
  email?: string
}
declare function getUser(val: string): UserAccount | undefined
const user = getUser('admin')
user.id
if (user) {
  user.email.length
}
user!.email!.length
user?.email?.length

// Type alias
type Second = number
let timeInSecond: number = 10
let time: Second = 10

type Container<T> = { value: T }

type Tree<T> = {
  value: T
  left?: Tree<T>
  right?: Tree<T>
}

interface Tree2<T> {
  value: T
  left?: Tree2<T>
  right?: Tree2<T>
}

type LinkedList<Type> = Type & { next: LinkedList<Type> }

interface Person {
  name: string
}

declare function getDriversLicenseQueue(): LinkedList<Person>
let people = getDriversLicenseQueue()
people.name
people.next.name
people.next.next.name
people.next.next.next.name

const a: Window = window

// Polymorphic this types
class BasicCalculator {
  constructor(protected value: number = 0) {}
  currentValue(): number {
    return this.value
  }
  add(operand: number): this {
    this.value += operand
    return this
  }
  multiply(operand: number): this {
    this.value *= operand
    return this
  }
}
let v = new BasicCalculator(2).multiply(5).add(1).currentValue()

class ScientificCalculator extends BasicCalculator {
  constructor(value = 0) {
    super(value)
  }
  sin(): this {
    this.value = Math.sin(this.value)
    return this
  }
}
let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue()

// Index types
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n])
}

interface Car {
  manufacturer: string
  model: string
  year: number
}
let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Carmry',
  year: 2014
}

let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model'])
let modelYear = pluck(taxi, ['model', 'year'])

// Mapped types
type Partial1<T> = {
  [P in keyof T]?: T[P]
}
type Readonly1<T> ={
  readonly [P in keyof T]?: T[P]
}
