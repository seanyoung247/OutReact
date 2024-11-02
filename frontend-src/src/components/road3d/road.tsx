
import { useContext, useRef } from 'react'
import { RoadSegmentDescriptor } from "./utils"
import { ScrollContext, SegmentPosition } from '../scrollmanager'

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor,
    length: number,
}


// const RoadSegment = ({animation}:{animation:SegmentPosition[]}) => {
//     const segRef = useRef<HTMLDivElement | null>(null)
//     const animRef = useRef<any>(null)

//     if (segRef.current && !animRef.current) {
//         animRef.current = segRef.current.animate(
//             animation, {
//                 timeline: new ScrollTimeline({
//                     source: document.documentElement,
//                 })
//             }
//         )
//     }
//     return <div className='road-segment' ref={segRef}/>
// }


// const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor, keyframes:SegmentPosition[][]) => {
const buildRoad = (start:number, length:number, road:RoadSegmentDescriptor) => {
    const segments:React.ReactElement[] = []
    let topX = 0, baseX = 0

    for (let z = start; z < start + length; z++) {
        const segment = road[z % road.length]
        segments.push(
            <div key={z - start} className="road-segment"
                style={{
                    '--z': z,
                    '--bX': baseX,
                    '--tX': (baseX += topX),
                }}
            />
        )
        topX += segment.curve
    }
    // for (let i = 0; i < length; i++) {
    //     segments.push(
    //         <div key={i} className='road-segment'
    //             style={keyframes[i][start]}
    //         />
    //     )
    // }

    return segments
}

export const Road = ({road, length}:Props) => {
    const {camZ} = useContext(ScrollContext)
    const segZ = Math.floor(camZ)
    // const segments = buildRoad(Math.floor(camZ), length, road, keyframes)
    const segments = buildRoad(segZ, length, road)
    const zP = Math.floor(camZ)
    // const segments =  [...new Array(length)].map((_,i)=><RoadSegment key={i} animation={keyframes[i]}/>)
    // const roadRef = useRef<HTMLDivElement | null>(null)
    // const animRef = useRef<any>(null)
    // if (roadRef.current && !animRef.current) {
    //     animRef.current = roadRef.current.animate(
    //         keyframes[0], {
    //             timeline: new ScrollTimeline({
    //                 source: document.documentElement,
    //             })
    //         }
    //     )
    // }

    return (
        <div className="road" 
            style={{
                '--sc': length,
                '--camZ': camZ,
                '--z': segZ,
                '--bC': road[segZ % road.length].curve
                // '--z': keyframes && keyframes[0][zP]['--z'] || 0,
                // '--bX': keyframes && keyframes[1][zP]['--tX'] || 0,
            }}
        >
            { segments }
        </div>
    )
}
