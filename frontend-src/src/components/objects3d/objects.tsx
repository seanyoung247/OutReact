
import { RoadDescriptor } from "../road3d"
import { objectsRegistry as registry } from "./templates/registry"


type Props = {
    road: RoadDescriptor
}


/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = ({road}: Props) => {
    const Objs = road.roadObjects
    return (
        <>
            { Objs.map((obj, i) => {
                const Component = registry(obj.type)
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