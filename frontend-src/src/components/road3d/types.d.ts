
import { RoadObjectsDescriptor } from "../objects3d/templates/registry"

export type RoadSegmentDescriptor = {
    curve: number,
    x?: number,
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

export type RoadDescriptor = {
    roadSegments: RoadSegmentDescriptor,
    roadObjects: RoadObjectsDescriptor[],
    // TO DO: More here as needed
}
