
import { RoadObjects as Objs } from "../../testRoad"
// import { ObjectTemplates } from "./templates"

import { RoadObjects as registry } from "./templates/registry"

/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = () => {
    return (
        <>
            { Objs.map((obj, i) => {
                const Component = registry(obj.type)
                return (
                    <Component key={i} {...obj.props} >
                        { obj.content }
                    </Component>
                )
            }) }
        </>
    )
}

/*
 * Produces scroll stops for all objects content objects on the road 
 */
export const ObjectStops = () => {
    return ( <></> )
}