
import { useEffect, useRef, useState } from 'react'
import { useAnimationFrame } from './frame'

//
// Types
//
export type Point = {
    x: number, y: number
}

export type ScrollData = {
    scrolling: boolean | number | string | unknown,
    start: Point,
    current: Point,
    previous: Point,
    progress: Point,
    delta: Point,
}

export type ScrollCallback = (s:ScrollData) => void

//
// Internal utilities
//
const defaultScrollData = (): ScrollData => ({
    scrolling: false, 
    start: {x:0, y:0},
    current: {x:0, y:0},
    previous: {x:0, y:0},
    progress: {x:0, y:0},
    delta: {x:0, y:0}
})

const scrollStateChanged = (last:ScrollData, delta:Point):boolean => (
    !last.scrolling ||
        Math.sign(last.delta.x) !== Math.sign(delta.x) ||
        Math.sign(last.delta.y) !== Math.sign(delta.y)
)

const getScrollData = (last: ScrollData): ScrollData => {
    const current = { x: window.scrollX, y: window.scrollY }
    const previous = last.current
    const progress = {
        x: (current.x / (document.body.scrollWidth - window.innerWidth)) * 100,
        y: (current.y / (document.body.scrollHeight - window.innerHeight)) * 100
    }
    const delta = {
        x: current.x - previous.x,
        y: current.y - previous.y
    }
    const start = (scrollStateChanged(last, delta)) ?
        {...current} : last.start

    return {
        scrolling: (delta.x + delta.y !== 0),
        start, current, previous, progress, delta
    }
}

const options = ({ passive: true } as unknown) as EventListenerOptions

//
// Hooks
//
/*
 * Hook that updates component with current scroll data
 */
export const useScrollState = () => {
    const [scroll, setScroll] = useState<ScrollData>(defaultScrollData())
    useScrollAnimation(setScroll)
    return scroll
}

/**
 * Hook that calls a callback function when the window scroll state changes
 * @param effect - Callback
 */
export const useScrollPosition = (effect: ScrollCallback) => {
    const scrollData = useRef<ScrollData>(defaultScrollData())

    useEffect(() => {
        const handleScroll = () => {
            const scroll = getScrollData(scrollData.current)
            clearTimeout(scrollData.current.scrolling as number)
            scroll.scrolling = setTimeout(() => {
                scrollData.current.scrolling = false
            }, 100)
            scrollData.current = scroll
            effect(scrollData.current)
        }
        window.addEventListener('scroll', handleScroll, options)
        return () => window.removeEventListener('scroll', handleScroll, options)
    }, [effect])
}

/**
 * Hook that calls a callback function when if scroll data has changed since 
 * the last animation frame
 * 
 * @param effect - Callback
 */
export const useScrollAnimation = (effect: ScrollCallback) => {
    const scrollData = useRef<ScrollData>(defaultScrollData())

    useAnimationFrame(() => {
        const scroll = getScrollData(scrollData.current)
        scrollData.current = scroll
        if (scrollData.current.scrolling) effect(scroll);
    })
}
