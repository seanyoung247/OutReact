
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'

import { useScrollState } from './hooks/scroll'
import { useRef } from 'react'

import { roadSegments } from './testRoad'
import { wrap } from './utilities/misc'

import './App.css'
import { ScrollManager } from './components/scrollmanager'


function App() {
    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * roadSegments.length

    const baseSeg = Math.max(Math.floor(camZ), 0)
    const xPos = useRef({camX:0, baseSeg})

    if (xPos.current.baseSeg !== baseSeg) {
        xPos.current.camX += (
            roadSegments[wrap(0, baseSeg, roadSegments.length)].curve *
            Math.sign(scroll.delta.y)
        )
    }

    return (
        <ScrollManager scrollHeight='10000px' length={roadSegments.length}>
            <Background horizon={35} xPos={xPos.current.camX}>
                <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                    <Road road={roadSegments} length={20} camZ={camZ}/>
                </View3D>
            </Background>
        </ScrollManager>
    )
}

export default App
