// typing the function
function add(x: number, y: number): number {
  return x + y;
}
let myAdd = function(x: number, y: number): number {
  return x + y
}

// writing the function type
let myAdd2: (x: number, y: number) => number = function(x: number, y: number) :number {
  return x + y
}

// Optional and Default Parameters
function buildName(firstName: string, lastName?: string) {
  if (lastName) return `${firstName} ${lastName}`
  return firstName
}

function buildName2(firstName: string, lastName: string = 'Smith') {
  if (lastName) return `${firstName} ${lastName}`
  return firstName
}

// Rest Parameters
function buildName3(firstName: string, ...restOfName: string[]) {
  return `${firstName} ${restOfName.join(' ')}`
}

let employeeName = buildName3('Joseph', 'Samuel', 'Lucas', 'Mackinzie')

// this and arrow functions
let deck0 = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      
      return { suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker0 = deck0.createCardPicker()
let pickedCard0 = cardPicker0() // cant't work as what we expected

alert(`card: ${pickedCard0.card} of ${pickedCard0.suit}`)

// this can be fixed by returning an arrow function
let deck2 = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      
      return { suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

// this parameters
interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[],
  cards: number[],
  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker(this: Deck) {
    return () => {
      let pickedCard:number = Math.floor(Math.random() * 52)
      let pickedSuit:number = Math.floor(pickedCard / 13)

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

// this parameter in callbacks
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void
}
// this: void means that addClickListener expects onclick to be a function that does not require a this type.
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // oops, used `this` here. using this callback would crash at runtime
    this.info = e.message;
  }
}

let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

class Handler2 {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };

}

// Overloads
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x){
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);