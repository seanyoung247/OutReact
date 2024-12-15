
import React from "react"
import { Templates, TypeMap } from "./types"


/*
 * Helper function for generating entries for a template registry
 */
export const registerComponent = <T>(component: React.FC<T>) => ({
    component, props: {} as T
})

/**
 * Takes a template object and builds a component registry that can be accessed
 * by component name.
 * @param templates An object that maps react components to meta data
 * @returns Accessor function that returns registered components based on name
 */
export const createRegistry = <T extends Templates>(templates: T) => {
    type Component = React.FC<TypeMap<T>[keyof TypeMap<T>]>
    const registry = new Map<string, Component>()

    const register = <K extends keyof TypeMap<T>>(
        name: string, component: React.FC<TypeMap<T>[K]>
    ) => {
        registry.set(name, component)
    }

    // Insert all the passed templates into the map
    Object.keys(templates).forEach(key => {
        register(key, templates[key].component as Component)
    })

    return (name: string): Component => {

        const component = registry.get(name)
        if (!component) throw new Error(`Requested component (${name}) not registered!`)

        return component
    }
}
