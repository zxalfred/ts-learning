// Constrained Minxs
class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}

type GConstructor<T = {}> = new (...args: any[]) => T

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void}>
type Spritable = GConstructor<typeof Sprite>
type Loggable = GConstructor<{ print: () => void }>

function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      this.setPos(0, 20)
    }
  }
}
