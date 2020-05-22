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
  canvas.style.border = '1px dashed black'
  canvas.style.padding = `${stepSize}px`
  canvas.style.backgroundColor = '#f7faff'

  const ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.arc(pointsAdjusted[0][0], pointsAdjusted[0][1], stepSize / 5, 0, 2 * Math.PI, true);
  ctx.fill();

  for (let idx = 0; idx < pointsAdjusted.length - 1; idx++) {
    ctx.moveTo(...pointsAdjusted[idx])
    ctx.lineTo(...pointsAdjusted[idx + 1])
  }
  ctx.stroke()
  document.body.appendChild(canvas)
}

// RANDOM WALK
function makeRandoWalk(numPoints, canvasLength, canvasHeight) {
  // set starting point randomly
  let x = Math.round(Math.random() * canvasLength)
  let y = Math.round(Math.random() * canvasHeight)

  let listOfPoints = []

  listOfPoints.push([x, y])

  for (let i = 1; i < numPoints; i++) {
    const direction = Math.floor(Math.random() * 4)
    if (direction === 0) y -= 1      // up
    else if (direction === 1) x += 1 // right
    else if (direction === 2) y += 1 // down
    else x -= 1                      // left

    listOfPoints.push([x, y])
  }

  console.log('LIST', listOfPoints)
  return listOfPoints
}

// NON-INTERSECTING RANDOM WALK
function makeNonIntersectingRandomWalk(canvasLength, canvasHeight) {
  // set starting point randomly
  let x = Math.round(Math.random() * canvasLength)
  let y = Math.round(Math.random() * canvasHeight)

  let points = []

  let initial = [x, y]

  points.push(initial)

  while (true) {
    const surroundingPoints = [
      [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]
    ]

    // refactor to use reduce instead of two filters
    const surroundingPointsWithinBounds = surroundingPoints.filter(
      point => {
        const [x, y] = point
        const xAcceptable = (x >= 0 && x <= canvasLength)
        const yAcceptable = (y >= 0 && y <= canvasHeight)
        return xAcceptable && yAcceptable
      }
    )

    const unvisitedSurroundingPoints = surroundingPointsWithinBounds.filter(
      surroundingPoint => {
        for (let visitedPoint of points) {
          if (JSON.stringify(visitedPoint) === JSON.stringify(surroundingPoint)) {
            return false
          }
        }
        return true
      }
    )

    if (!unvisitedSurroundingPoints.length) {
      console.log('TOTAL TRAJECTORY', points)
      return points
    }

    const randomMove = unvisitedSurroundingPoints[
      Math.floor(Math.random() * unvisitedSurroundingPoints.length)
    ]

    x = randomMove[0]
    y = randomMove[1]

    points.push([x, y])
  }
}

// COMPLETE SELF-AVOIDING WALK
function makeCompleteSelfAvoidingWalk(canvasLength, canvasHeight) {
  // set starting point randomly
  let initialX = Math.round(Math.random() * canvasLength)
  let initialY = Math.round(Math.random() * canvasHeight)

  return extendWalk([[initialX, initialY]])

  function extendWalk(points) {
    if (points.length === canvasLength * canvasHeight) {
      return points
    }
    const [x, y] = points[points.length - 1]
    const surroundingPoints = [
      [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]
    ]
    const surroundingPointsWithinBounds = surroundingPoints.filter(
      point => {
        const [x, y] = point
        const xAcceptable = (x >= 0 && x <= canvasLength)
        const yAcceptable = (y >= 0 && y <= canvasHeight)
        return xAcceptable && yAcceptable
      }
    )
    const unvisitedSurroundingPoints = surroundingPointsWithinBounds.filter(
      surroundingPoint => {
        for (let visitedPoint of points) {
          if (JSON.stringify(visitedPoint) === JSON.stringify(surroundingPoint)) {
            return false
          }
        }
        return true
      }
    )
    if (!unvisitedSurroundingPoints.length) {
      return points
    }
    return unvisitedSurroundingPoints.reduce((acc, point) => {
      const walk = extendWalk([...acc, point])
      if (walk.length >= acc.length) {
        return walk
      }
      return acc
    }, points)
  }
}

{
  const gridSize = [6, 6]
  const stepSize = 20
  const points = makeRandoWalk(30, ...gridSize)
  drawPoints({ gridSize, stepSize, points })
}
{
  const gridSize = [6, 6]
  const stepSize = 20
  const points = makeNonIntersectingRandomWalk(...gridSize)
  console.log(points)
  drawPoints({ gridSize, stepSize, points })
}
{
  const gridSize = [6, 6]
  const stepSize = 20
  const points = makeCompleteSelfAvoidingWalk(...gridSize)
  console.log(points)
  drawPoints({ gridSize, stepSize, points })
}
