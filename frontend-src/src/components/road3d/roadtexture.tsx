
import { percent } from '../../utilities/misc'
import { RoadSettings } from './types'

import './roadtexture.css'
import { useUpdateSVGDef } from '../../utilities/svglibrary'


const getLanes = (count:number, top:number) => {
    let lanes = ``
    
    for (let i = 0; i < count; i++) {
        const pos = (100 / count) * (i + 1)
        lanes += `
            <line pathLength='100' stroke="var(--lane-line)"
                stroke-dashoffset="-25" stroke-dasharray="50"
                x1="${pos}" y1="${top}" x2="${pos}" y2='100' 
            />`
    }

    return lanes
}

const svgTexture = (lanes:number, length:number, height:number, lip:number) => {

    const center = percent((length / 2), height)
    const top = percent(lip, height)

    return `
        <symbol id="road-texture-svg">
            <rect fill="var(--tarmac-light)"
                x='0' y='0' width='100' height='100'
            />
            <rect fill="var(--tarmac-dark)"
                x='0' y="${(100 - center)}" width='100' height="${center}"
            />
            ${getLanes(lanes, top)}
            <line stroke="var(--gutter-line)"
                x1='1' y1='-1' x2='1' y2='101'
            />
            <line stroke="var(--gutter-line)"
                x1='99' y1='-1' x2='99' y2='101'
            />
        </symbol>
    `
}


export const RoadTexture = ({lanes, length, height, lip}:RoadSettings) => {

    useUpdateSVGDef('road-texture-svg', svgTexture(lanes, length, height, lip))

    return (
        <svg className='road-texture'
            version="1.0" 
            viewBox='0 0 100 100'
            preserveAspectRatio='none'>
            
            <use href="#road-texture-svg"/>
        </svg>
    )
}
