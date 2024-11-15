
import { useAnimationFrame } from './frame'
import { useRef, useState } from 'react'

/*
 * Provides frame count over the last second
 */
export const useFPS = () => {
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

    return FPS
}

