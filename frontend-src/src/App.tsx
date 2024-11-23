
// Components
import { RoadPosition } from './components/road3d/roadposition'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'
import { Car } from './components/objects3d/car'
// Settings
import { config } from './config'
import { roadSegments } from './testRoad'
// Utils
import { formatRoad } from './components/road3d/utils'
import { useFPS } from './hooks/fps'
// Styles
import './App.css'

const road = formatRoad(roadSegments)

const App = () => {
    const fps = useFPS()

    return (
        <RoadPosition road={road} length={config.scrollHeight}>
            {config.showFPS && <div className="framerate">{ fps }</div>}
            <Background horizon={config.view.horizon}>
                <View3D {...config.view}>
                    <Car/>
                    <Road road={road} settings={{...config.road}}/>
                </View3D>
            </Background>
        </RoadPosition>
    )
}
export default App
