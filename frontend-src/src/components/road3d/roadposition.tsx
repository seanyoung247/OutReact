
import { createContext } from 'react'
import { useScrollState } from '~/hooks/scroll'
import { RoadDescriptor } from './types'
import { tween } from '~/utilities/math'
import { useSettings } from "~/config"


type Props = {
    road: RoadDescriptor,
    children: React.ReactNode
}

export type ScrollStatus = {
    camZ: number,
    segZ: number,
    camX: number,
}

export const RoadPositionContext = createContext({camZ:0, segZ:0, camX:0,})

export const RoadPosition = ({children, road}:Props) => {
    const {settings:{scroll:{height}}} = useSettings()
    const scroll = useScrollState()
    // Z Position
    const camZ = (scroll.progress.y / 100) * road.length
    const segZ = Math.floor(camZ) % road.segments.length
    // X Position
    const cX = road.segments[segZ].x ?? 0
    const pX = ((camZ > 1) ? road.segments[(segZ - 1)].x : 0) ?? 0
    const camX = tween(pX, cX, camZ - segZ) * 10

    return (
        <RoadPositionContext.Provider value={{camZ, segZ, camX}}>
            <div style={{height}}>
                { children }
            </div>
        </RoadPositionContext.Provider>
    )
}