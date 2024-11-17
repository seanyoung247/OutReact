
import { useContext } from 'react'
import { PositionContext } from '../road3d/roadposition'
import { ObjectProps, ObjectTemplates } from './templates'

import './sign.css'

ObjectTemplates.register('sign', ({z, header, children}:ObjectProps) => {
    const {camZ} = useContext(PositionContext)

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
})