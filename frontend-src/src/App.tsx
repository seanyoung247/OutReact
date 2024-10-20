
import { Background } from './components/background'
import { View3D } from './components/view3d'
import { Road } from './components/road3d/road'

import { useScrollState } from './hooks/scroll'
// import { useState } from 'react'
// import { useAnimationFrame } from './hooks/frame'

import { roadSegments } from './testRoad'

import './App.css'


function App() {
    const scroll = useScrollState()
    const camZ = (scroll.progress.y / 100) * roadSegments.length
    // const [camZ, setCamZ] = useState(0)

    // useAnimationFrame((time) => {
    //     setCamZ(camZ + (0.008 * time))
    // })

    return (
        <>
            <div className='scroller' 
                style={{
                    '--scroll-height': '5000px'
                }}
            />

            <Background horizon={35}>
                <View3D width='100%' height='100lvh' perspective={4} horizon={35}>
                    <Road road={roadSegments} camZ={camZ}/>
                </View3D>
            </Background>
        </>
    )
}

export default App
