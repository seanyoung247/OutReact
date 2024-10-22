import { RoadSegment } from './roadsegment'
import { RoadSegmentDescriptor } from '../../../testRoad'
import { wrap } from '../../../utilities/misc'


export const buildRoad = (road: RoadSegmentDescriptor[], first: number, length: number) => {
    const segments = [
        <RoadSegment key={first - 1} z={first - 1} topX={0} baseX={0} 
            descriptor={road[wrap(0, first - 1, road.length)]} />
    ]
    let z = first
    let topX = 0
    let baseX = 0

    /* Builds a segment from one or more segment descriptors (allows LOD) */
    const buildSegment = (lod:number = 1) => {
        const segment = (
            <RoadSegment key={z} 
                z={z} 
                baseX={baseX} 
                topX={(baseX += topX)} 
                descriptor={road[wrap(0, z, road.length)]}
            />
        )
        topX += road[wrap(0, z, road.length)].curve
        z += lod
        return segment
    }

    for (let i = 0; i < length; i++) {
        segments.push(buildSegment())
    }

    return segments
}