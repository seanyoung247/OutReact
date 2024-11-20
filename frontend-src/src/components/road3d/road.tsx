
import { useContext } from 'react'
import { RoadDescriptor } from "./utils"
import { percent } from '../../utilities/misc'

import { PositionContext } from './roadposition'
import { RoadObjects } from '../objects3d/objects'
import { RoadTexture } from './roadtexture'

import './road.css'


type RoadSettings = {
    scale: number,
    distance: number,
    width: number,
    count: number,
    length: number,
    height: number,
    lip: number,
}

type SegmentDesc = {
    z: number,
    bX: number,
    tX: number
}

type Props = {
    road: RoadDescriptor,
    settings: RoadSettings
}

const getSegments = (start: number, road:RoadDescriptor, settings:RoadSettings) => {
    const segments:SegmentDesc[] = []

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
    const segmentCenter = percent((settings.length / 2), settings.height)
    const segmentTop = percent(settings.lip, settings.height)
    
    return (
        <div className="road" 
            style={{
                '--bZ': z,
                '--bC': road[z].curve,
                '--camZ': camZ % road.length,
                '--scale': settings.scale,
                '--sW': settings.width,
                '--sH': settings.height,
                '--sV': settings.length,
                '--sL': settings.lip,
            }}
        >
            <RoadObjects />
            { segments.map(v => (
                <div key={v.z - z} className='road-segment'
                    style={{
                        '--myZ': v.z,
                        '--bX': v.bX,
                        '--tX': v.tX,
                    }}
                >
                    <RoadTexture lanes={3} center={segmentCenter} top={segmentTop} />
                </div>
            )) }
        </div>
    )
}
