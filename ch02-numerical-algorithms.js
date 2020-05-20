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

function drawRandomWalk(numPoints, canvasSize, stepSize) {
  const canvas = document.createElement('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  canvas.style.border = '1px solid black'
  const ctx = canvas.getContext('2d')

  const points = makeRandoWalk(numPoints, canvasSize, stepSize)

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
  const stepSize = 20

  drawRandomWalk(numPoints, canvasSize, stepSize)
}
