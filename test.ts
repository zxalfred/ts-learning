interface Test {
  title: string
  description: string
  print: () => void
}

type MyPartial<Type> = {
  [K in keyof Type]?: Type[K]
}

type MyRequired<Type> = {
  [K in keyof Type]-?: Type[K]
}

type MyReadonly<Type> = {
  readonly [K in keyof Type]: Type[K]
}

type MyRecord<K extends keyof any, T> = {
  [Key in K]: T
}

type MyPick<Type, Keys extends keyof Type> = {
  [K in Keys]: Type[K]
}

type MyOmit<Type, Keys extends keyof Type> = {
  [K in Exclude<keyof Type, Keys>]: Type[K]
}

type MyExclude<T, E> = E extends T ? never : E

type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

type MyConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never

type MyReturnType<T extends (...args: any) => any> = T extends (...args : any) => infer P ? P : never

type MyInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer P ? P : never

type MyThisParameterType<T> = T extends (this: infer P, ...args: any[])  => any ? P : unknown

type GetOnlyFnProps<T extends object> = {
  [
    K in {
      [Key in keyof T]: T[Key] extends Function ? Key : never
    }[keyof T]
  ]: T[K]
}
