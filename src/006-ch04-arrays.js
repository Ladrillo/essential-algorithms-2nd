import React, { useState } from 'react'
import { render } from 'react-dom'
import rcolor from 'randomcolor'

const twoDimensionalGrid = [
  [{ a: 1 }, { a: 2 }, { a: 3 }],
  [{ b: 1 }, { b: 2 }, { b: 3 }],
  [{ c: 1 }, { c: 2 }, { c: 3 }],
]

function Board(rows) {
  let board = []
  rows.forEach(row => {
    board = board.concat(...row)
  })

  this.board = board
  this.rowCount = rows.length
  this.colCount = rows[0].length
  // wip
  this.rows = this.board.reduce((acc, e, idx, arr) => {
    let x = idx % this.colCount
    let y = idx % this.rowCount
  })
}

const threeByThree = new Board(twoDimensionalGrid)

console.log(threeByThree)


export function Grid() {
  const [grid, setGrid] = useState(twoDimensionalGrid)
  return (
    <div>
      {
        grid.map((row, idx) => {
          return (
            <div key={idx} style={{ display: 'flex' }}>
              {
                row.map((e, idx) => {
                  return <div key={idx} style={{
                    height: '40px',
                    width: '40px',
                    backgroundColor: rcolor(),
                  }}></div>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

render(<Grid />, document.getElementById('grid'))
