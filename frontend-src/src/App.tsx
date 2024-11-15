
import { ScrollManager } from './components/scrollmanager'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'

import { roadSegments } from './testRoad'
import { formatRoad } from './components/road3d/utils'
import { useFPS } from './hooks/fps'

import { Sign } from './components/sign'
import { Car } from './components/car'

import './App.css'

const road = formatRoad(roadSegments)

const App = () => {
    const fps = useFPS()

    return (
        <ScrollManager road={road}>
            <div className="framerate">{fps}</div>
            <Background horizon={35}>
                <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                    <Car/>
                    <Sign z={5} header="Language Skills">
                        <ul className='skills-list'>
                            <li><span>JavaScript</span> <span>100 m</span></li>
                            <li><span>HTML/CSS</span> <span>100 m</span></li>
                            <li><span>TypeScript</span> <span>75 m</span></li>
                            <li><span>Python</span> <span>75 m</span></li>
                        </ul>
                    </Sign>
                    <Road road={road} length={20}/>
                </View3D>
            </Background>
        </ScrollManager>
    )
}
export default App
