
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'
// Objects to be registered:
import { Sign, SignProps } from './sign'

// Object registration:
const objectRegistry = {
    sign: registerComponent<SignProps>(Sign)
}
export const objectsRegistry = createRegistry(objectRegistry)

// Object Registry types: 
export type RoadObjectsDescriptor = RegistryTypes<typeof objectRegistry>
export type ObjectProps = {
    z: number,
    y?: number,
    x?: number,
    children?: React.ReactNode
}
