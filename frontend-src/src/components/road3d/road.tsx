
import {  RoadSegmentDescriptor } from "./utils"

import { wrap } from '../../utilities/misc'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number, 
    camZ: number,
}

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[wrap(0, z, road.length)]
        segments.push(
            <div key={z} className="road-segment"
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

export const Road = ({road, length, camZ}:Props) => {
    const segments = buildRoad(Math.floor(camZ), length, road)

    return (
        <div className="road"
            style={{
                '--sc': 20,
                '--camZ': camZ,
                '--bZ': Math.floor(camZ),
                '--bX': road[wrap(0, Math.floor(camZ), road.length)].curve
            }}
        >
            { segments }
        </div>
    )
}
