
import { percent } from '../../utilities/math'
import { RoadSettings } from './types'

import { useUpdateSVGDef } from '../../utilities/svglibrary'

import './roadtexture.css'


const repeat = (count: number, effect: (i:number)=>string) => {
    let str = ''
    for (let i = 0; i < count; i++) str += effect(i);
    return str
}

const svgTexture = (lanes:number, length:number, height:number, lip:number) => {

    const center = percent((length / 2), height)
    const top = percent(lip, height)

    return (
        `<symbol id="road-texture-svg">
            <rect fill="var(--tarmac-light)"
                x='0' y='0' width='100' height='100'
            />
            <rect fill="var(--tarmac-dark)"
                x='0' y="${(100 - center)}" width='100' height="${center}"
            />
            ${repeat(lanes, i => {
                const pos = (100 / lanes) * (i + 1)
                return (
                    `<line pathLength='100' stroke="var(--lane-line)"
                        stroke-dashoffset="-25" stroke-dasharray="50"
                        x1="${pos}" y1="${top}" x2="${pos}" y2='100' 
                    />`
                )
            })}
            <line stroke="var(--gutter-line)"
                x1='1' y1='-1' x2='1' y2='101'
            />
            <line stroke="var(--gutter-line)"
                x1='99' y1='-1' x2='99' y2='101'
            />
        </symbol>`
    )
}


export const RoadTexture = ({lanes, length, height, lip}:RoadSettings) => {

    useUpdateSVGDef('road-texture-svg', svgTexture(lanes, length, height, lip))

    return (
        <svg className='road-texture'
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio='none'
            viewBox='0 0 100 100'
        >
            <use href="#road-texture-svg"/>
        </svg>
    )
}
