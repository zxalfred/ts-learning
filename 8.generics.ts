function identity<T>(arg: T): T {
  return arg
}

// Working with Generic Type Variables
function loggingIdentity<T>(arg: T): T {
  // console.log(arg.length) // error!

  return arg
}

// work on arrays of T
function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

// or
function loggingIdentity3<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}

// Generic Types
interface GenericIdentityFn {
  <T>(arg: T): T
}
function identity2(arg) {
  return arg
}
let myIdentity: GenericIdentityFn = identity2

interface GenericIdentityFn2<T> {
  (arg: T): T
}
function identity3<T>(arg: T): T {
  return arg
}
let myIdentity2: GenericIdentityFn2<number> = identity3

// Generic Classes
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}

// A class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.

// Generic Constraints
interface Lengthwise {
  length: number
}
function loggingIdentity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
loggingIdentity4({length: 4, value: 'a'})

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, "a")
getProperty(x, "m")

// Using Class Types in Generics
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;