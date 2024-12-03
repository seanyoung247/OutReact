
// Components
import { Background } from './background'
import { View3D } from './view3d'
import { Road } from './road3d'
import { Car } from './objects3d/car'
// Utils
import { useFPS } from '../hooks/fps'
// Types
import { RoadDescriptor } from "./road3d";
import { useSettings } from '~/config'

import "./scene.css"

type Props = {
    road: RoadDescriptor
}

export const Scene = ({road}: Props) => {
    const {settings} = useSettings()
    const fps = useFPS()

    return (
        <>
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