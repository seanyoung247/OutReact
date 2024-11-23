
// Components
import { RoadPosition } from './components/road3d/roadposition'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d'
import { Car } from './components/objects3d/car'
// Settings
import { config } from './config'
import { testRoad } from './testRoad'
// Utils
import { useFPS } from './hooks/fps'
// Styles
import './App.css'

const App = () => {
    const fps = useFPS()

    return (
        <RoadPosition road={testRoad} length={config.scrollHeight}>
            {config.showFPS && <div className="framerate">{ fps }</div>}
            <Background horizon={config.view.horizon}>
                <View3D {...config.view}>
                    <Car/>
                    <Road road={testRoad} settings={{...config.road}}/>
                </View3D>
            </Background>
        </RoadPosition>
    )
}
export default App
