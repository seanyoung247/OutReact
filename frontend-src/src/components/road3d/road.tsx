
import { RoadDescriptor, RoadSegmentDescriptor, RoadSegments, RoadSettings } from "./types"

import { RoadObjects } from '../objects3d/objects'
import { RoadTexture } from './roadtexture'

import { useRoadPosition } from './hooks'

import { useSettings } from "../../config"

import './road.css'

type Props = {
    road: RoadDescriptor,
    // settings: RoadSettings
}

const getSegments = (start: number, road:RoadSegmentDescriptor, settings:RoadSettings) => {
    const segments:RoadSegments[] = []

    let topX = 0, baseX = 0
    const last = start + settings.count
    for (let z = start; z < last; z++) {
        const seg = road[z % road.length]
        segments.push({
            z: z, bX: baseX, tX: (baseX += topX)
        })
        topX += seg.curve
    }
    return segments
}

export const Road = ({road}:Props) => {

    const {settings:{road:settings}} = useSettings()
    const {camZ} = useRoadPosition()

    const z = Math.floor(camZ) % road.roadSegments.length
    const segments = getSegments(z, road.roadSegments, settings)
    
    const roadStyle = {
        '--bZ': z,
        '--bC': road.roadSegments[z].curve,
        '--camZ': camZ % road.roadSegments.length,
        '--scale': settings.scale,
        '--sW': settings.width,
        '--sH': settings.height,
        '--sV': settings.length,
        '--sL': settings.lip,
    }
    
    return (
        <div className="road" style={roadStyle}>
            <RoadObjects road={road} />
            { segments.map(v => (
                <div key={ v.z - z } className='road-segment'
                    style={ { '--myZ': v.z, '--bX': v.bX, '--tX': v.tX } }>

                    <RoadTexture { ...settings } />
                </div>
            )) }
        </div>
    )
}
