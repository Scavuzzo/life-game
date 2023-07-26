'use client';
import { Alive, Cell } from '@/types';
import { RootState } from '@/utils/redux/store'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cell = ({ alive, dimensions, coordinates }: Cell) => {
    const { width, height } = dimensions
    const dispatch = useDispatch()

    return (
        <div 
            style={{ width, height }} 
            className={`w-6 h-6 border cursor-pointer transition-colors duration-100 ${alive ? 'bg-black' : 'bg-white'}`} 
            onClick={() => dispatch({ type: "cell/set", payload: coordinates})} 
        /> 
    )
}

export default function Board() {
    const [loading, setLoading] = useState(true)
    const { matrix } = useSelector((state: RootState) => state.lg)
    const dispatch = useDispatch()
    const boardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch({ type: "dimensions/set", payload: {width: 15, height: 15}})
        setLoading(false)
        return () => {
        }
    }, [])
    

    return (
        <div ref={boardRef} className='flex w-[400px] h-[400px] '>
            <p className='md:hidden'>Abra el menu para configurar las opciones</p>
            { loading ? 
                <div className="inline-block h-8 w-8 m-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
                </div>
                : 
                matrix.map((row: Alive[],i: number) => (
                <div key={`row-${i}`}>

                    {row.map((alive: Alive, j: number) => (
                        <Cell 
                            key={`row-${i}-cell${j}`}  
                            alive={alive} 
                            dimensions={{width: 20, height: 20}} 
                            coordinates={{x: j, y: i}} 
                        />
                    ))}

                </div>

            ))}
        </div>
    )
}
