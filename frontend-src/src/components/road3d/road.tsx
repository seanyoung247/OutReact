
import { useContext, CSSProperties } from 'react'
import { RoadDescriptor } from "./utils"
import { PositionContext } from './roadposition'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadDescriptor,
    scale: number,
    count: number,
    width: number,
    height: number,
    lip: number
}

type SegmentProps = {
    style: CSSProperties,
    center: number,
}

type SegmentSettings = {
    scale: number,
    width: number,
    height: number,
    lip: number,
}

const Segment = ({ style, center }: SegmentProps) => (
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
                <rect className='road-lane-line'
                    x='49' y={25 + (center / 2)} width='2' height={center}
                />
                <rect className='road-edge-line'
                    x='2' y='0' width='2' height='100'
                />
                <rect className='road-edge-line'
                    x='96' y='0' width='2' height='100'
                />
            </g>
        </svg>
    </div>
)

const buildRoad = (start:number, length:number, road:RoadDescriptor, segmentSettings: SegmentSettings) => {
    const segments:React.ReactElement[] = []
    const segmentCenter = ((segmentSettings.height / 2) / (segmentSettings.height + segmentSettings.lip)) * 100
    let topX = 0, baseX = 0
    for (let z = start; z < start + length; z++) {
        const segment = road[z % road.length]
        segments.push(
            <Segment key={z - start}
                center={segmentCenter}
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

export const Road = ({road, scale, lip, width, height, count}:Props) => {
    const {camZ} = useContext(PositionContext)
    const z = Math.floor(camZ) % road.length
    const segments = buildRoad(z, count, road, {scale, width, height, lip})
    
    return (
        <div className="road" 
            style={{
                '--bZ': z,
                '--camZ': camZ % road.length + 0.15,
                '--scale': scale,
                '--sW': width,
                '--sH': height,
                '--sL': lip,
                '--bC': road[z].curve,
            }}
        >
            { segments }
        </div>
    )
}
