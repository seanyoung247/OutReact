
import { useContext } from 'react'
import { RoadDescriptor, RoadSegments, RoadSettings } from "./utils"

import { PositionContext } from './roadposition'
import { RoadObjects } from '../objects3d/objects'
import { RoadTexture } from './roadtexture'

import './road.css'

type Props = {
    road: RoadDescriptor,
    settings: RoadSettings
}

const getSegments = (start: number, road:RoadDescriptor, settings:RoadSettings) => {
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

export const Road = ({road, settings}:Props) => {
    const {camZ} = useContext(PositionContext)
    const z = Math.floor(camZ) % road.length
    const segments = getSegments(z, road, settings)
    const roadStyle = {
        '--bZ': z,
        '--bC': road[z].curve,
        '--camZ': camZ % road.length,
        '--scale': settings.scale,
        '--sW': settings.width,
        '--sH': settings.height,
        '--sV': settings.length,
        '--sL': settings.lip,
    }
    
    return (
        <div className="road" style={roadStyle}>
            <RoadObjects />
            { segments.map(v => (
                <div key={ v.z - z } className='road-segment'
                    style={ { '--myZ': v.z, '--bX': v.bX, '--tX': v.tX } }>

                    <RoadTexture { ...settings } />
                </div>
            )) }
        </div>
    )
}
