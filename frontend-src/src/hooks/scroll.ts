
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

type ScrollElement = HTMLElement | undefined | null

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

const scrollPosition = (el?: ScrollElement) => {
    return (el ? 
        {
            x: el.scrollLeft,
            y: el.scrollTop,
            width: el.scrollWidth - el.clientWidth,
            height: el.scrollHeight - el.clientHeight,
        } : 
        {
            x: window.scrollX,
            y: window.scrollY,
            width: document.body.scrollWidth - window.innerWidth,
            height: document.body.scrollHeight - window.innerHeight,
        }
    )
}

const getScrollData = (last: ScrollData, el?: ScrollElement): ScrollData => {
    const scroll = scrollPosition(el)
    const current = { x: scroll.x, y: scroll.y }
    const previous = last.current
    const progress = {
        x: (current.x / scroll.width) * 100,
        y: (current.y / scroll.height) * 100
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
/**
 * Hook that updates component with current scroll data. If element is not 
 * supplied, window scroll will be used.
 * @param {(HTMLElement)} [element] - Element to track scrolling.
 * @returns {ScrollData} Data for the current scroll state.
 */
export const useScrollState = (element?: ScrollElement) => {
    const [scroll, setScroll] = useState<ScrollData>(defaultScrollData())
    // useScrollAnimation(setScroll, element)
    useScrollPosition(setScroll, element)
    return scroll
}

/**
 * Hook that calls a callback function when the window scroll state changes
 * If element is not supplied, window scroll will be used.
 * @param {(ScrollData)=>void} effect - Callback
 * @param {(HTMLElement)} [element] - Element to track scrolling.
 */
export const useScrollPosition = (effect: ScrollCallback, element?: ScrollElement) => {
    const scrollData = useRef<ScrollData>(defaultScrollData())

    useEffect(() => {
        const handleScroll = () => {
            const scroll = getScrollData(scrollData.current, element)
            clearTimeout(scrollData.current.scrolling as number)
            scroll.scrolling = setTimeout(() => {
                scrollData.current.scrolling = false
            }, 100)
            scrollData.current = scroll
            effect(scrollData.current)
        }
        const el = element ? element : window
        el.addEventListener('scroll', handleScroll, options)
        return () => el.removeEventListener('scroll', handleScroll, options)
    }, [effect, element])
}

/**
 * Hook that calls a callback function when scroll data has changed since 
 * the last animation frame. If element is not supplied, window scroll will
 * be used.
 * @param {(ScrollData)=>void} effect - Callback
 * @param {(HTMLElement)} [element] - Element to track scrolling.
 */
export const useScrollAnimation = (effect: ScrollCallback, element?: ScrollElement) => {
    const scrollData = useRef<ScrollData>(defaultScrollData())

    useAnimationFrame(() => {
        const scroll = getScrollData(scrollData.current, element)
        scrollData.current = scroll
        if (scrollData.current.scrolling) effect(scroll);
    })
}
