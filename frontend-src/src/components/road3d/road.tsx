
import { useContext, useMemo, CSSProperties } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import './road.css'
// import './road-texture.css'
import { wrap } from '../../utilities/misc'

import roadTex from '../../assets/road.svg'
import roadLip from '../../assets/road-lip.svg'

// import roadTex from '../../assets/road.png'
// import roadLip from '../../assets/road.png'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}

const Segment = ({style}:{style:CSSProperties}) => (
    <div className='road-segment' style={style}>
        <svg className='road-lip'
            viewBox='0 0 100 100' 
            preserveAspectRatio='none'>
            <g>
                <rect className='road-tarmac-light'
                    width="100%" height="100%"
                    x="0" y="0"
                />
            </g>
        </svg>
        <svg className='road-texture'
            viewBox='0 0 100 100' 
            preserveAspectRatio='none'>
            <g>
                <rect className='road-tarmac-light'
                    width='100%' height='55%'
                    x='0' y='0'
                />
                <rect className='road-tarmac-dark'
                    width='100%' height='50%'
                    x='0' y='50%'
                />
            </g>
            <g>
                <rect className='road-lane-line'
                    width='2%' height='50%'
                    x='49%' y='25%'
                />
                <rect className='road-edge-line'
                    width='2%' height='100%'
                    x='2' y='0'
                />
                <rect className='road-edge-line'
                    width='2%' height='100%'
                    x='96%' y='0'
                />
            </g>
        </svg>
    </div>
)

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments:React.ReactElement[] = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[wrap(0, z, road.length)]
        segments.push(
            // <div key={z - start} className="road-segment"
            //     style={{
            //         '--z': z,
            //         '--bX': baseX,
            //         '--tX': (baseX += topX),
            //     }}
            // />
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
    const z = wrap(0, Math.floor(camZ), road.length)
    const segments = useMemo(
        () => buildRoad(z, length, road),
        [road, length, z]
    )
    
    return (
        <div className="road" 
            style={{
                '--sc': length,
                '--length': road.length,
                '--camZ': wrap(0, camZ, road.length),
                '--z': z,
                '--bC': road[z].curve,
                '--tex': `url(${roadTex})`,
                '--lip': `url(${roadLip})`
            }}
        >
            { segments }
        </div>
    )
}
