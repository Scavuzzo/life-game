export type Alive = 1 | 0

export interface Cell {
    alive: Alive;
    dimensions: { width: number, height: number },
    coordinates: { x: number, y: number }
}

export interface Row {
    index: number,
    width: number
}

export interface Box {
    width: number,
    height: number
}