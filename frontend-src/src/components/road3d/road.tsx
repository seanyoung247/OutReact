
import { RoadSegmentDescriptor } from "../../testRoad"

import './road.css'

type Props = {
    road: RoadSegmentDescriptor[],
    length: number, 
    camZ: number,
}

export const Road = ({road, length, camZ}:Props) => {
    const segments = new Array(length).fill(0).map((_,i) => (
        <div className="road-segment"
            style={{ '--i': i }}
        />
    ))

    console.log(road, camZ)

    return (
        <>
            {segments}
        </>
        // <div className="road">
        //     {segments}
        // </div>
    )
}
