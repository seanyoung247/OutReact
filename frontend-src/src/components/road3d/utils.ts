
import { ObjectProps } from "../objects3d";
import { RoadObjectsDescriptor } from "../objects3d/templates/registry";
import { RoadDescriptor, RoadLayout } from "./types";


const isZPositioned = (z:number, length:number) => (z !== undefined && z >= 0 && z < length)

export const formatRoad = (
    length:number,
    road: RoadLayout[],
    objects: RoadObjectsDescriptor[]
):RoadDescriptor => {

    let x = 0;
    const segments:RoadLayout[] = road.map(v => ({
        ...v, x: (x += v.curve)
    }))

    objects.forEach(v => {
        const props = v.props as ObjectProps

        if (isZPositioned(props.z, road.length)) {
            if (!segments[props.z].roadObjects) segments[props.z].roadObjects = []
            segments[props.z].roadObjects?.push(v)
        }
    })

    return { length, segments }
}