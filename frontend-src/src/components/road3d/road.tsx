
import { useContext, CSSProperties } from 'react'
import { RoadDescriptor } from "./utils"
import { PositionContext } from './roadposition'

import './road.css'
import './roadtexture.css'

type Props = {
    road: RoadDescriptor,
    scale: number,
    count: number,
    width: number,
    height: number,
    length: number,
    lip: number
}

type SegmentProps = {
    style: CSSProperties,
    center: number,
    top: number,
}

type SegmentSettings = {
    scale: number,
    width: number,
    height: number,
    length: number,
    lip: number,
}

const Segment = ({ style, center, top}: SegmentProps) => (
    <div className='road-segment' style={style}>
        <svg className='road-texture'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'>
            <g>
                <rect className='road-tarmac-light'
                    x='0' y='0' width='100' height='100'
                />
                <rect className='road-tarmac-dark'
                    x='0' y={(100 - center)} width='100' height={center}
                />
                <line className='road-lane-line' pathLength='100'
                    x1='50' y1={top} x2='50' y2='100' 
                />
                <line className='road-edge-line' 
                    x1='3' y1='0' x2='3' y2='100'
                />
                <line className='road-edge-line' 
                    x1='97' y1='0' x2='97' y2='100'
                />
            </g>
        </svg>
    </div>
)

const buildRoad = (start:number, length:number, road:RoadDescriptor, segmentSettings: SegmentSettings) => {
    const segments:React.ReactElement[] = []
    const segmentCenter = ((segmentSettings.length / 2) / segmentSettings.height) * 100
    const segmentTop = (segmentSettings.lip / segmentSettings.height) * 100

    let topX = 0, baseX = 0
    for (let z = start; z < start + length; z++) {
        const segment = road[z % road.length]
        segments.push(
            <Segment key={z - start}
                center={segmentCenter}
                top={segmentTop}
                style={{
                    '--myZ': z,
                    '--bX': baseX,
                    '--tX': (baseX += topX)
                }}
            />
        )
        topX += segment.curve
    }

    return segments
}

export const Road = ({road, scale, lip, width, height, length, count}:Props) => {
    const {camZ} = useContext(PositionContext)
    const z = Math.floor(camZ) % road.length
    const segments = buildRoad(z, count, road, {scale, width, height, length, lip})
    
    return (
        <div className="road" 
            style={{
                '--bZ': z,
                '--bC': road[z].curve,
                '--camZ': camZ % road.length,
                '--scale': scale,
                '--sW': width,
                '--sH': height,
                '--sV': length,
                '--sL': lip,
            }}
        >
            { segments }
        </div>
    )
}
