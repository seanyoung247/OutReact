
import { ObjectTemplates } from "./templates"

import "./sign"

/*
 * Manages visible road objects, info panels and decorations
 */
export const RoadObjects = () => {
    const Sign = ObjectTemplates.get('sign')
return (                
        <>
            <Sign z={5} x={0} header="Language Skills">
                <ul className='skills-list'>
                    <li><span>JavaScript</span> <span>100 m</span></li>
                    <li><span>HTML/CSS</span> <span>100 m</span></li>
                    <li><span>TypeScript</span> <span>75 m</span></li>
                    <li><span>Python</span> <span>75 m</span></li>
                </ul>
            </Sign>
        </>
    )
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