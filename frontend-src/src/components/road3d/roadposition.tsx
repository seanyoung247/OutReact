
import { createContext } from 'react'
import { useScrollState } from '../../hooks/scroll'
import { RoadDescriptor } from './utils'


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
    const camX = road[Math.floor(camZ) % road.length].x * 10

    return (
        <PositionContext.Provider value={{camZ, camX}}>
            <div style={{height:length}}>
                { children }
            </div>
        </PositionContext.Provider>
    )
}