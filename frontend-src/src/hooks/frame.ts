
import { useRef, useEffect } from "react"

export type FrameCallback = (time: number) => void

/**
 * Hook that calls effect function on animation frame
 * @param effect 
 */
export const useAnimationFrame = (effect: FrameCallback) => {
    const frameRef = useRef(0)
    const previousTime = useRef(performance.now())

    const frameUpdate = (time: number) => {
        const frameTime = time - previousTime.current
        effect(frameTime)
        previousTime.current = time
        frameRef.current = requestAnimationFrame(frameUpdate)
    }

    useEffect(() => {
        frameRef.current = requestAnimationFrame(frameUpdate)
        return () => cancelAnimationFrame(frameRef.current)
    })
}
