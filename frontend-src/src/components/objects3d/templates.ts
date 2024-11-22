
import { ObjectTypeMap, ObjectComponent} from "./types"
import { objectRegistry } from "./templates/registry"


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

// Iterate over entries in the object registry and register them
Object.keys(objectRegistry).forEach((key) => {
    const name = key as keyof typeof objectRegistry
    ObjectTemplates.register(name, objectRegistry[name].component)
})