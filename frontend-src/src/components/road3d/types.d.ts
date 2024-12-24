
import { ContainerRegistry } from "../objects3d/containers";
import { ContainerDesc, RoadObjectDesc } from "../objects3d/templates/registry";
import { TargetRegistry } from "~/utilities/registry";

export type RoadSegmentDescriptor = {
    curve: number;
    x?: number;
}[]

export type RoadSegments = {
    z: number;
    bX: number;
    tX: number;
}

export type RoadSettings = {
    scale: number;
    distance: number;
    width: number;
    count: number;
    length: number;
    height: number;
    lanes: number;
    lip: number;
}

export type RoadLayout = {
    curve: number;
    x?: number;
    // Attached Objects:
    roadObjects?: RoadObjectDesc[];
}

export type VisibleSegments = {
    z: number;
    bX: number;
    tX: number;
    // Attached Objects:
    roadObjects?: RoadObjectsDesc[];
}

export type RoadDescriptor = {
    length: number;
    segments: RoadLayout[];
    containers: ContainerRegistry;
    triggers: TargetRegistry;
    // TO DO: More here as needed
}