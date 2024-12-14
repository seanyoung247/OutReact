
import { useEffect, useState } from "react"
import { ContainerDesc } from "./templates/registry"


export type ContainerRegistry = Record<string, ContainerDesc>

type Observer = ()=>void
const containers = (()=>{
    const observers = new Set<Observer>()
    const myContainers = new Map<string, ContainerDesc>()
    const visible = new Map<string, ContainerDesc>()

    /*
     * Setup 
     */
    const setRegistry = (registry: ContainerRegistry) => {
        for (const [key,value] of Object.entries(registry)) {
            if (!myContainers.has(key)) {
                myContainers.set(key, value)
            }
        }
    }

    /*
     * Observer management
     */
    const observe = (observer: Observer) => {
        observers.add(observer)
        return () => {observers.delete(observer)}
    }

    const notify = () => {
        observers.forEach(listener => listener())
    }
    /*
     * Container Management
     */
    const isInitialised = () => myContainers.size > 0

    const assertInitialised = () => {
        if (!isInitialised()) {
            throw new Error (
                "Container registry has not been initialized."
            )
        }
    }

    const set = (key: string, container: ContainerDesc) => {
        myContainers.set(key, container)
    }

    const get = (key: string) => {
        assertInitialised()
        const container = myContainers.get(key)
        if (!container) {
            throw new Error(`Requested container ${key} doesn't exist!`)
        }
        return container
    }

    /*
     * Visible Containers
     */
    const getVisible = () => visible

    const show = (id: string) => {
        if (!visible.has(id)) {
            visible.set(id, get(id))
            notify()
        }
    }

    const hide = (id: string) => {
        if (visible.delete(id)) {
            notify()
        }
    }

    const toggle = (id: string) => {
        if (visible.has(id)) {
            hide(id)
        } else {
            show(id)
        }
    }

    return {
        setRegistry, observe,
        assertInitialised, set, get,
        getVisible, show, hide, toggle
    }
})()

///// HOOKS
/**
 * Takes a registry of container components mapped to ids and returns a
 * list of currently visible containers
 * @param {ContainerRegistry} registry Registry of containers
 * @returns Array of ContainerDesc of visible containers
 */
export const useContainers = (registry: ContainerRegistry) => {
    const [,forceRender] = useState(false)
    useEffect(() => {
        containers.setRegistry(registry)

        return containers.observe(()=>{forceRender(prev=>!prev)})
    // Registry is stable and only set once. Effect should only run on instantiation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return containers
}

/**
 * Provides a function to show a named component
 * @param {string} id Component string id
 * @returns trigger function
 */
export const useShowContainer = (id: string) => (
    () => containers.show(id)
)
/**
 * Provides a function to hide a named component
 * @param {string} id Component string id
 * @returns trigger function
 */
export const useHideContainer = (id: string) => (
    () => containers.hide(id)
)
/**
 * Provides a function to toggle a named component.
 * Shows component if hidden, hides it if visible.
 * @param {string} id Component string id
 * @returns trigger function
 */
export const useToggleContainer = (id: string) => (
    () => containers.toggle(id)
)
