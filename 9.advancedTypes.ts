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
