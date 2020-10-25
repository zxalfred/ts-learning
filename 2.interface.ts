function printLabel(labeledObj: {label: string}) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

interface LabeledValue {
  label: string
}

function printLabel2(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}

let myObj2 = {
  size: 10,
  label: 'Size 10 Object',
}

printLabel2(myObj2)

// optional properties
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number} {
  return { color: config.color || 'red', area: config.width || 100 }
}

// readonly properties
interface Point {
  readonly x: number
  readonly y: number
}
let p1: Point = { x: 10, y: 20}
// p1.x = 5 // error!

// readonly array
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

// excess property checks
// Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error:
let mySquare = createSquare({ colour: 'red', width: 100})

// to get around of this checking
// 1.
let mySquare2 = createSquare({ colour: 'red', width: 100} as SquareConfig)

// 2.
interface SquareConfig2 {
  color?: string
  width?: number
  [key: string]: any
}

// 3.
let squareOptions = { colour: 'red', width: 100}
createSquare(squareOptions)

// Function Types
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}
// the names of the parameters do not need to match.
let mySearch2: SearchFunc
mySearch2 = function(src, sub) {
  let result = src.search(sub)
  return result > -1
}

// Indexable Types
interface StringArray {
  [index: number]: string | number
}

let myArray: StringArray
myArray = ['Bob', 'Fred', 123]

//There are two types of supported index signatures: string and number. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. 
interface Animal {
  name: string
}
interface Dog extends Animal {
  breed: string
}
interface NotOkay {
  [x: number]: Animal
  [x: string]: Dog
}

// While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type
interface NumberOrStringDictionary {
  [index: string]: number | string
  length: number
  name: string
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
myArray2[2] = "Mallory"; // error!

// class types
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date = new Date
  constructor(h: number, m: number) {
  }
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}

class Clock2 implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) {}
}
// This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.

// Instead, you would need to work with the static side of the class directly. In this example, we define two interfaces, ClockConstructor for the constructor and ClockInterface for the instance methods. Then, for convenience, we define a constructor function createClock that creates instances of the type that is passed to it:
interface ClockConstructor2 {
  new (hour: number, minute: number): ClockInterface2
}
interface ClockInterface2 {
  tick(): void
}
function createClock(
  ctor: ClockConstructor2,
  hour: number,
  minute: number,
): ClockInterface2 {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}
class  AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// another simple way is to use class expressions
const Clock3: ClockConstructor2 = class implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}

// Extending Interface
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0

// Hybrid Types
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter
  counter.interval = 123
  counter.reset = function() {}
  return counter
}
let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

// Interface Extending Classes
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// SelectableControl can only be implemented by subclass of Control
class Image implements SelectableControl {
  private state: any
  select() {}
}


export default {}
