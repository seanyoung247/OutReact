
import { registerComponent, createRegistry, RegistryTypes } from '~/utilities/registry'

// Road Objects to be registered:
import { RoadSign } from './roadobjects/roadsign'
// Containers to be registered:
import { Modal } from './containers/modal'
// Content Components to be registered:
import { SkillList } from './content/skilllist'
import { RoadBadge } from './content/roadbadge'
import { SkillBadges } from './content/skillbadges'

// Road positioned components
const objectRegistry = {
    "road-sign": registerComponent(RoadSign),
}
// Content Container components:
const containerRegistry = {
    "modal": registerComponent(Modal),
}
// Content components:
const contentRegistry = {
    "skill-list": registerComponent(SkillList),
    "road-badge": registerComponent(RoadBadge),
    "skill-badges": registerComponent(SkillBadges),
}
// Object Registry types:
// Content Types
export type ContentList = Array<string | ContentDesc>
export type ContentDesc = RegistryTypes<typeof contentRegistry, ContentList>
export type ContainerDesc = RegistryTypes<typeof containerRegistry, ContentList>
// Road object Types
export type RoadObjectDesc = RegistryTypes<typeof objectRegistry, ContentList>
// Compound types
export type ObjectDesc = RoadObjectDesc | ContainerDesc | ContentDesc

// Get registry accessor
export const objectsRegistry = createRegistry({
    ...objectRegistry,
    ...containerRegistry,
    ...contentRegistry
})
