
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
        assertInitialised()
        if (!visible.has(id)) {
            visible.set(id, get(id))
            notify()
        }
    }

    const hide = (id: string) => {
        assertInitialised()
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

///// UTILITIES
export const handlers = {
    'show': (id:string) => () => containers.show(id),
    'hide': (id:string) => () => containers.hide(id),
    'toggle': (id:string) => () => containers.toggle(id)
} as const
type Action = keyof typeof handlers

/**
 * Returns a function that performs a designated action on a component
 * @param {Action} action - action id
 * @param {string} id - Component string id
 * @returns Function that performs the given action on component with id
 */
export const getContainerHandler = (action: Action, id: string) => {
    const handler = handlers[action]
    if (!handler) throw new Error(`Unknown action: ${action}`);
    return handler(id)
}
