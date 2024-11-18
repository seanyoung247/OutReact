
// Components
import { RoadPosition } from './components/road3d/roadposition'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'
import { RoadObjects } from './components/objects3d/objects'
import { Car } from './components/objects3d/car'
// Settings
import { config } from './components/config'
import { roadSegments } from './testRoad'
// Utils
import { formatRoad } from './components/road3d/utils'
import { useFPS } from './hooks/fps'
// Styles
import './App.css'


const road = formatRoad(roadSegments)

const App = () => (
    <RoadPosition road={road} length='20000px'>
        <div className="framerate">{ useFPS() }</div>
        <Background horizon={config.view.horizon}>
            <View3D {...config.view}>
                <Car/>
                <RoadObjects />
                <Road road={road} {...config.road}/>
            </View3D>
        </Background>
    </RoadPosition>
)
export default App
