
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'

import { roadSegments } from './testRoad'

import './App.css'
import { ScrollManager } from './components/scrollmanager'


const App = () => (
    <ScrollManager scrollHeight='10000px' road={roadSegments}>
        <Background horizon={35}>
            <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                <Road road={roadSegments} length={20}/>
            </View3D>
        </Background>
    </ScrollManager>
)

export default App
