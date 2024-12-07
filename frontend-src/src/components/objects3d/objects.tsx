
import { DynamicObject } from "./dynamic";
import { useSettings } from "~/config"
import { ObjectSettings } from "./types";
import { VisibleSegments, RoadDescriptor } from "../road3d"
import { RoadObjectDesc} from "./templates/registry"
import { useContainers } from "./containers";
import { iterate } from "~/utilities/react";


const getVisibleObjects = (segments: VisibleSegments[], settings:ObjectSettings) => {
    const objects: RoadObjectDesc[] = []

    // Iterate over visible road segments
    for (let i = 0; i < segments.length; i++) {
        const segObj = segments[i].roadObjects
        if (segObj) {
            // Pull out the objects at this segment location 
            // and add them to the visible object list
            for (let j = 0; j < segObj.length; j++) {
                // Inject segment x position for positioned objects
                segObj[j].props.x = segments[i].bX
                objects.push(segObj[j])
                // If the visible object list is too long, bail
                if (objects.length >= settings.maxObjects) {
                    return objects
                }
            }
        }
    }

    return objects
}

type RoadObjectProps = {
    segments: VisibleSegments[];   // Currently visible road segments
}
/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = ({segments}: RoadObjectProps) => {
    const {settings:{objects:settings}} = useSettings()
    const objs = getVisibleObjects(segments, settings)

    return (
        objs.map((obj, i) => (
            <DynamicObject key={i} obj={obj} />
        ))
    )
}

type ContainersProps = {
    road: RoadDescriptor;
}

export const Containers = ({road}: ContainersProps) => {
    const containers = useContainers(road.containers)
    const visible = containers.getVisible()

    return (iterate(visible, ([key, obj]) => {
        obj.props.close = () => containers.hide(key)
        return <DynamicObject key={key} obj={obj} />
    }))
}

/*
 * Produces scroll stops for all content objects on the road 
 */
export const RoadStops = () => {
    return ( <></> )
}