
import { RoadSegmentDescriptor } from "../../testRoad"

// import { RoadSegmentDescriptor, testSegments } from './utils'
import { wrap } from '../../utilities/misc'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor[],
    length: number, 
    camZ: number,
}

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor[]) => {
    const segments = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        segments.push(
            <div key={z} className="road-segment"
                style={{
                    '--z': z,
                    '--bX': baseX,
                    '--tX': (baseX += topX),
                    '--f': (topX += road[wrap(0, z, road.length)].curve),
                }}
            />
        )
    }

    return segments
}

export const Road = ({road, length, camZ}:Props) => {
    // let topX = 0
    // let baseX = 0

    // const segments = new Array(length).fill(0).map((_,i) => (
    //     <div key={i} className="road-segment"
    //         style={{
    //             '--i': i,
    //             '--bX': baseX,
    //             '--tX': (baseX += topX),
    //             '--f': (topX += testSegments[i].x),
    //         }}
    //     />
    // ))

    // console.log(road, camZ)

    const segments = buildRoad(Math.floor(camZ), length, road)

    return (
        <div className="road"
            style={{
                '--sc': 20,
                '--camZ': camZ
            }}
        >
            { segments }
        </div>
    )
}
