'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { RootState } from '@/utils/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { gameTurn, hasMatrixChanged, randomMatrix } from '@/utils';
import { Alive } from '@/types';
export default function Menu() {
  const { matrix, dimensions } = useSelector((state: RootState) => state.lg)
  const dispatch = useDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  const matrixRef = useRef<Alive[][]>([]);
  

  useEffect(() => {
    matrixRef.current = matrix; // Asignamos la matriz inicial a matrixRef.current al montar el componente
  }, [matrix]);

  const startGame = () => {
    setIsPlaying(true);
    const intervalId = setInterval(() => {
      const newMatrix = gameTurn(matrixRef.current, dimensions)
      dispatch({ type: "matrix/draw", payload: newMatrix })
      
      if (!hasMatrixChanged(matrixRef.current, newMatrix)) {
        clearInterval(intervalId)
        setIsPlaying(false)
      }
    }, 120)
  }

  function generateRandom () {
    const newMatrix = randomMatrix(dimensions)
    dispatch({ type: "matrix/draw", payload: newMatrix })
  }

  return (
    <div className='flex flex-col gap-2 m-2'>
      <h1>Life Game</h1>
      <div>
        <div className='flex gap-2'>
          <p>Width (squares):</p>
          <input className='bg-transparent w-6' disabled={isPlaying} value={dimensions.width} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({type: 'dimensions/set', payload: {width: e.target.value, height: dimensions.height}})}/>
        </div>
        <div className='flex gap-2'>
          <p>Height (squares):</p>
          <input className='bg-transparent w-6' disabled={isPlaying} value={dimensions.height} />
        </div>
        <div className='flex gap-2'>
          <p>Randomness: </p>
          <input className='bg-transparent w-6' disabled={isPlaying} value={70} />
        </div>
        <div className='flex gap-2'>
          <p>Velocity (ms): </p>
          <input className='bg-transparent w-8' disabled={isPlaying} value={100} />
        </div>
        <button 
          className='p-3 bg-gray-700 rounded-md active:scale-95 disabled:bg-gray-950 disabled:text-gray-600' 
          onClick={startGame} 
          disabled={isPlaying}>
          Guardar
        </button>
      </div>
      <button 
        className='p-3 bg-gray-700 rounded-md active:scale-95 disabled:bg-gray-950 disabled:text-gray-600' 
        onClick={startGame} 
        disabled={isPlaying}>
        Comenzar
      </button>
      <button 
        className='p-3 bg-gray-900 rounded-md active:scale-95' 
        onClick={() => dispatch({ type: "matrix/reset"})}>
        Borrar
      </button>
      <button 
        className='p-3 bg-gray-700 rounded-md active:scale-95 disabled:bg-gray-950 disabled:text-gray-600' 
        onClick={generateRandom} 
        disabled={isPlaying}>
        Random
      </button>
    </div>
  )
}
