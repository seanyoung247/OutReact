
import { RoadObjects as Objs } from "../../testRoad"
import { ObjectTemplates } from "./templates"

/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = () => {
    return <>
        { Objs.map((obj, i) => {
            const Component = ObjectTemplates.get(obj.type)
            return <Component key={i} {...obj.props} />
        }) }
    </>
}

/*
 * Produces scroll stops for all objects content objects on the road 
 */
export const ObjectStops = () => {
    return (
        <>
            <div style={{
                height: '3.75%',
            }}></div>
            <div style={{
                height: '15lvh',
                scrollSnapAlign: 'start',
            }}></div>
            <div style={{
                height: '50%',
            }}></div>
        </>
    )
}