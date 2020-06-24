import 'regenerator-runtime/runtime'
import * as func from '../002-ch02-numerical-algorithms'

describe('Numerical Algorithms', () => {
  test('makeRandom returns random numbers', () => {
    const gen = func.makeRandom(7, 5, 11)

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

  test('biasedRangeRandomNumGen either 1 or 2', () => {
    const gen = func.biasedRangeRandomNumGen(1, 2)

    expect(gen.next().value).toBe(1)
    expect(gen.next().value).toBe(2)
    expect(gen.next().value).toBe(2)
  })

  test('whoWinsThePrize can decide winner using only coin', () => {
    let numberOfFriends = 5
    let winner = func.whoWinsThePrize(numberOfFriends)
    expect(winner).toBe(4)

    numberOfFriends = 3
    winner = func.whoWinsThePrize(numberOfFriends)
    expect(winner).toBe(2)

    numberOfFriends = 1
    winner = func.whoWinsThePrize(numberOfFriends)
    expect(winner).toBe(1)
  })

  test('randomizeArray randomizes arrays', () => {
    const arr = [0, 1, 2, 3, 4]
    const result = func.randomizeArray(arr)
    expect(result).toEqual([3, 0, 2, 1, 4])
  })

  test('randomizeArray does not change the original array', () => {
    const arr = [0, 1, 2, 3, 4]
    func.randomizeArray(arr)
    expect(arr).toEqual([0, 1, 2, 3, 4])
  })

  test('drawWinners gets the winners', () => {
    const entries = ['Paul', 'Sarah', 'Peter', 'Luke', 'Samar']

    let winners = func.drawWinners(entries, 5)
    expect(winners).toEqual(['Luke', 'Paul', 'Peter', 'Sarah', 'Samar'])

    winners = func.drawWinners(entries, 3)
    expect(winners).toEqual(['Luke', 'Paul', 'Peter'])

    winners = func.drawWinners(entries, 1)
    expect(winners).toEqual(['Luke'])
  })

  test('gcd calculates greatest common divisor', () => {
    expect(func.gcd(4851, 3003)).toBe(231)
    expect(func.gcd(3003, 4851)).toBe(231)
    expect(func.gcd(8, 12)).toBe(4)
  })

  test('exponentiate with base 2', () => {
    expect(func.exponentiate(2, 0)).toBe(1)
    expect(func.exponentiate(2, 1)).toBe(2)
    expect(func.exponentiate(2, 2)).toBe(4)
    expect(func.exponentiate(2, 3)).toBe(8)
    expect(func.exponentiate(2, 4)).toBe(16)
    expect(func.exponentiate(2, 5)).toBe(32)
    // big one
    expect(func.exponentiate(2, 32)).toBe(4294967296)
  })

  test('exponentiate with base 3', () => {
    expect(func.exponentiate(3, 0)).toBe(1)
    expect(func.exponentiate(3, 1)).toBe(3)
    expect(func.exponentiate(3, 2)).toBe(9)
    expect(func.exponentiate(3, 3)).toBe(27)
    expect(func.exponentiate(3, 4)).toBe(81)
    expect(func.exponentiate(3, 5)).toBe(243)
    // big one
    expect(func.exponentiate(3, 25)).toBe(847288609443)
  })

  test('findFactors', () => {
    expect(func.findFactors(2)).toEqual([2])
    expect(func.findFactors(3)).toEqual([3])
    expect(func.findFactors(12)).toEqual([2, 2, 3])
    expect(func.findFactors(88)).toEqual([2, 2, 2, 11])
  })

  test('findFactorsImproved', () => {
    expect(func.findFactorsImproved(2)).toEqual([2])
    expect(func.findFactorsImproved(3)).toEqual([3])
    expect(func.findFactorsImproved(12)).toEqual([2, 2, 3])
    expect(func.findFactorsImproved(88)).toEqual([2, 2, 2, 11])
    expect(func.findFactorsImproved(857362)).toEqual([2, 11, 38971])
  })

  test('findPrime using the sieve', () => {
    const primesUpToTen = [2, 3, 5, 7]
    const primesUpTo100 = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
      43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
    ]
    expect(func.findPrimesWithEratosthenesSieve(10)).toEqual(primesUpToTen)
    expect(func.findPrimesWithEratosthenesSieve(100)).toEqual(primesUpTo100)
  })

  it.skip('isPrimeFermat', () => {
    // TODO, fix bigInt problem when funneling this through regenerator-runtime
    const primesUpTo100 = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
      43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    ]
    const compositesUpTo100 = [
      4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24,
      25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40,
      42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57,
      58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75,
      76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91,
      92, 93, 94, 95, 96, 98, 99, 100,
    ]
    primesUpTo100.forEach(prime => {
      expect(func.isPrimeFermat(prime, 10)).toBe(true)
    })
    compositesUpTo100.forEach(composite => {
      expect(func.isPrimeFermat(composite, 10)).toBe(false)
    })
  })

  test('getAreaUsingRectangles', () => {
    const curve1 = x => x + 5
    const curve2 = x => 1 + x + Math.sin(2 * x)

    const result1 = func.getAreaUsingRectangles(curve1, { xMin: 10, xMax: 20 }, 100)
    const result2 = func.getAreaUsingRectangles(curve2, { xMin: 0, xMax: 5 }, 100)

    const realArea1 = 200
    const realArea2 = 18.4195

    expect(realArea1 - result1).toBeGreaterThan(0)
    expect(realArea1 - result1).toBeLessThan(3)

    expect(realArea2 - result2).toBeGreaterThan(0)
    expect(realArea2 - result2).toBeLessThan(0.2)
  })

  test('getAreaUsingTrapezoids', () => {
    const curve1 = x => x + 5
    const curve2 = x => 1 + x + Math.sin(2 * x)

    const result1 = func.getAreaUsingTrapezoids(curve1, { xMin: 10, xMax: 20 }, 100)
    const result2 = func.getAreaUsingTrapezoids(curve2, { xMin: 0, xMax: 5 }, 100)

    const realArea1 = 200
    const realArea2 = 18.4195

    expect(realArea1 - result1).toBeGreaterThan(0)
    expect(realArea1 - result1).toBeLessThan(2.5)

    expect(realArea2 - result2).toBeGreaterThan(0)
    expect(realArea2 - result2).toBeLessThan(0.1)
  })

  test('getAreaUsingTrapezoidsAdaptive', () => {
    const curve = x => 1 + x + Math.sin(2 * x)

    const realArea = 18.4195
    const withoutAdaptive =
      func.getAreaUsingTrapezoids(curve, { xMin: 0, xMax: 5 }, 10)
    const withAdaptive =
      func.getAreaUsingTrapezoidsAdaptive(curve, { xMin: 0, xMax: 5 }, 2, 0.00001)

    // With fewer initial subdivisions (only 2 versus 10), the adaptive is way more precise
    // More than 400 recursive calls happen with this example though
    expect(Math.trunc(withAdaptive * 10000)).toBe(realArea * 10000)
    expect(Math.trunc(withoutAdaptive * 10000)).toBe(183415)
  })
})
