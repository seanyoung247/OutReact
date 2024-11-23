
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'

import { Sign, SignProps } from './sign'

const objectRegistry = {
    sign: registerComponent<SignProps>(Sign)
}


export type ObjectProps = {
    z: number,
    y?: number,
    x?: number,
    children?: React.ReactNode
}

export const objectsRegistry = createRegistry(objectRegistry)

export type ObjectsType = RegistryTypes<typeof objectRegistry>
