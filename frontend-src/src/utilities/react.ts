import React from "react"

type IterCallback = (i:number) => React.ReactElement

export const forJSX = (count:number, effect:IterCallback) => {
    const elements = []

    for (let i = 0; i < count; i++) {
        elements.push(
            effect(i)
        )
    }

    return elements
}
