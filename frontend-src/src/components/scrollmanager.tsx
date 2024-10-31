
import { RoadSegmentDescriptor } from './road3d/utils'
import { createContext } from 'react'
import { useScrollState } from '../hooks/scroll'
import { useRef } from 'react'
import { wrap } from '../utilities/misc'

type Props = {
    scrollHeight: string,
    road: RoadSegmentDescriptor,
    children?: React.ReactNode
}

type SegmentPosition = {
    '--z': number,
    '--bX': number,
    '--tX': number,
}

type ScrollStatus = {
    camZ: number,
    camX: number,
    keyframes: SegmentPosition[][] | null
}
const defaultScrollStatus:ScrollStatus = {camZ:0,camX:0, keyframes:null}
export const ScrollContext = createContext(defaultScrollStatus)

const AnimateRoad = (road:RoadSegmentDescriptor) => {
    const animations:SegmentPosition[][] = Array(20).fill(null).map(()=>[])

    for (let z = 0; z < (road.length + 20); z++) {
        let topX = 0, baseX = 0
        for (let seg = 0; seg < 20; seg++) {
            const i = (seg + z) % road.length
            const segment = road[i]
            animations[seg].push({
                '--z': z + seg, 
                '--bX': baseX, 
                '--tX': (baseX += topX),
            })
            topX += segment.curve
        }
    }

    return animations
}

export const ScrollManager = ({scrollHeight, road, children}:Props) => {

    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * road.length
    const baseSeg = Math.max(Math.floor(camZ), 0)
    const xPos = useRef({camX:0, baseSeg})

    if (xPos.current.baseSeg !== baseSeg) {
        xPos.current.camX += (
            road[wrap(0, baseSeg, road.length)].curve *
            Math.sign(scroll.delta.y)
        )
    }
    const keyframes = AnimateRoad(road)

    return (
        <ScrollContext.Provider value={{camZ, camX:xPos.current.camX, keyframes}}>
            <div style={{'height': scrollHeight}} />
            { children }
        </ScrollContext.Provider>
    )
}