
import { registerComponent, createRegistry } from '../../../utilities/registry'

import { Sign, SignProps } from './sign'


export const objectRegistry = {
    sign: registerComponent<SignProps>(Sign)
}

export const RoadObjects = createRegistry(objectRegistry)