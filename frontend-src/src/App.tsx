
import { ScrollManager } from './components/scrollmanager'
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'

import { useAnimationFrame } from './hooks/frame'
import { useRef, useState } from 'react'
import { roadSegments } from './testRoad'
import { formatRoad } from './components/road3d/utils'
import './App.css'
import { Sign } from './components/sign'
import { Car } from './components/car'

const road = formatRoad(roadSegments)

const App = () => {
    const lastTime = useRef(performance.now())
    const count = useRef(0)
    const [FPS, setFPS] = useState(0)


    useAnimationFrame(()=>{
        const frameTime = performance.now()
        const delta = frameTime - lastTime.current
        if (delta >= 1000) {
            setFPS(count.current)
            count.current = 0
            lastTime.current = frameTime
        }
        count.current++
    })

    return (
        <ScrollManager road={road}>
            <div className="framerate">{FPS}</div>
            <Background horizon={35}>
                <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                    <Car/>
                    <Sign z={5} header="Skills">
                        <ul className='skills-list'>
                            <li>JavaScript</li>
                            <li>TypeScript</li>
                            <li>Python</li>
                            <li>HTML/CSS</li>
                        </ul>
                    </Sign>
                    <Road road={road} length={20}/>
                </View3D>
            </Background>
        </ScrollManager>
    )
}
export default App
