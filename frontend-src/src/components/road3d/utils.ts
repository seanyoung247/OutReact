
export type RoadSegmentDescriptor = {
    curve: number,
}[]

export type RoadDescriptor = {
    curve: number,
    x: number,
}[]

export type RoadSegments = {
    z: number,
    bX: number,
    tX: number,
}

export type RoadSettings = {
    scale: number,
    distance: number,
    width: number,
    count: number,
    length: number,
    height: number,
    lanes: number,
    lip: number,
}

export const formatRoad = (road:RoadSegmentDescriptor):RoadDescriptor => {
    let x = 0;
    return road.map(v => ({
        ...v, x: (x += v.curve)
    }))
}