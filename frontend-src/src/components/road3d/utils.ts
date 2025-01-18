
import { ObjectProps } from "../objects3d";
import { ContainerRegistry } from "../objects3d/containers";
import { RoadObjectDesc } from "../objects3d/templates/registry";
import { RoadDescriptor, RoadLayout } from "./types";
import { TargetRegistry } from "~/utilities/registry";


const isZPositioned = (z:number, length:number) => (
    z !== undefined && z >= 0 && z < length
)

export const formatRoad = (
    length: number,
    road: RoadLayout[],
    objects: RoadObjectDesc[],
    containers: ContainerRegistry,
    triggers: TargetRegistry,
    animations: TargetRegistry<AnimationKeyFrame>,
): RoadDescriptor => {
    // Generate absolute x offset from cummulative curve
    let x = 0;
    const segments:RoadLayout[] = road.map(v => ({
        ...v, x: (x += v.curve)
    }))
    // Pin road objects to nearest segment
    objects.forEach(v => {
        const props = v.props as ObjectProps
        const z = Math.floor(props.z)

        if ( isZPositioned(props.z, road.length) ) {
            if (!segments[z].roadObjects) segments[props.z].roadObjects = []
            segments[props.z].roadObjects?.push(v)
        } else {
            console.warn('Invalid component found in road objects!')
        }
    })

    return { length, segments, containers, triggers, animations }
}
