
import { ObjectProps } from '../types'

import './sprite.css'

export const Sprite = ({x,y,z,children}: ObjectProps) => (
    <div className='sprite' style={{
        '--x': x || 0,
        '--y': y || 0,
        '--z': z
    }}>
        { children }
    </div>
)