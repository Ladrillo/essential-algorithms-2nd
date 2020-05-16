// Pseudorandom numbers generator
// using linear congruency
function* makeRandom(A, B, M) {
  let x = 0

  while (true) {
    x = ((A * x) + B) % M
    yield x
  }
}

it('returns random numbers', () => {
  const gen = makeRandom(7, 5, 11)

  expect(gen.next().value).toBe(5)
  expect(gen.next().value).toBe(7)
  expect(gen.next().value).toBe(10)
  expect(gen.next().value).toBe(9)
  expect(gen.next().value).toBe(2)
  expect(gen.next().value).toBe(8)
  expect(gen.next().value).toBe(6)
  expect(gen.next().value).toBe(3)
  expect(gen.next().value).toBe(4)
  expect(gen.next().value).toBe(0)
  // it repeats after here
})
