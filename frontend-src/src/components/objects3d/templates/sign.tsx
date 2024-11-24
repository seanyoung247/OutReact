
import { useRoadPosition } from '../../road3d'
import { ObjectProps } from './registry'

import './sign.css'

export interface SignProps extends ObjectProps {
    header: string
}

export const Sign = ({z, header, children}:SignProps) => {
    const {camZ} = useRoadPosition()

    return (
        <div className='road-sign'
            style={{
                '--z': z,
                '--camZ': camZ,
            }}
        >
            <div className='sign-content'>
                <span className="sign-header">{ header }</span>
                { children }
            </div>
            
        </div>
    )
}
