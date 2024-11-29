
import { useSettings } from "../../config"
import { VisibleSegments } from "../road3d"
import { objectsRegistry, RoadObjectsDescriptor } from "./templates/registry"
import { ObjectSettings } from "./types";


type Props = {
    segments: VisibleSegments[];   // Currently visible road segments
}

type ContentType = Array<string | RoadObjectsDescriptor>

const renderContent = (content: ContentType, depth: number, maxDepth: number) => {
    if (depth >= maxDepth) {
        return null
    }

    return (
        content.map((item, i) => 
            typeof item === 'string' ? (
                <span key={i}>{item}</span>
            ) : (
                <DynamicObject key={i} obj={item} depth={depth+1}/>
            )
        )
    )
}

const DynamicObject = ({ obj, depth }: { obj: RoadObjectsDescriptor, depth:number }) => {
    const {settings:{objects}} = useSettings()
    const Component = objectsRegistry(obj.type)

    return (
        <Component {...obj.props}>
            {obj.content && renderContent(obj.content, depth, objects.maxDepth)}
        </Component>
    )
}

const getVisibleObjects = (segments: VisibleSegments[], settings:ObjectSettings) => {
    const objects: RoadObjectsDescriptor[] = []

    for (let i = 0; i < segments.length; i++) {
        const segObj = segments[i].roadObjects
        if (segObj) {
            for (let j = 0; j < segObj.length; j++) {
                objects.push(segObj[j])
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
 * Produces scroll stops for all objects content objects on the road 
 */
export const RoadStops = () => {
    return ( <></> )
}