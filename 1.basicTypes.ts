// boolean
let isDown: boolean = false

// number
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

// string
let name: string = 'bob'
name = 'smith'

let name2: string = `Gene`
let age: number = 37
let sentence: string = `Hello, my name is ${name}.
  I'll be ${age + 1} years old next month.`

// array
// 1. Type []
let list: number[] = [1, 2, 3]

// 2. Array<Type> 
let list2: Array<number> = [1, 2, 3]


// tuple
// Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. 
let x: [string, number]
x = ['hello', 10]
// x = [10, 'hello'] is not allowed

// Accessing an element outside the set of known indices fails with an error:
// x[3] = 'world'

//enum
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green
//By default, enums begin numbering their members starting at 0. You can change this by manually setting the value of one of its members. For example, we can start the previous example at 1 instead of 0:
enum Color2 {
  Red = 1,
  Green,
  Blue,
}
let c2: Color2 = Color2.Green
// Or, even manually set all the values in the enum:
enum Color3 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c3: Color3 = Color3.Green

// unknown
let notSure: unknown = 4
notSure = 'maybe a string instead'
notSure = false

// If you have a variable with an unknown type, you can narrow it to something more specific by doing typeof checks, comparison checks, or more advanced type guards that will be discussed in a later chapter:
declare const maybe: unknown
// const aNumber: number = maybe // Type 'unknown' is not assignable to type 'number'.
if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  // const aString: string = maybe // Type 'boolean' is not assignable to type 'string'.
}

// any
declare function getValue(key: string): any
const str: string = getValue('myString')
// Unlike unknown, variables of type any allow you to access arbitrary properties, even ones that don’t exist. These properties include functions and TypeScript will not check their existence or type:
let looselyTyped: any = 4;
looselyTyped.ifItExists();
looselyTyped.toFixed();

// void
function warnUser(): void {
  console.log('This is my warning message')
}

// null&undefined
// By default null and undefined are subtypes of all other types.
let u: number = 1
u = undefined

// never
function error(message: string): never {
  throw new Error(message)
}

function fail() {
  return error('something failed')
}

function infiniteLoop(): never {
  while (true) {}
}

// object
declare function create(o: object | null): void
create({ prop: 0})
create(null)
// Generally, you won’t need to use this.

// Type assertion
// 1. as-syntax
let someValue: unknown = 'this is a string'   
let strLength: number = (someValue as string).length

// 2. angle-bracket syntax
let somevalue2: unknown = 'this is a string'
let strLength2: number = (<string>someValue).length


export default {}
