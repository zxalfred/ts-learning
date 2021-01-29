// Partial<Type>
interface Todo {
  title: string
  description: string
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}
const todo1 = {
  title: 'organize desk',
  description: 'clear clutter'
}
const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})

// Readonly<Type>
interface Todo2 {
  title: string;
}
const todo3: Readonly<Todo2> = {
  title: "Delete inactive users",
};
// todo.title = "Hello";

// Record<Keys,Type>
interface PageInfo {
  title: string
}
type Page = 'home' | 'about' | 'contact'

const nav: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: "contact" },
  home: { title: "home" },
}

// Pick<Type, Keys>
interface Todo3 {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo3, "title" | "completed">
const todo4: TodoPreview = {
  title: "Clean room",
  completed: false,
}

// Omit<Type, Keys>
type MyOmit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P]
}
interface Todo5 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview2 = MyOmit<Todo5, "description">;

const todo5: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Exclude<Type, ExcludedUnion>
type MyExclude<T, U> = T extends U ? never : T
type T0 = MyExclude<'a' | 'b' | 'c', 'a'>
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
type T2 = Exclude<string | number | (() => void), Function>

// Extract<Type, Union>
type MyExtract<T, U> = T extends U ? T : never
type T3 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
type T4 = Extract<string | number | (() => void), Function>

// NonNullable<Type>
type MyNonullable<T> = Exclude<T, null | undefined>
type T5 = NonNullable<string | number | undefined>

// Parameters<Type>
// Constructs a tuple type from the types used in the parameters of a function type Type.
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
declare function f1(arg: { a: number; b: string }): void
type T6 = MyParameters<(s: string) => void>;

// ConstructorParameters<Type>
// Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).
type MyConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never

// ReturnType<Type>
// Constructs a type consisting of the return type of function Type.
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// ThisParameterType<Type>
function toHex(this: Number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

// OmitThisParameter<Type>
type MyOmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T

function toHex2(this: Number) {
  return this.toString(16)
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)

console.log(fiveToHex())

// GetOnlyFnProps<Type>
type GetOnlyFnProps<T extends object> = {
  [
    K in {
      [K in keyof T]: T[K] extends Function ? K : never
    }[keyof T]
  ]: T[K]
}

type Obj = {
  a: string,
  b: number
  c: () => number
  d: () => string
}

type Test = GetOnlyFnProps<Obj>
