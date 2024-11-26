
import { useRoadPosition } from '../../road3d'
import { ObjectProps } from '../types'
import { cl } from '../../../utilities/css'

import Styles from './roadsign.module.css'
import './object3d.css'


export interface SignProps extends ObjectProps {
    header?: string
}

export const RoadSign = ({x, y, z, header, children}: SignProps) => {
    const {camZ} = useRoadPosition()

    return (
        <section className={cl(
                Styles['road-sign'],
                'object3d'
            )}
            style={{
                '--x': x ?? 0,
                '--y': y ?? 0,
                '--z': z,
                '--camZ': camZ,
            }}
        >
            {header && 
                <h3 className={cl(
                    Styles['sign-header'], 
                    Styles['sign-back']
                )}>
                    { header }
                </h3>
            }
            <p className={cl(
                Styles['sign-content'], 
                Styles['sign-back'], 
                header && Styles['header']
            )}>
                { children }
            </p>
            
        </section>
    )
}
