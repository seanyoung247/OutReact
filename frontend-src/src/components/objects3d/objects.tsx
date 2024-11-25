
import { useSettings } from "../../config"
import { RoadDescriptor } from "../road3d"
import { objectsRegistry, RoadObjectsDescriptor } from "./templates/registry"


type Props = {
    road: RoadDescriptor
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

/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = ({road}: Props) => {
    const objs = road.roadObjects
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