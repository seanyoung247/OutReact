
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
    const segments:VisibleSegments[] = []

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

    const {settings:{road:settings}} = useSettings()
    const {camZ} = useRoadPosition()

    const z = Math.floor(camZ) % road.segments.length
    const segments = getSegments(z, road.segments, settings)
    
    const roadStyle = {
        '--bZ': z,
        '--bC': road.segments[z].curve,
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
                <div key={ v.z - z } className='road-segment'
                    style={ { '--myZ': v.z, '--bX': v.bX, '--tX': v.tX } }>

                    <RoadTexture { ...settings } />
                </div>
            )) }
        </div>
    )
}
