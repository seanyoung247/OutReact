
import { RoadSegmentDescriptor } from "./types";

export const formatRoad = (road:RoadSegmentDescriptor):RoadSegmentDescriptor => {
    let x = 0;
    return road.map(v => ({
        ...v, x: (x += v.curve)
    }))
}