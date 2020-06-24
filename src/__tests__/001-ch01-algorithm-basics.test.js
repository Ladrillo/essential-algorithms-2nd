import {
  dividingPoint,
  findLargest,
  hasDuplicatesNaive,
  hasDuplicatesNaiveABitImproved,
} from '../001-ch01-algorithm-basics'

describe('Algorithms Basics', () => {
  test('findLargest finds the largest', () => {
    let numbers = [0, 6, 4, 1, 9, 1, 3]
    expect(findLargest(numbers)).toBe(9)
  })

  test('hasDuplicatesNaive finds whether duplicates', () => {
    let numbers1 = [0, 6, 4, 1, 9, 3]
    let numbers2 = [0, 6, 4, 1, 9, 3, 4]
    expect(hasDuplicatesNaive(numbers1)).toBe(false)
    expect(hasDuplicatesNaive(numbers2)).toBe(true)
  })

  test('hasDuplicatesNaiveABitImproved finds whether duplicates', () => {
    let numbers1 = [0, 6, 4, 1, 9, 3]
    let numbers2 = [0, 6, 4, 1, 9, 3, 4]
    expect(hasDuplicatesNaiveABitImproved(numbers2)).toBe(true)
    expect(hasDuplicatesNaiveABitImproved(numbers2)).toBe(true)
  })

  test('dividingPoint finds an acceptable dividing point', () => {
    const arr1 = [1, 2, 3, 4, 5, 7, 8, 9, 10]
    const arr2 = [2, 7, 1, 8, 3, 5, 10, 9, 4]
    expect(dividingPoint(arr1)).toBe(5)
    expect(dividingPoint(arr2)).toBe(3)
  })
})
