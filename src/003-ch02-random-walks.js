// 8- RANDOM WALKS

function drawPoints({
  gridSize: [width, height],
  stepSize,
  points,
}) {
  const pointsAdjusted = points.map(
    point => point.map(coord => coord * stepSize)
  )
  const canvas = document.createElement('canvas')
  canvas.width = width * stepSize
  canvas.height = height * stepSize
  canvas.style.border = '2px dashed black'
  canvas.style.padding = `${stepSize}px`
  canvas.style.backgroundColor = '#f7faff'

  const ctx = canvas.getContext('2d')

  ctx.beginPath()
  ctx.arc(
    pointsAdjusted[0][0],
    pointsAdjusted[0][1],
    stepSize / 5, 0, 2 * Math.PI,
    true
  )
  ctx.fill() // filled cicle first point

  for (let idx = 0; idx < pointsAdjusted.length - 1; idx++) {
    ctx.moveTo(...pointsAdjusted[idx])
    ctx.lineTo(...pointsAdjusted[idx + 1])
  }
  // no fill circle last point
  ctx.arc(
    pointsAdjusted[pointsAdjusted.length - 1][0],
    pointsAdjusted[pointsAdjusted.length - 1][1],
    stepSize / 5, 0, 2 * Math.PI,
    true,
  )
  ctx.stroke()
  document.body.appendChild(canvas)
}

function randomizeArray(arr) {
  const result = [...arr]
  const getRandomIdx = () => Math.floor(Math.random() * arr.length)

  for (let idx in result) {
    const randomIdx = getRandomIdx()
    // Items that will swap positions
    const item1 = result[idx]
    const item2 = result[randomIdx]
    // Perform the swap
    result[idx] = item2
    result[randomIdx] = item1
  }

  return result
}

function getSelfAvoidingMovesWithinCanvas(canvasLength, canvasHeight, points) {
  const [x, y] = points[points.length - 1]
  const surroundingPoints = [
    [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y] // up, right, down, left
  ]
  const availablePoints = surroundingPoints.filter(
    ([x, y]) => {
      // has to be within canvas bounds
      if (x < 0 || x > canvasLength) return false
      if (y < 0 || y > canvasHeight) return false
      // can't be a previously visited point
      for (let [visitedX, visitedY] of points) {
        if (visitedX === x && visitedY === y) return false
      }
      return true
    }
  )
  return randomizeArray(availablePoints)
}

// RANDOM WALK
function makeRandomWalk(numPoints, canvasLength, canvasHeight) {
  // set starting point randomly
  let x = Math.round(Math.random() * canvasLength)
  let y = Math.round(Math.random() * canvasHeight)

  let points = []

  points.push([x, y])

  const getMovesWithinBounds = () => {
    const surroundingPoints = [
      // TROUBLE, top, right, bottom, left
      [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]
    ]
    return surroundingPoints.filter(
      ([x, y]) => {
        if (x < 0 || x > canvasLength) return false
        if (y < 0 || y > canvasHeight) return false
        return true
      }
    )
  }

  for (let i = 1; i < numPoints; i++) {
    const possibleMoves = getMovesWithinBounds()
    const [nextX, nextY] = possibleMoves[
      Math.floor(Math.random() * possibleMoves.length)
    ]

    x = nextX
    y = nextY

    points.push([x, y])
  }
  return points
}

// NON-INTERSECTING RANDOM WALK
function makeNonIntersectingRandomWalk(canvasLength, canvasHeight) {
  // set starting point randomly
  let x = Math.round(Math.random() * canvasLength)
  let y = Math.round(Math.random() * canvasHeight)

  let points = []

  points.push([x, y])

  while (true) {
    const moves = getSelfAvoidingMovesWithinCanvas(
      canvasLength, canvasHeight, points
    )
    if (!moves.length) {
      // breaks loop on dead end
      return points
    }
    x = moves[0][0]
    y = moves[0][1]

    points.push([x, y])
  }
}

// COMPLETE SELF-AVOIDING WALK
function makeCompleteSelfAvoidingWalk(canvasLength, canvasHeight, log) {
  let initialX = Math.round(Math.random() * canvasLength)
  let initialY = Math.round(Math.random() * canvasHeight)

  const totalPoints = (canvasLength + 1) * (canvasHeight + 1)
  let counter = 0 // recursive calls of 'extendWalk'

  return extendWalk([[initialX, initialY]])

  function extendWalk(points) {
    if (counter++ >= 20000) {
      log && console.log(`STACK OVERFLOW! after ${counter} recursive calls`)
      return points
    }
    if (points.length === totalPoints) {
      log && console.log(`YES! Returning complete walk after ${counter} recursive calls`)
      return points
    }
    const moves = getSelfAvoidingMovesWithinCanvas(
      canvasLength, canvasHeight, points
    )
    if (!moves.length) {
      log && console.log(`ARGH! Dead end after ${counter} recursive calls`)
      return points
    }
    for (let point of moves) {
      const walk = extendWalk([...points, point])
      if (walk.length === totalPoints) {
        // this console.log happens exactly (totalPoints - 1) times
        // as the 'successful' calls pop out of stack
        // log && console.log(`SUCCESS! Extending walk after ${counter} recursive calls`)
        return walk
      }
    }
    return points
  }
}

{
  const gridSize = [5, 5]
  const stepSize = 25
  const points = makeRandomWalk(50, ...gridSize)
  drawPoints({ gridSize, stepSize, points })
}
{
  const gridSize = [5, 5]
  const stepSize = 25
  const points = makeNonIntersectingRandomWalk(...gridSize)
  drawPoints({ gridSize, stepSize, points })
}
{
  const gridSize = [5, 5]
  const stepSize = 25
  const points = makeCompleteSelfAvoidingWalk(...gridSize)
  drawPoints({ gridSize, stepSize, points })
}
