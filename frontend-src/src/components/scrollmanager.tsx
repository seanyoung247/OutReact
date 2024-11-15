
import { createContext } from 'react'
import { useScrollState } from '../hooks/scroll'
import { RoadDescriptor } from './road3d/utils'


type Props = {
    road: RoadDescriptor,
    children?: React.ReactNode
}

export type SegmentPosition = {
    '--z': number,
    '--bX': number,
    '--tX': number,
    '--bC': number,
}

export type ScrollStatus = {
    camZ: number,
    camX: number,
}
const defaultScrollStatus:ScrollStatus = {
    camZ:0, camX:0,
}
export const ScrollContext = createContext(defaultScrollStatus)

export const ScrollManager = ({children, road}:Props) => {

    const scroll = useScrollState()
    const position: ScrollStatus = {
        camZ: (scroll.progress.y / 100) * 120,
        camX: road[Math.floor((scroll.progress.y / 100) * 120) % 120].x * 10
    }

    return (
        <ScrollContext.Provider value={position}>
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
            </div>
            { children }
        </ScrollContext.Provider>
    )
}