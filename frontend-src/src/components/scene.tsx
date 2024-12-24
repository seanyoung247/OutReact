
import { useEffect } from 'react'
// Components
import { Background } from './background'
import { View3D } from './view3d'
import { Road } from './road3d'
import { Car } from './objects3d/car'
import { getContainerHandler, Containers } from './objects3d'
// Utils
import { useFPS } from '~/hooks/fps'
import { useSettings } from '~/config'
import { triggers } from '~/utilities/triggers'
// Types
import { RoadDescriptor } from "./road3d"

import "./scene.css"


type Props = {
    road: RoadDescriptor
}

export const Scene = ({road}: Props) => {
    const {settings} = useSettings()
    const fps = useFPS()

    useEffect(() => {
        if (road) {
            triggers.registerTargets(road.triggers)
        }
    }, [road])

    const toggleModal = getContainerHandler('toggle', 'test-modal')

    return (
        <>
            <button className="testbtn" onClick={ toggleModal }>TEST</button>
            <Containers containers={road.containers} />
            
            {settings.showFPS && <div className="framerate">{ fps }</div>}
            <Background horizon={settings.view.horizon}>
                <View3D>
                    <Car/>
                    <Road road={road} />
                </View3D>
            </Background>
        </>
    )
}