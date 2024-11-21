
import React from "react"
import { ObjectTypeMap } from "./registry"

export type ObjectProps = {
    z: number,
    y?: number,
    x: number,
    children?: React.ReactNode
}
export type ObjectComponent<T extends ObjectProps = ObjectProps> = React.FC<T>;


export const ObjectTemplates = (()=>{
    const templates = new Map<string, ObjectComponent<ObjectTypeMap[keyof ObjectTypeMap]>>()

    return {
        register<K extends keyof ObjectTypeMap>(
            name: K, component: ObjectComponent<ObjectTypeMap[K]>
        ) {
            templates.set(name, component)
        },

        get(name: string): ObjectComponent<ObjectTypeMap[keyof ObjectTypeMap]> {
            const component = templates.get(name)
            if (!component) throw Error(`Requested component (${name}) not registered!`)
            return component
        }
    }
})()
