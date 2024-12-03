
import { DynamicObject } from "./dynamic";

import { useSettings } from "~/config"

import { ObjectSettings } from "./types";
import { VisibleSegments } from "../road3d"
import { RoadObjectDesc} from "./templates/registry"

type Props = {
    segments: VisibleSegments[];   // Currently visible road segments
}

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

/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = ({segments}: Props) => {
    const {settings:{objects:settings}} = useSettings()
    const objs = getVisibleObjects(segments, settings)

    return (
        objs.map((obj, i) => (
            <DynamicObject key={i} obj={obj} depth={0}/>
        ))
    )
}

/*
 * Produces scroll stops for all content objects on the road 
 */
export const RoadStops = () => {
    return ( <></> )
}