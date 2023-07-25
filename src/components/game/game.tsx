'use client';
import { RootState } from '@/utils/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Game() {
    const { dimensions } = useSelector((state: RootState) => state.lg)
  return (
    <div>
      <h1>Life Game</h1>
      <p>Width: {dimensions.width}</p>
      <p>Height: {dimensions.height}</p>
    </div>
  )
}
