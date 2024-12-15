import React from "react"


type RepeatCallback = (index: number) => React.ReactElement
/**
 * Calls effect count times and returns the resulting array of returns.
 * Designed to allow a 'for-loop' style structure within JSX code.
 * 
 * @param count - Number of iterations
 * @param effect - Function to call on each iteration
 * @returns - An array of JSX elements
 */
export const repeat = (count:number, effect:RepeatCallback) => {
    const elements = []

    for (let i = 0; i < count; i++) {
        elements.push(
            effect(i)
        )
    }

    return elements
}

type IterCallback<T> = (value: T, index?: number) => React.ReactElement
/**
 * Calls effect on each element of an iterable
 * 
 * @param iterable - Iterable type
 * @param effect - function to call on each element
 * @returns - An array of JSX elements
 */
export const iterate = <T>(
    iterable: Iterable<T>,
    effect: IterCallback<T>
): React.ReactElement[] => {
    const elements = []
    let index = 0

    for (const value of iterable) {
        elements.push(
            effect(value, index)
        )
        index++
    }

    return elements
}