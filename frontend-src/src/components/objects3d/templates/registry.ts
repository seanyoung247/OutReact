
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'

// Road Objects to be registered:
import { RoadSign } from './roadobjects/roadsign'
// Content Panes to be registered:

// Content Components to be registered:
import { SkillList } from './content/skilllist'
import { RoadBadge } from './content/roadbadge'
import { SkillBadges } from './content/skillbadges'

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
// Content Types
export type ContentList = Array<string | ContentObjectDesc>
export type ContentObjectDesc = RegistryTypes<typeof contentRegistry, ContentList>
// Road object Types
export type RoadObjectDesc = RegistryTypes<typeof objectRegistry, ContentList>
// Compound types
export type ObjectDesc = RoadObjectDesc | ContentObjectDesc

// Get registry accessor
export const objectsRegistry = createRegistry({
    ...objectRegistry,
    ...contentRegistry
})