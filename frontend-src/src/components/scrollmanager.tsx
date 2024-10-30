
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

export const ScrollContext = createContext({camZ:0,camX:0})

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

    return (
        <ScrollContext.Provider value={{camZ, camX:xPos.current.camX}}>
            <div style={{'height': scrollHeight}} />
            { children }
        </ScrollContext.Provider>
    )
}