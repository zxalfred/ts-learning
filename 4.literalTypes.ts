// String Literal Types
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
      // ...
    } else if (easing === 'ease-in-out') {
      // ...
    }
  }
}

// Numeric Literal Types
interface MapConfig {
  lng: number
  lat: number
  titleSize: 8 | 16 | 32
}

// Boolean Literal Types
interface ValidationSuccess {
  isValid: true
  reason: null
}

interface ValidationFailure {
  isValid: false
  reason: string
}

type ValidationResult = ValidationSuccess | ValidationFailure