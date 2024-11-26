
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'
// Objects to be registered:
import { RoadSign } from './roadsign'
// Content Components to be registered:
import { SkillList } from './skilllist'
import { RoadBadge } from './roadbadge'
import { SkillBadges } from './skillbadges'

// Object registration:
const objectRegistry = {
    // Road Objects:
    "road-sign": registerComponent(RoadSign),
    // Content Components:
    "skill-list": registerComponent(SkillList),
    "road-badge": registerComponent(RoadBadge),
    "skill-badges": registerComponent(SkillBadges),
}
export const objectsRegistry = createRegistry(objectRegistry)

// Object Registry types:
export type RoadObjectsDescriptor = RegistryTypes<typeof objectRegistry>
