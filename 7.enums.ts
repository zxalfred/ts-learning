// Numeric enums
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// Using an enum
enum UserResponse {
  No,
  Yes,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond('Princess Caroline', UserResponse.Yes)

// enums without initializers either need to be first, or have to come after numeric enums initialized with numeric constants or other constant enum members
function getSomeValue(): number {
  return 0
}

enum E {
  A = getSomeValue(),
  // B // error!
}

// String enums
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// Heterogeneous enums (it's advised that we don't do that)
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// Union enums and enum member types
enum E {
  Foo,
  Bar,
}
function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    console.log(123)
  }
}

// Enums at compile time
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

type LogLevelStrings = keyof typeof LogLevel

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key]

  if (num <= LogLevel.WARN) {
    console.log('Log level key is:', key)
    console.log('Log level value is:', num)
    console.log('Log level message is:', message)
  }
}
printImportant('ERROR', 'This is a message')

// const enums
const enum Direction3 {
  Up,
  Down,
  Left,
  Right
}
let directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right]

// Ambient enums
declare enum Enum {
  A = 1,
  B,
  C = 2
}
