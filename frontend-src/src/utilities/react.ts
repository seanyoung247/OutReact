import React from "react"

type IterCallback = (i:number) => React.ReactElement

/**
 * Calls effect count times and returns the resulting array of returns.
 * Designed to allow a 'for-loop' style structure within JSX code.
 * 
 * @param count - Number of iterations
 * @param effect - Function to call on each iteration
 * @returns - An array of JSX elements
 */
export const repeat = (count:number, effect:IterCallback) => {
    const elements = []

    for (let i = 0; i < count; i++) {
        elements.push(
            effect(i)
        )
    }

    return elements
}
