
import { useContext, useMemo, CSSProperties } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}

const Segment = ({style}:{style:CSSProperties}) => (
    <div className='road-segment' style={style}>
        <svg className='road-texture'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'>
            <g>
                <rect className='road-tarmac-light'
                    x='0' y='0' width='100%' height='100%'
                />
                <rect className='road-tarmac-dark'
                    x='0' y='50%' width='100%' height='50%'
                />
                <rect className='road-lane-line'
                    x='49%' y='25%' width='2%' height='50%'
                />
                <rect className='road-edge-line'
                    x='2%' y='0' width='2%' height='100%'
                />
                <rect className='road-edge-line'
                    x='96%' y='0' width='2%' height='100%'
                />
            </g>
        </svg>
    </div>
)

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments:React.ReactElement[] = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[z % road.length]
        segments.push(
            <Segment key={z - start}
                style={{
                    '--z': z,
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
    const segments = useMemo(
        () => buildRoad(z, length, road),
        [road, length, z]
    )
    
    return (
        <div className="road" 
            style={{
                '--sc': length,
                '--length': road.length,
                '--camZ': camZ % road.length,
                '--z': z,
                '--bC': road[z].curve,
            }}
        >
            { segments }
        </div>
    )
}
