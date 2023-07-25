'use client';
import { Alive, Cell } from '@/types';
import { RootState } from '@/utils/redux/store'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cell = ({ alive, dimensions, coordinates }: Cell) => {
    const { width, height } = dimensions
    const dispatch = useDispatch()

    return (
        <div style={{ width, height }} className={`w-6 h-6 border cursor-pointer ${alive ? 'bg-black' : 'bg-white'}`} onClick={() => dispatch({ type: "cell/set", payload: coordinates})} /> 
    )
}

export default function Board() {
    const { dimensions, matrix } = useSelector((state: RootState) => state.lg)
    const boardRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={boardRef} className='flex w-[400px] h-[400px] '>
            {matrix.map((row: Alive[],i: number) => (

                <div key={`row-${i}`}>

                    {row.map((alive: Alive, j: number) => (
                        <Cell key={`row-${i}-cell${j}`}  alive={alive} dimensions={{width: 20, height: 20}} coordinates={{x: j, y: i}} />
                    ))}

                </div>

            ))}
        </div>
    )
}
