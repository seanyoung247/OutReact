
import { classList } from '../../../utilities/css'
import { RoadSegmentDescriptor } from '../../../testRoad'

import './roadsegment.css'

type Props = {
    z: number,  // Z Position
    topX: number, // Top X offset
    baseX: number, // Bottom X offset
    descriptor: RoadSegmentDescriptor,
}

export const RoadSegment = ({z, topX, baseX, descriptor}:Props) => (
    <div className={classList(
            'road-segment',
            descriptor?.classes
        )} 
        style={{'--z': z, '--tX': topX, '--bX': baseX}}/>
)