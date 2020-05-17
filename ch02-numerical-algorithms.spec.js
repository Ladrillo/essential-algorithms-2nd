// Pseudorandom numbers created
// using a linear congruential generator
function* makeRandom(A, B, M) {
  let x = 0 // value used to initialize is called the 🌾 seed 🌾

  while (true) {
    yield x
    x = ((A * x) + B) % M
  }
}

// It's possible to save a ton of info using
// a combination of (1) a PRNG and (2) a particular seed.

it('returns random numbers', () => {
  const gen = makeRandom(7, 5, 11)

  expect(gen.next().value).toBe(0) // first number of the series
  expect(gen.next().value).toBe(5)
  expect(gen.next().value).toBe(7)
  expect(gen.next().value).toBe(10)
  expect(gen.next().value).toBe(9)
  expect(gen.next().value).toBe(2)
  expect(gen.next().value).toBe(8)
  expect(gen.next().value).toBe(6)
  expect(gen.next().value).toBe(3)
  expect(gen.next().value).toBe(4)
  expect(gen.next().value).toBe(0) // cycle starting again
})

// ENSURING FAIRNESS
// PRNG can be biased or fair.
// 1- using a linear congruential generator for a specific range
function* badRangeRandomGenerator(min, max) {
  const gen = makeRandom(7, 5, 11)
  let x = 0

  while (true) {
    const number = gen.next().value
    yield min + number % (max - min + 1)
  }
}
const get = badRangeRandomGenerator(0, 3)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log(get.next().value)
console.log('cycle restarts')
