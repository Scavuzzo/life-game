'use client';
import { RootState } from '@/utils/redux/store'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'


export default function Board() {
    const { dimensions } = useSelector((state: RootState) => state.lg)
    const boardRef = useRef<HTMLDivElement>(null)
    const table = []
    
    const Box = ({ color }: { color: 'black' | 'white' }) => {
        const [width, setWidth] = useState(40)
        const [height, setHeight] = useState(40)
        if (boardRef?.current) {
            setWidth(dimensions.width / boardRef?.current?.clientWidth)
            setHeight(dimensions.height / boardRef?.current?.clientHeight)
        }
        return (
            <div style={{width, height}} className={`w-6 h-6 border ${color === 'white' ? 'bg-white border-black' : 'bg-black border-white'}`}>
            </div>
        )
    }
    const Row = ({ index, width }: { index: number, width: number }) => {
        const row = []
        for (let i = 0; i < width; i++) {
            row.push(<Box key={i + 'box'} color='black' />)
        }
        return (
            <div className='flex'>
                {row}
            </div>
        )
    }
    for (let i = 0; i < dimensions.height; i++) {
        table.push(<Row key={i + 'row'} index={i} width={dimensions.width} />)
    }
    return (
        <div ref={boardRef} className='flex flex-col w-[800px] h-[800px] '>
            {table}
        </div>
    )
}
