const someArray = [1, 'string', false]

for (let entry of someArray) {
  // console.log(entry)
}

let list = new Map([['a', 1], ['b', 2]])
for (let i in list) {
  console.log(i)
}
for (let i of list) {
  console.log(i)
}