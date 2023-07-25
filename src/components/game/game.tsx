'use client';
import React from 'react'
import Board from '../board/board';
import Menu from '../menu/menu';

export default function Game() {
  return (
    <div className='flex'>
      <Board/>
      <Menu/>
    </div>
  )
}
