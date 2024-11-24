
import { forJSX } from '../../utilities/react'
import { percent } from '../../utilities/misc'
import { RoadSettings } from './types'

import './roadtexture.css'

export const RoadTexture = ({lanes, length, height, lip}:RoadSettings) => {

    const center = percent((length / 2), height)
    const top = percent(lip, height)

    return (
        <svg className='road-texture'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'>
            <g>
                <rect className='road-tarmac-light'
                    x='0' y='0' width='100' height='100'
                />
                <rect className='road-tarmac-dark'
                    x='0' y={ (100 - center) } width='100' height={ center }
                />
                { forJSX(lanes, i => {
                    const pos = (100 / lanes) * (i + 1)
                    return (
                        <line key={ pos } className='road-lane-line' pathLength='100'
                            x1={ pos } y1={ top } x2={ pos } y2='100' 
                        /> 
                    )
                }) }
                <line className='road-edge-line' 
                    x1='1' y1='-1' x2='1' y2='101'
                />
                <line className='road-edge-line' 
                    x1='99' y1='-1' x2='99' y2='101'
                />
            </g>
        </svg>
    )
}
