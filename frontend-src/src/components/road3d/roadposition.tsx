
import { createContext } from 'react'
import { useScrollState } from '../../hooks/scroll'
import { RoadDescriptor } from './utils'


type Props = {
    road: RoadDescriptor,
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

export const RoadPosition = ({children, road}:Props) => {
    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * road.length
    const camX = road[Math.floor(camZ) % road.length].x * 10

    return (
        <PositionContext.Provider value={{camZ, camX}}>
            <div style={{
                height:'20000px',
            }}>
                <div style={{
                    height: '3.75%',
                    background: 'green',
                    // scrollSnapAlign:'center',
                }}></div>
                <div style={{
                    background: 'red',
                    height: '15lvh',
                    width: '100%',
                    scrollSnapStop: 'always',
                    scrollSnapAlign: 'start',
                }}></div>
                <div style={{
                    height: '50%',
                    // scrollSnapAlign:'center',
                }}></div>
                { children }
            </div>
        </PositionContext.Provider>
    )
}