
import { useRoadPosition } from '../../road3d'
import { ObjectProps } from '../types'
import { Sprite } from './sprite'
import { cl } from '../../../utilities/css'

import Styles from './roadsign.module.css'

export interface SignProps extends ObjectProps {
    header?: string
}

export const RoadSign = (props: SignProps) => {
    const {camZ} = useRoadPosition()

    return (
        <Sprite {...props}>
            <section className={Styles['road-sign']}
                style={{ '--camZ': camZ }}
            >
                {props.header && 
                    <h3 className={cl(
                        Styles['sign-header'], 
                        Styles['sign-back']
                    )}>
                        { props.header }
                    </h3>
                }
                <p className={cl(
                    Styles['sign-content'], 
                    Styles['sign-back'], 
                    props.header && Styles['header']
                )}>
                    { props.children }
                </p>
                
            </section>
        </Sprite>
    )
}
