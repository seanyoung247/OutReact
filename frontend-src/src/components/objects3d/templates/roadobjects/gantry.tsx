
import { /*useSVGDef,*/ useUpdateSVGDef } from "~/utilities/svglibrary"
import { cl } from "~/utilities/css"

import './gantry.css'


const svgTexture = (/*html*/
    `<linearGradient id="gantry-metal-h">
        <stop stop-color="#AAA" offset="0%"/>
        <stop stop-color="#DDD" offset="50%"/>
        <stop stop-color="#555" offset="98%"/>
        <stop stop-color="#000" offset="100%"/>
    </linearGradient>
    <linearGradient id="gantry-metal-v"
        href="#gantry-metal-h" gradientTransform="rotate(90)"
    />
    <symbol id="gantry-texture-svg">
        <!-- Gantry Legs -->
        <rect x="0" y="0" width="5" height="100" fill="url(#gantry-metal-h)" rx="2" ry="2"/>
        <rect x="95" y="0" width="5" height="100" fill="url(#gantry-metal-h)" rx="2" ry="2"/>
        <!-- Gantry Crossbeam -->
        <g>
            <rect fill="url(#gantry-metal-v)"
                x="3" y="10" width="94" height="4" rx="2" ry="2"
            />
            <rect fill="url(#gantry-metal-v)"
                x="3" y="20" width="94" height="4" rx="2" ry="2"
            />
        </g>
    </symbol>`
)

type Props = {
    className?: string;
}

export const Gantry = ({className}:Props) => {
    useUpdateSVGDef("gantry-texture-svg", svgTexture)

    return (
        <svg className={cl( "gantry", className )}
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio='none'
            viewBox="0 0 100 100"
        >
            <use href="#gantry-texture-svg" />
        </svg>
    )
}