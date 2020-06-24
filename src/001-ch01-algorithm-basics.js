/*
A - RULES OF BIG O

🔥 RULE 1: If an algorithm performs a sequence of steps f(N) times for a mathematical
function f, then it takes O(f(N)) steps (order of N).

🔥 RULE 2: If an algorithm performs two operations that take O(f(N)) and O(g(N)) steps
for functions f and g, then the algorithm's total peformance is of O(f(N) + g(N)).

🔥 RULE 3: If an algorithm takes O(f(N) + g(N)) time and f(N) is greater than g(N)
for large N, then the algorithm's performance can be simplified to O(f(N)).

🔥 RULE 4: If an algorithm performs an operation that takes O(f(N)) steps and for each
step it performs another O(g(N)) steps, then the algorithm's total performace is
O(f(N) x g(N))

🔥 RULE 5: Ignore constant multiples. If C is a constant,
O(C x f(N)) = O(f(N))
O(f(C x N)) = O(f(N))

B- COMMON TUN TIME FUNCTIONS

🔥 1 (constant) - Takes a constant ammount of time no matter how big the problem

🔥 Log N - The algorithm is dividing the number of items it must
consider by a fixed fraction at every step

🔥 EXAMPLE OF A Log N:
Calculate nodes N in a binary tree of height H -> N = (2^(H + 1)) - 1
Calculate height H in a binary tree of N nodes -> H = (log2 H^(N + 1)) -1

🔥 Common run-time functions in order of increasing speed of growth
1 (constant), log N, sqrt(N), N, N^2, 2^N, N!
*/

export function findLargest(integers) {
  // Run time order RULE 1: O(N)
  // Run time order RULE 2: O(1 + N + 1) = O(2 + N)
  // Run time order RULE 3: O(N)
  let largest = integers[0]                   // O(1)
  for (let i = 1; i < integers.length; i++) { // O(N)
    if (integers[i] > largest) {
      largest = integers[i]
    }
  }
  return largest                              // O(1)
}

export function hasDuplicatesNaive(integers) {
  // Run time order RULE 4: O(N x N) = O(N^2)
  for (let i in integers) {
    for (let j in integers) {
      if ((i !== j) && (integers[i] === integers[j])) {
        return true
      }
    }
  }
  return false
}

export function hasDuplicatesNaiveABitImproved(integers) {
  // Run time order RULE 4: O(N x N) = O(N^2)
  for (let i = 0; i < integers.length - 1; i++) {
    for (let j = i + 1; j < integers.length; j++) {
      if (integers[i] === integers[j]) {
        return true
      }
    }
  }
  return false
}

export function dividingPoint(intArr) {
  // Run time of order O(1)
  const num1 = intArr[0]
  const num2 = intArr[intArr.length - 1]
  const num3 = intArr[Math.floor(intArr.length / 2)]

  if (num1 <= num2 && num3 <= num1) return num1
  if (num2 <= num3 && num1 <= num2) return num2
  return num3
}

/*
C- EXERCISES

🚀 EXERCISE 1 O(N^2) still but takes fewer steps actually than the non-improved

🚀 EXERCISE 2
Computer can perform 10^6 steps per second.
What is the largest problem (N) that can be tackled by each algorith
in one second, minute, hour, day, week, year
  N^2
    - second N^2 = 10^6 x 1    -> N =  1000
    - minute N^2 = 10^6 x 60   -> N =  7746
    - hour   N^2 = 10^6 x 3600 -> N = 60000
    - day
    - week
    - year

🚀 EXERCISE 3 order of 1500xN vs. order of 30xN^2
N=1   -> 1500  vs. 30 steps
N=10  -> 15000 vs. 3000 steps
N=50  -> 75000 vs. 75000 steps
-------------------------------- after N=50 algorithm 1500xN takes fewer steps
N=100 -> 150000 vs. 300000 steps
*/
