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
it('makeRandom returns random numbers', () => {
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


// 2- ENSURING FAIRNESS

// PRNG can be biased or fair
// Using a linear congruential generator for a specific range

// A- The "bad" approach
function* biasedRangeRandomNumGen(min, max) {
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + number % (max - min + 1)
  }
}
it('biasedRangeRandomNumGen either 1 or 2', () => {
  const gen = biasedRangeRandomNumGen(1, 2)

  expect(gen.next().value).toBe(1)
  expect(gen.next().value).toBe(2)
  expect(gen.next().value).toBe(2)
})

// B better approach
// Makes floats between min and max ???
function* betterRangeGenerator(min, max) {
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + (number / 11) * (max - min)
  }
}

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
  // In production we'd use a fair PRNG, or a CSPRNG
  const fairCoinTossGen = biasedRangeRandomNumGen(0, 1)

  for (let i = 0; i < (friendsNumber + 1) / 2; i++) {
    const fairCoinToss = fairCoinTossGen.next().value + ''
    binaryNumber = binaryNumber.concat(fairCoinToss)
  }

  const friendIndex = parseInt(binaryNumber, 2)

  if (friendIndex + 1 > friendsNumber) {
    return whoWinsThePrize(friendsNumber)
  }
  return friendIndex + 1
}
it('whoWinsThePrize can decide winner using only coin', () => {
  let numberOfFriends = 5
  let winner = whoWinsThePrize(numberOfFriends)
  expect(winner).toBe(4)

  numberOfFriends = 3
  winner = whoWinsThePrize(numberOfFriends)
  expect(winner).toBe(2)

  numberOfFriends = 1
  winner = whoWinsThePrize(numberOfFriends)
  expect(winner).toBe(1)
})


// 6- RANDOMIZING ARRAYS
function randomizeArray(arr) {
  // We don't want to cause mutations in the original arr
  const result = [...arr]
  // In production we'd use a fair PRNG, or a CSPRNG
  const randomIndexGen = biasedRangeRandomNumGen(0, arr.length - 1)

  for (let idx in result) {
    const randomIdx = randomIndexGen.next().value
    // Items that will swap positions
    const item1 = result[idx]
    const item2 = result[randomIdx]
    // Perform the swap
    result[idx] = item2
    result[randomIdx] = item1
  }

  return result
}
it('randomizeArray randomizes arrays', () => {
  const arr = [0, 1, 2, 3, 4]
  const result = randomizeArray(arr)
  expect(result).toEqual([3, 0, 2, 1, 4])
})
it('randomizeArray does not change the original array', () => {
  const arr = [0, 1, 2, 3, 4]
  randomizeArray(arr)
  expect(arr).toEqual([0, 1, 2, 3, 4])
})

// We can use this technique for drawing multiple winners out of a list
function drawWinners(entries, numberOfPrizes) {
  const randomizedEntries = randomizeArray(entries)
  const result = randomizedEntries.slice(0, numberOfPrizes)

  return result
}
it('drawWinners gets the winners', () => {
  const entries = ['Paul', 'Sarah', 'Peter', 'Luke', 'Samar']

  let winners = drawWinners(entries, 5)
  expect(winners).toEqual(['Luke', 'Paul', 'Peter', 'Sarah', 'Samar'])

  winners = drawWinners(entries, 3)
  expect(winners).toEqual(['Luke', 'Paul', 'Peter'])

  winners = drawWinners(entries, 1)
  expect(winners).toEqual(['Luke'])
})

// 7- GENERATING NON-UNIFORM DISTRIBUTIONS
function pickItemWithProbabilities(items, probabilities) {
  let value = Math.random()
  for (let itemIdx in items) {
    value = value - probabilities[itemIdx]
    if (value <= 0) return items[itemIdx]
  }
}
{
  let results = {
    red: 0,
    green: 0,
    blue: 0,
  }
  const colors = ['red', 'green', 'blue']
  const probabilities = [0.7, 0.2, 0.1]
  let iterations = 100
  while (iterations > 0) {
    const pickedColor = pickItemWithProbabilities(colors, probabilities)
    results[pickedColor]++
    iterations--
  }
  // console.log({
  //   red: results.red / 100,
  //   green: results.green / 100,
  //   blue: results.blue / 100,
  // })
}

// 8 RANDOM WALKS (see other file)

// 9- GREATEST COMMON DIVISORS
// Euclid's algorithm
function gcd(a, b) {
  while (b !== 0) {
    const remainder = a % b
    a = b
    b = remainder
  }
  return a
}
it('gcd calculates greatest common divisor', () => {
  expect(gcd(4851, 3003)).toBe(231)
  expect(gcd(3003, 4851)).toBe(231)
  expect(gcd(8, 12)).toBe(4)
})

// 10- FAST EXPONENTIATION
function exponentiate(value, exponent) {
  const digitsBinaryExponent = exponent
    .toString(2)
    .split('')
    .map(n => Number(n))

  let result = 1

  for (let bit of digitsBinaryExponent) {
    result *= result
    if (bit === 1) {
      result *= value
    }
  }
  return result
}

it('exponentiate with base 2', () => {
  expect(exponentiate(2, 0)).toBe(1)
  expect(exponentiate(2, 1)).toBe(2)
  expect(exponentiate(2, 2)).toBe(4)
  expect(exponentiate(2, 3)).toBe(8)
  expect(exponentiate(2, 4)).toBe(16)
  expect(exponentiate(2, 5)).toBe(32)
  // big one
  expect(exponentiate(2, 32)).toBe(4294967296)
})

it('exponentiate with base 3', () => {
  expect(exponentiate(3, 0)).toBe(1)
  expect(exponentiate(3, 1)).toBe(3)
  expect(exponentiate(3, 2)).toBe(9)
  expect(exponentiate(3, 3)).toBe(27)
  expect(exponentiate(3, 4)).toBe(81)
  expect(exponentiate(3, 5)).toBe(243)
  // big one
  expect(exponentiate(3, 25)).toBe(847288609443)
})

// 11- FINDING PRIME FACTORS 

// naive implementation
function findFactors(number) {
  const factors = []
  let i = 2

  while (i < number) {
    while (number % i === 0) {
      factors.push(i)
      number = number / i
    }
    i++
  }
  if (number > 1) factors.push(number)
  return factors
}
it('findFactors', () => {
  expect(findFactors(2)).toEqual([2])
  expect(findFactors(3)).toEqual([3])
  expect(findFactors(12)).toEqual([2, 2, 3])
  expect(findFactors(88)).toEqual([2, 2, 2, 11])
})

// less naive implementation
function findFactorsImproved(number) {
  const factors = []

  // pull out factors of 2
  while (number % 2 === 0) {
    factors.push(2)
    number = number / 2
  }

  let i = 3
  let maxFactor = Math.sqrt(number)

  // pull out factors of i
  while (i < maxFactor) {
    while (number % i === 0) {
      factors.push(i)
      number = number / i
      maxFactor = Math.sqrt(number)
    }
    i = i + 2
  }
  if (number > 1) factors.push(number)
  return factors
}
it('findFactorsImproved', () => {
  expect(findFactorsImproved(2)).toEqual([2])
  expect(findFactorsImproved(3)).toEqual([3])
  expect(findFactorsImproved(12)).toEqual([2, 2, 3])
  expect(findFactorsImproved(88)).toEqual([2, 2, 2, 11])
  expect(findFactorsImproved(857362)).toEqual([2, 11, 38971])
})

// The sieve of Eratosthenes
function findPrimesWithEratosthenesSieve(maxNum) {
  // all numbers from 2 to maxNum inclusive
  const range = [...Array(maxNum).keys()]
    .map(num => num + 1)
    .slice(1)
  // at each surviving num in range, delete its multiples
  for (let i = 0; i < range.length; i++) {
    for (let k = i * 2; k < range.length; k++) {
      const notFirstIteration = !!k
      const currentNumberNotCrossedOut = !!range[i]
      const candidateForMultipleNotCrossedOut = !!range[k]
      const candidateIsMultiple = range[k] % range[i] === 0
      if (
        notFirstIteration && // to avoid deleting number 2
        currentNumberNotCrossedOut &&
        candidateForMultipleNotCrossedOut &&
        candidateIsMultiple
      ) {
        delete range[k]
      }
    }
  }
  // get rid of the empty spots in the array
  return range.filter(e => !!e)
}
it('findPrime using the sieve', () => {
  const primesUpTo100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
  expect(findPrimesWithEratosthenesSieve(100)).toEqual(primesUpTo100)
})
