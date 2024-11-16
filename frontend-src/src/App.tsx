
import { RoadPosition } from './components/road3d/roadposition'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'
import { RoadObjects, ObjectStops } from './components/objects3d/objects'

import { roadSegments } from './testRoad'
import { formatRoad } from './components/road3d/utils'
import { useFPS } from './hooks/fps'

import { Car } from './components/objects3d/car'

import './App.css'


const road = formatRoad(roadSegments)

const App = () => (
    <RoadPosition road={road} length='20000px'>
        <div className="framerate">{ useFPS() }</div>
        <ObjectStops />
        <Background horizon={35}>
            <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                <Car/>
                <RoadObjects />
                <Road road={road} length={20}/>
            </View3D>
        </Background>
    </RoadPosition>
)
export default App
