// 8- RANDOM WALKS
function makeRandoWalk(numPoints, canvasSize, stepSize) {
  let x = Math.round(canvasSize / 2)
  let y = Math.round(canvasSize / 2)

  let listOfPoints = []

  listOfPoints.push([x, y])

  for (let i = 1; i < numPoints; i++) {
    const direction = Math.floor(Math.random() * 4)
    if (direction === 0) y -= stepSize      // up
    else if (direction === 1) x += stepSize // right
    else if (direction === 2) y += stepSize // down
    else x -= stepSize                      // left

    listOfPoints.push([x, y])
  }

  return listOfPoints
}

function makeNonIntersectingRandomWalk(canvasLength, canvasHeight) {
  // set starting point randomly
  let x = Math.round(Math.random() * canvasLength)
  let y = Math.round(Math.random() * canvasHeight)

  let points = []

  let initial = [x, y]

  points.push(initial)

  console.log('initial', initial)

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
    console.log('visitable', unvisitedSurroundingPoints)
    if (!unvisitedSurroundingPoints.length) {
      console.log('TOTAL TRAJECTORY', points)
      return points
    }

    const randomMove = unvisitedSurroundingPoints[
      Math.floor(Math.random() * unvisitedSurroundingPoints.length)
    ]

    points.push(randomMove)

    [x, y] = randomMove
  }
}

makeNonIntersectingRandomWalk(2, 2)

function drawWalk(points, canvasSize) {
  const canvas = document.createElement('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  canvas.style.border = '1px dashed black'
  const ctx = canvas.getContext('2d')

  for (let idx = 0; idx < points.length - 1; idx++) {
    ctx.moveTo(...points[idx])
    ctx.lineTo(...points[idx + 1])
  }
  ctx.stroke()
  document.body.appendChild(canvas)
}
{
  const numPoints = 200
  const canvasSize = 400
  const stepSize = 10

  const walk = makeRandoWalk(numPoints, canvasSize, stepSize)
  drawWalk(walk, canvasSize)
}
