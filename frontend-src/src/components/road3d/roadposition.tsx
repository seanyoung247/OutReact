
import { createContext } from 'react'
import { useScrollState } from '../../hooks/scroll'
import { RoadDescriptor } from './types'
import { tween } from '../../utilities/misc'
import { useSettings } from "../../config"



type Props = {
    road: RoadDescriptor,
    children: React.ReactNode
}

export type ScrollStatus = {
    camZ: number,
    camX: number,
}

const defaultScrollStatus:ScrollStatus = {
    camZ:0, camX:0,
}
export const RoadPositionContext = createContext(defaultScrollStatus)

export const RoadPosition = ({children, road}:Props) => {

    const {settings:{scroll:{height}}} = useSettings()

    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * road.roadSegments.length
    const z = Math.floor(camZ)
    const cX = road.roadSegments[z % road.roadSegments.length].x ?? 0
    const pX = ((camZ > 1) ? road.roadSegments[(z - 1) % road.roadSegments.length].x : 0) ?? 0
    const camX = tween(pX, cX, camZ - z) * 10

    return (
        <RoadPositionContext.Provider value={{camZ, camX}}>
            <div style={{height}}>
                { children }
            </div>
        </RoadPositionContext.Provider>
    )

}