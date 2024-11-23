
import { RoadDescriptor } from "../road3d"
import { objectsRegistry, /*RoadObjectsDescriptor*/ } from "./templates/registry"


type Props = {
    road: RoadDescriptor
}

// type ContentType = Array<string | RoadObjectsDescriptor>

// const renderContent = (content: ContentType, depth: number) => ((
//     content.map
// ))

// const DynamicObject = ({ obj, depth }: { obj: RoadObjectsDescriptor, depth:number }) => {
//     const Component = objectsRegistry(obj.type)
//     return (
//         <Component {...obj.props}>
//             {}
//         </Component>
//     )
// }

// const ObjectRenderer = () => {

// }


/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = ({road}: Props) => {
    const Objs = road.roadObjects
    return (
        <>
            { Objs.map((obj, i) => {
                const Component = objectsRegistry(obj.type)
                return (
                    <Component key={i} {...obj.props} >
                        { obj.content && obj.content.map((item, i) => (
                            typeof item === "string" ? (
                                <span key={i}>{item}</span>
                            ) : (null)
                        )) }
                    </Component>
                )
            }) }
        </>
    )
}

/*
 * Produces scroll stops for all objects content objects on the road 
 */
export const RoadStops = () => {
    return ( <></> )
}