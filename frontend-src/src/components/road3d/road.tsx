
import { RoadSegmentDescriptor } from "../../testRoad"

import './road.css'
import './road-texture.css'

type Props = {
    road: RoadSegmentDescriptor[],
    length: number, 
    camZ: number,
}

export const Road = ({road, length, camZ}:Props) => {
    const segments = new Array(length).fill(0).map((_,i) => (
        <div className="road-segment"
            style={{ '--i': i, '--sc': 20}}
        />
    ))

    console.log(road, camZ)

    return <>{ segments }</>
}
