
import { useContext } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext } from '../scrollmanager'

import { wrap } from '../../utilities/misc'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}

const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor, keyframes:any) => {
    const segments = []
    // let topX = 0, baseX = 0

    // for (let z = start; z < start + length; z++) {
    //     const segment = road[wrap(0, z, road.length)]
    //     segments.push(
    //         <div key={z - start} className="road-segment"
    //             style={{
    //                 '--z': z,
    //                 '--bX': baseX,
    //                 '--tX': (baseX += topX),
    //             }}
    //         />
    //     )
    //     topX += segment.curve
    // }
    for (let i = 0; i < length; i++) {
        segments.push(
            <div key={i} className='road-segment'
                style={keyframes[i][start]}
            />
        )
    }

    return segments
}

export const Road = ({road, length}:Props) => {
    const {camZ, keyframes} = useContext(ScrollContext)
    const segments = buildRoad(Math.floor(camZ), length, road, keyframes)

    return (
        <div className="road"
            style={{
                '--sc': 20,
                '--camZ': camZ,
                '--bZ': Math.floor(camZ),
                '--bX': road[wrap(0, Math.floor(camZ), road.length)].curve
            }}
        >
            { segments }
        </div>
    )
}
