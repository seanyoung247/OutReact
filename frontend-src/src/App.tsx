
// Components
import { RoadPosition } from './components/road3d/roadposition'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d'
import { Car } from './components/objects3d/car'
// Settings
import { Settings } from './utilities/settings'
import { config } from './config'
import { testRoad } from './testRoad'
// Utils
import { useFPS } from './hooks/fps'
// Styles
import './App.css'


const App = () => {
    const fps = useFPS()

    return (
        <Settings config={config}>
        <RoadPosition road={testRoad}>
            {config.showFPS && <div className="framerate">{ fps }</div>}
            <Background horizon={config.view.horizon}>
                <View3D>
                    <Car/>
                    <Road road={testRoad} />
                </View3D>
            </Background>
        </RoadPosition>
        </Settings>
    )
}
export default App
