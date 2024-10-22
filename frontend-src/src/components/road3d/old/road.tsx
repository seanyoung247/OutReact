import { useMemo } from 'react'
import { RoadSegmentDescriptor } from '../../../testRoad'
import { wrap } from '../../../utilities/misc'
import { buildRoad } from './buildroad'
import { CSSFeatures } from '../../../utilities/css'

import './road.css'

type RoadProps = {
    road: RoadSegmentDescriptor[],
    camZ: number
}

export const Road = ({road, camZ}:RoadProps) => {
    const baseSeg = Math.max(Math.floor(camZ), 0)
    const segments = useMemo(
        () => buildRoad(road, baseSeg, 20),
        [road, baseSeg]
    )

    return (
        <div className="plane"
            style={{
                 ...(!CSSFeatures.timeline && {'--camZ': camZ}), 
                // '--camZ': camZ,
                '--bS': baseSeg, 
                '--bX': road[wrap(0, baseSeg, road.length)].curve,
                '--sc': 20,
                '--length': road.length
            }}>
            { segments }
        </div>
    )
}