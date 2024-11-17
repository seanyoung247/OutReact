
import React from "react"

export type ObjectProps = {
    header?: string,
    z: number,
    x: number,
    y?: number,
    children?: React.ReactNode
}

export type ObjectComponent = React.FC<ObjectProps>

export const ObjectTemplates = (()=>{
    const templates = new Map<string, ObjectComponent>()
    return {
        register(name: string, component: ObjectComponent) {
            templates.set(name, component)
        },
        get(name: string): ObjectComponent {
            const component = templates.get(name)
            if (!component) throw Error(`Requested component (${name}) not registered!`)
            return component
        }
    }
})()
