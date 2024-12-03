
import { useSettings } from '../../../../config'
import { useRoadPosition } from '../../../road3d'
import { ObjectProps } from '../../types'

import './sprite.css'

export const Sprite = ({x,y,z,children}: ObjectProps) => {
    const {camZ} = useRoadPosition()
    const {settings} = useSettings()

    return (
        <div className='sprite' style={{
            '--camZ': camZ,
            '--maxZ': settings.view.distance,
            '--sL': settings.road.length,
            '--x': x || 0,
            '--y': y || 0,
            '--z': z
        }}>
            { children }
        </div>
    )
}