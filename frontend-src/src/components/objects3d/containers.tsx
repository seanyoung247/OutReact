import { useState } from "react"
import { ContainerDesc } from "./templates/registry"

export type ContainerRegistry = Record<string, ContainerDesc>

const containers = (()=>{
    const myContainers = new Map<string, ContainerDesc>()

    return {
        setRegistry(registry: ContainerRegistry) {
            if (myContainers.size === 0) {
                for (const [key,value] of Object.entries(registry)) {
                    myContainers.set(key, value)
                }
            }
        },
        add(key:string, container:ContainerDesc) {
            myContainers.set(key, container)
        },
        get(key:string) {
            if (!myContainers.has(key)) {
                throw new Error(`Requested container ${key} doesn't exist!`)
            }
            return myContainers.get(key)
        }
    }
})()

export const useContainers = (registry: ContainerRegistry) => {
    const [visibilityList, setVisibilityList] = useState<Set<string>>(new Set())
    containers.setRegistry(registry)
    return visibilityList
}


