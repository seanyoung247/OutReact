
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'

// Objects to be registered:
import { RoadSign } from './roadsign'

// Content Components to be registered:
import { SkillList } from './skilllist'
import { RoadBadge } from './roadbadge'
import { SkillBadges } from './skillbadges'

// Road positioned components
const objectRegistry = {
    "road-sign": registerComponent(RoadSign),
}
// Content components:
const contentRegistry = {
    "skill-list": registerComponent(SkillList),
    "road-badge": registerComponent(RoadBadge),
    "skill-badges": registerComponent(SkillBadges),
}
// Object Registry types:
export type ContentList = Array<string | ContentObjectDesc>
export type ContentObjectDesc = RegistryTypes<typeof contentRegistry, ContentList>
export type RoadObjectsDesc = RegistryTypes<typeof objectRegistry, ContentList>
export type ObjectDesc = RoadObjectsDesc | ContentObjectDesc

// Get registry accessor
export const objectsRegistry = createRegistry({
    ...objectRegistry,
    ...contentRegistry
})