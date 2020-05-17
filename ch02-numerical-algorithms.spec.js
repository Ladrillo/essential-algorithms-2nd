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

// ENSURING FAIRNESS - PRNG can be biased or fair.

// 1- using a linear congruential generator for a specific range

// 1A- The bad approach
function* badRangeRandomGenerator(min, max) {
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + number % (max - min + 1)
  }
}
it('returns biased random numbers either 1 or 2', () => {
  const gen = badRangeRandomGenerator(1, 2)

  expect(gen.next().value).toBe(1)
  expect(gen.next().value).toBe(2)
  expect(gen.next().value).toBe(2)
})

// 1B- A better approach
function* betterRangeGenerator(min, max) { // Not working
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + (number / 11) * (max - min)
  }
}
it('returns non-biased random numbers between 1 and 2', () => {
  const gen = betterRangeGenerator(0, 2)

  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
})
