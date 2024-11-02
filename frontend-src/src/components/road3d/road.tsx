
import { useContext } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments:React.ReactElement[] = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[z % road.length]
        segments.push(
            <div key={z - start} className="road-segment"
                style={{
                    '--z': z,
                    '--bX': baseX,
                    '--tX': (baseX += topX),
                }}
            />
        )
        topX += segment.curve
    }

    return segments
}

export const Road = ({road, length}:Props) => {
    const {camZ} = useContext(ScrollContext)
    const z = Math.floor(camZ)
    const segments = buildRoad(z, length, road)

    return (
        <div className="road" 
            style={{
                '--sc': length,
                '--length': road.length,
                '--camZ': camZ,
                '--z': z,
                '--bC': road[z % road.length].curve
            }}
        >
            { segments }
        </div>
    )
}
