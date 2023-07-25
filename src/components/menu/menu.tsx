'use client';
import React from 'react'
import { RootState } from '@/utils/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { aliveNeighborsCounter } from '@/utils';
export default function Menu() {
  const { matrix, dimensions } = useSelector((state: RootState) => state.lg)
  const dispatch = useDispatch()

  const startGame = () => {
    console.log(matrix)
    const newMatrix = matrix.map((row) => [...row]);
    console.log(newMatrix)
    for (let i = 0; i < dimensions.height; i++) {
      for (let j = 0; j < dimensions.width; j++) {
        const aliveNeighbors = aliveNeighborsCounter(matrix, i, j);
        if (matrix[i][j] === 1) {
          // Alive Cell
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            // Die
            newMatrix[i][j] = 0
          }
        } else {
          // Dead Cell
          if (aliveNeighbors === 3) {
            // Regenerate cell
            newMatrix[i][j] = 1
          }
        }
      }
    }
    dispatch({ type: "matrix/draw", payload: newMatrix })
  }

  return (
    <div className='flex flex-col gap-2 m-2'>
      <h1>Life Game</h1>
      <p>Width: {dimensions.width}</p>
      <p>Height: {dimensions.height}</p>
      <button className='p-3 bg-gray-700 rounded-md active:scale-95' onClick={startGame}>
        Comenzar
      </button>
      <button className='p-3 bg-gray-900 rounded-md active:scale-95' onClick={() => dispatch({ type: "matrix/reset"})}>
        Borrar
      </button>
    </div>
  )
}
