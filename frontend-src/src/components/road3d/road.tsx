
import { useContext, CSSProperties } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
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

const getSettings = (length:number):SegmentSettings => ({
    scale: 4,
    width: 150,
    height: 100 / length,
    lip: 2
})

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

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor, segmentSettings: SegmentSettings) => {
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

export const Road = ({road, length}:Props) => {
    const {camZ} = useContext(ScrollContext)
    const z = Math.floor(camZ) % road.length
    const segmentSettings = getSettings(length)
    const segments = buildRoad(z, length, road, segmentSettings)
    
    return (
        <div className="road" 
            style={{
                '--bZ': z,
                '--camZ': camZ % road.length + 0.15,
                '--scale': segmentSettings.scale,
                '--sW': segmentSettings.width,
                '--sH': segmentSettings.height,
                '--sL': segmentSettings.lip,
                '--bC': road[z].curve,
            }}
        >
            { segments }
        </div>
    )
}
