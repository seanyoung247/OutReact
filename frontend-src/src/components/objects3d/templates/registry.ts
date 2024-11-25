
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'
// Objects to be registered:
import { Sign } from './sign'
// Content Components to be registered:
import { SkillList } from './skilllist'

// Object registration:
const objectRegistry = {
    // Road Objects:
    sign: registerComponent(Sign),
    // Content Components:
    "skill-list": registerComponent(SkillList),
}
export const objectsRegistry = createRegistry(objectRegistry)

// Object Registry types:
export type RoadObjectsDescriptor = RegistryTypes<typeof objectRegistry>
