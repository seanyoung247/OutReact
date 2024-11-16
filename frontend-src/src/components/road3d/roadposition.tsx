
import { createContext } from 'react'
import { useScrollState } from '../../hooks/scroll'
import { RoadDescriptor } from './utils'
import { tween } from '../../utilities/misc'


type Props = {
    road: RoadDescriptor,
    length: string,
    children?: React.ReactNode
}

export type ScrollStatus = {
    camZ: number,
    camX: number,
}
const defaultScrollStatus:ScrollStatus = {
    camZ:0, camX:0,
}
export const PositionContext = createContext(defaultScrollStatus)

export const RoadPosition = ({children, length, road}:Props) => {
    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * road.length
    const z = Math.floor(camZ)
    const cX = road[z % road.length].x
    const pX = (camZ > 1) ? road[(z - 1) % road.length].x : 0
    const camX = tween(pX, cX, camZ - z) * 10

    return (
        <PositionContext.Provider value={{camZ, camX}}>
            <div style={{height:length}}>
                { children }
            </div>
        </PositionContext.Provider>
    )
}