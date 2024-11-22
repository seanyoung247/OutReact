
import { objectRegistry } from "./templates/registry";

// Automatically generated from the objectRegistry
export type ObjectTypeMap = {
    [K in keyof typeof objectRegistry]: typeof objectRegistry[K]['props'];
}

// Automatically generated from the ObjectTypeMap
export type ObjectTypes = {
    type: keyof ObjectTypeMap
} & {
    [K in keyof ObjectTypeMap]: K extends keyof ObjectTypeMap ? { 
        type: K; props: ObjectTypeMap[K], content?: string
    } : never
}[keyof ObjectTypeMap]


export type ObjectProps = {
    z: number,
    y?: number,
    x?: number,
    children?: React.ReactNode
}

export type ObjectComponent<T extends ObjectProps = ObjectProps> = React.FC<T>;