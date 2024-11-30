
import React from "react"

type Templates = Record<string, {component: unknown, props: unknown}>

// Maps allowable prop types to component names
type TypeMap<T extends Templates> = {
    [K in keyof T]: T[K]['props']
}

// Generates a type that enforces prop and component types for named components
export type RegistryTypes<T extends Templates, C = never> = {

    [K in keyof T]: {
        type: K;
        props: T[K]['props'];

    } & (
        T[K]['props'] extends { children: React.ReactNode }     // Requires children
            ? { content: C }                                    //   content is required
        : T[K]['props'] extends { children?: React.ReactNode }  // Optionally supports children
            ? { content?: C }                                   //   content is optional
        : { content?: never}                                    // Does not support children/content
    )

}[keyof T]

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
