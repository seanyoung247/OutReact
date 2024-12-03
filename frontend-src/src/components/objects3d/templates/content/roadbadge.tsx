
import { useSVGDef } from "~/utilities/svglibrary";
import "./roadbadge.css"


type RoadBadgeProps = {
    name: string;
    value: string;
}

export const RoadBadge = ({name, value}:RoadBadgeProps) => {
    useSVGDef('shield', (
        `<path id="shield"
            d="m 23.86588,2.88914 c 9.17463,2.800222 18.9137,4.306593 29.00468,4.306593 10.09086,0 19.8298,-1.506371 29.004445,-4.306464 9.17463,2.800093 18.913565,4.306464 29.004425,4.306464 10.09085,0 19.83004,-1.506371 29.00468,-4.306593 13.37876,16.909078 21.36589,38.279521 21.36589,61.515741 0,48.001809 -34.0863,88.041309 -79.374995,97.234299 C 36.58629,152.44619 2.5,112.40669 2.5,64.404881 2.5,41.168661 10.48724,19.798088 23.86588,2.88914 Z"
        />
        <clipPath id="shield-mask">
            <use href="#shield"/>
        </clipPath>`
    ))
    return (    
        <svg version="1.0" viewBox="0 0 165 165">

            <use href="#shield" className="badge-base"/>
            <rect className="badge-red" clipPath="url(#shield-mask)" 
                x="0" y="0" width="165" height="20%"
            />
            <rect className="badge-blue" clipPath="url(#shield-mask)" 
                x="0" y="22%" width="165" height="130"
            />

            <text className="top text" x="50%" y="16%">
                <tspan>{name}</tspan>
            </text>
        
            <text className="number text" x="50%" y="70%">
                <tspan>{value}</tspan>
            </text>
        </svg>
    )
}
