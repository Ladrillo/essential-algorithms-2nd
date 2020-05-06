// If an algorithm performs a sequence of steps f(N) times for a mathematical
// function f, then it takes O(f(N)) steps (order of N)
function findLargest(list) {
  let largest = list[0]                   // O(1)
  for (let i = 1; i < list.length; i++) { // O(N)
    if (list[i] > largest) {
      largest = list[i]
    }
  }
  return largest                          // O(1)
}
// Run time order: O(1 + N + 1) -> O(2 + N)

it('finds the largest', () => {
  let numbers = [0, 6, 4, 1, 9, 1, 3]
  expect(findLargest(numbers)).toBe(9)
})
