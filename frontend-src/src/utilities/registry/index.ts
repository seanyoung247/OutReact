
import React from "react"


export type RegistryTypes<Templates> = {
    type: keyof Templates
} & {
    [K in keyof Templates]: K extends keyof Templates ? {
        type: K; props: Templates[K], content?: string
    } : never
}[keyof Templates]


export const registerComponent = <T>(component: React.FC<T>) => ({
    component, props: {} as T
})

type Templates = Record<string, {props: unknown, component: unknown}>
export const createRegistry = <T extends Templates>(templates: T) => {
    type TypeMap = {
        [K in keyof T]: T[K]['props']
    }
    type Component<T> = React.FC<T>
    const registry = new Map<string, Component<TypeMap[keyof TypeMap]>>()


    const register = <K extends keyof TypeMap>(
        name: string, component: Component<TypeMap[K]>
    ) => {
        registry.set(name, component)
    }


    // Insert all the passed templates into the map
    Object.keys(templates).forEach(key => {
        register(key, templates[key].component as Component<TypeMap[keyof TypeMap]>)
    })

    return (name: string): Component<TypeMap[keyof TypeMap]> => {

        const component = registry.get(name)
        if (!component) throw Error(`Requested component (${name}) not registered!`)

        return component
    }
}
