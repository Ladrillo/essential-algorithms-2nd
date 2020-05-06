// RULE 1: If an algorithm performs a sequence of steps f(N) times for a mathematical
// function f, then it takes O(f(N)) steps (order of N).

// RULE 2: If an algorithm performs two operations that take O(f(N)) and O(g(N)) steps
// for functions f and g, then the algorithm's total peformance is of O(f(N) + g(N)).

// RULE 3: If an algorithm takes O(f(N) + g(N)) time and f(N) is greater than g(N)
// for large N, then the algorithm's performance can be simplified to O(f(N)).
function findLargest(integers) {
  let largest = integers[0]                   // O(1)
  for (let i = 1; i < integers.length; i++) { // O(N)
    if (integers[i] > largest) {
      largest = integers[i]
    }
  }
  return largest                          // O(1)
}
// Run time order RULE 1: O(N)
// Run time order RULE 2: O(1 + N + 1) = O(2 + N)
// Run time order RULE 3: O(N)

it('finds the largest', () => {
  let numbers = [0, 6, 4, 1, 9, 1, 3]
  expect(findLargest(numbers)).toBe(9)
})

// RULE 4: If an algorithm performs an operation that takes O(f(N)) steps and for each
// step it performs another O(g(N)) steps, then the algorithm's total performace is
// O(f(N) x g(N))
function hasDuplicatesNaive(integers) {
  for (let i in integers) {
    for (let j in integers) {
      if ((i !== j) && (integers[i] === integers[j])) {
        return true
      }
    }
  }
  return false
}
// Run time order RULE 4: O(N x N) = O(N^2)

it('finds whether duplicates', () => {
  let numbers1 = [0, 6, 4, 1, 9, 3]
  let numbers2 = [0, 6, 4, 1, 9, 3, 4]
  expect(hasDuplicatesNaive(numbers1)).toBe(false)
  expect(hasDuplicatesNaive(numbers2)).toBe(true)
})
