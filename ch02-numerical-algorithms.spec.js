// 1- CREATING PSEUDORANDOM NUMBERS

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

// 2- ENSURING FAIRNESS - PRNG can be biased or fair.

// Using a linear congruential generator for a specific range

// A- The bad approach
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

// B better approach
function* betterRangeGenerator(min, max) { // Not working
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + (number / 11) * (max - min)
  }
}
it('returns non-biased random numbers either 1 or 2', () => {
  const gen = betterRangeGenerator(1, 2)

  // console.log(gen.next().value)
  // console.log(gen.next().value)
})

/*
3- Getting fair reaults from a very loaded coin

Heads -> 0.8
Tails -> 0.2

Tossing twice:
Probability of getting ( Heads, Tails ) -> 0.8 * 0.2 = 0.16
Probability of getting ( Tails, Heads ) -> 0.2 * 0.8 = 0.16

Algorithm:
Toss twice
if ( Heads, Tails ) then Heads
if ( Tails, Heads ) then Tails
else toss twice again
*/

// 4- REDUCING THE RANGE OF A PRNG - Simply ignore results falling out of scope

// 5- EXPANDING THE RANGE OF A PRNG - Toss repeatedly to construct a binary number
function whoWinsThePrize(friendsNumber) {
  let binaryNumber = ''

  for (let i = 0; i < (friendsNumber + 1) / 2; i++) {
    const fairCoinToss = Math.floor(Math.random() * 2) + ''
    binaryNumber = binaryNumber.concat(fairCoinToss)
  }

  console.log('attempt', binaryNumber)

  const friendIndex = parseInt(binaryNumber, 2)

  if (friendIndex + 1 > friendsNumber) {
    return whoWinsThePrize(friendsNumber)
  }
  return friendIndex + 1
}

console.log('result', whoWinsThePrize(5))
