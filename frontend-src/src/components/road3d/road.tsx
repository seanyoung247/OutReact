
import { RoadDescriptor, RoadLayout, VisibleSegments, RoadSettings } from "./types"

import { RoadObjects } from '../objects3d/objects'
import { RoadTexture } from './roadtexture'

import { useRoadPosition } from './hooks'

import { useSettings } from "~/config"

import './road.css'

type Props = {
    road: RoadDescriptor,
}

const getSegments = (start: number, road:RoadLayout[], settings:RoadSettings) => {
    const segments: VisibleSegments[] = []

    let topX = 0, baseX = 0
    const last = start + settings.count
    for (let z = start; z < last; z++) {
        const seg = road[z % road.length]
        segments.push({
            z: z, bX: baseX, tX: (baseX += topX),
            roadObjects: seg.roadObjects
        })
        topX += seg.curve
    }
    return segments
}

export const Road = ({road}:Props) => {

    const {camZ, segZ} = useRoadPosition()
    const {settings:{road:settings}} = useSettings()
    const segments = getSegments(segZ, road.segments, settings)
    
    const roadStyle = {
        '--bZ': segZ,
        '--bC': road.segments[segZ].curve,
        '--camZ': camZ % road.segments.length,
        '--scale': settings.scale,
        '--sW': settings.width,
        '--sH': settings.height,
        '--sV': settings.length,
        '--sL': settings.lip,
    }
    
    return (
        <div className="road" style={roadStyle}>
            <RoadObjects segments={segments} />
            { segments.map(v => (
                <div key={ v.z - segZ } className='road-segment'
                    style={ { '--myZ': v.z, '--bX': v.bX, '--tX': v.tX } }>

                    <RoadTexture { ...settings } />
                </div>
            )) }
        </div>
    )
}
