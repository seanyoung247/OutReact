
import { useContext, useMemo } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import './road.css'
// import './road-texture.css'
import { wrap } from '../../utilities/misc'

import roadTex from '../../assets/road.svg'
import roadLip from '../../assets/road-lip.svg'

// import roadTex from '../../assets/road.png'
// import roadLip from '../../assets/road.png'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments:React.ReactElement[] = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[wrap(0, z, road.length)]
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
    const z = wrap(0, Math.floor(camZ), road.length)
    const segments = useMemo(
        () => buildRoad(z, length, road),
        [road, length, z]
    )
    
    return (
        <div className="road" 
            style={{
                '--sc': length,
                '--length': road.length,
                '--camZ': wrap(0, camZ, road.length),
                '--z': z,
                '--bC': road[z].curve,
                '--tex': `url(${roadTex})`,
                '--lip': `url(${roadLip})`
            }}
        >
            { segments }
        </div>
    )
}
