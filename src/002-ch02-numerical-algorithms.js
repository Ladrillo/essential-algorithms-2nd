/* global BigInt */
// 1- CREATING PSEUDORANDOM NUMBERS

// using a linear congruential generator
export function* makeRandom(A, B, M) {
  let x = 0 // value used to initialize is called the 🌾 seed 🌾

  while (true) {
    yield x
    x = ((A * x) + B) % M
  }
  // It's possible to save a ton of info using
  // a combination of (1) a PRNG and (2) a particular seed.
}

// 2- ENSURING FAIRNESS

// PRNG can be biased or fair
// Using a linear congruential generator for a specific range

// A- The "bad" approach
export function* biasedRangeRandomNumGen(min, max) {
  const gen = makeRandom(7, 5, 11)

  while (true) {
    const number = gen.next().value
    yield min + number % (max - min + 1)
  }
}

// B better approach
// Makes floats between min and max ?????????????
// eslint-disable-next-line
export function* betterRangeGenerator(min, max) {
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
export function whoWinsThePrize(friendsNumber) {
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



// 6- RANDOMIZING ARRAYS
export function randomizeArray(arr) {
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


// We can use this technique for drawing multiple winners out of a list
export function drawWinners(entries, numberOfPrizes) {
  const randomizedEntries = randomizeArray(entries)
  const result = randomizedEntries.slice(0, numberOfPrizes)

  return result
}


// 7- GENERATING NON-UNIFORM DISTRIBUTIONS
export function pickItemWithProbabilities(items, probabilities) {
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
export function gcd(a, b) {
  while (b !== 0) {
    const remainder = a % b
    a = b
    b = remainder
  }
  return a
}

// 10- FAST EXPONENTIATION
export function exponentiate(value, exponent) {
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



// 11- FINDING PRIME FACTORS 

// naive implementation
export function findFactors(number) {
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


// less naive implementation
export function findFactorsImproved(number) {
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

// The sieve of Eratosthenes
export function findPrimesWithEratosthenesSieve(maxNum) {
  // all numbers from 2 to maxNum inclusive
  const range = [...Array(maxNum + 1).keys()].slice(2)
  // at each surviving num in range, delete its multiples
  for (let i = 0; i < range.length; i++) {
    for (let k = i * 2; k < range.length; k++) {
      // console.log(`k is ${k}`)
      const same = range[i] === range[k] // only happens when i = 0
      const crossedOut = !range[i] || !range[k]
      const multiple = range[k] % range[i] === 0
      if (!same && !crossedOut && multiple) {
        delete range[k]
        // console.log(range)
      }
    }
  }
  // get rid of the empty spots in the array
  return range.filter(e => !!e)
}

// 12- TESTING FOR PRIMALITY
export function getRandomIntBetween(min, max) { // min inclusive; max exclusive
  return Math.floor(Math.random() * (max - min) + min)
}

export function isPrimeFermat(number, numberTests) {
  const candidate = BigInt(number)
  const tests = Array(numberTests)
  // eslint-disable-next-line
  for (let _ of tests) {
    // fermat's little theorem: most of the time,
    // if p is prime and 1 <= n < p, then (n ** (p - 1)) % p is 1
    const witness = BigInt(getRandomIntBetween(1, number))
    const notPrime = (witness ** (candidate - 1n)) % candidate !== 1n
    if (notPrime) return false
  }
  return true // let us hope not all witnesses were liars
}

// 13- INTEGRATION
// THE RECTANGLE RULE
export function getAreaUsingRectangles(curve, { xMin, xMax }, intervals) {
  const dx = (xMax - xMin) / intervals
  let totalArea = 0

  for (let x = xMin; x <= xMax - dx; x += dx) {
    totalArea += dx * curve(x)
  }
  return totalArea
}

// USING TRAPEZOIDS
export function getAreaUsingTrapezoids(curve, { xMin, xMax }, intervals) {
  const dx = (xMax - xMin) / intervals
  let totalArea = 0

  for (let x = xMin; x <= xMax - dx; x += dx) {
    totalArea += dx * ((curve(x) + curve(x + dx)) / 2)
  }
  return totalArea
}



// TRAPEZOIDS RECURSIVE
export function getAreaUsingTrapezoidsAdaptive(curve, { xMin, xMax }, intervals, maxError) {
  const dx = (xMax - xMin) / intervals
  let totalArea = 0

  for (let x = xMin; x <= xMax - dx; x += dx) {
    recursiveHelper(x, dx)
  }

  function recursiveHelper(x, dx) {
    const subDX = dx / 2

    // areas
    const trapezoid = dx * ((curve(x) + curve(x + dx)) / 2)
    const subTrapezoid1 = subDX * ((curve(x) + curve(x + subDX)) / 2)
    const subTrapezoid2 = subDX * ((curve(x + subDX) + curve(x + dx)) / 2)

    const error = Math.abs((subTrapezoid1 + subTrapezoid2 - trapezoid) / trapezoid)

    if (error > maxError) {
      recursiveHelper(x, subDX)
      recursiveHelper(x + subDX, subDX)
    } else {
      totalArea += subTrapezoid1 + subTrapezoid2
    }
  }
  return totalArea
}
