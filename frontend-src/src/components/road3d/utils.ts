
import { wrap } from '../../utilities/misc'

export type RoadSegmentDescriptor = {
    curve: number,
}[]

export type RoadSegments = {
    z: number,
    bX: number,
    tX: number,
}[]

export const formatRoad = (roadSegments:RoadSegmentDescriptor):RoadSegments => {
    const segments:RoadSegments = []
    let topX = 0, baseX = 0

    for (let i = 0; i < roadSegments.length; i++) {
        segments.push({
            z: i, bX: baseX, tX: (baseX += topX)
        })
       topX +=  roadSegments[wrap(0, i, roadSegments.length)].curve
    }

    return segments
}