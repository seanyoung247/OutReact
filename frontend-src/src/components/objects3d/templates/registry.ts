
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
} as const
// Content Container components:
const containerRegistry = {
    "modal": registerComponent(Modal),
} as const 
// Content components:
const contentRegistry = {
    "skill-list": registerComponent(SkillList),
    "road-badge": registerComponent(RoadBadge),
    "skill-badges": registerComponent(SkillBadges),
} as const
// Object Registry types:
// Content Types
type ContentRegistry = {
    [K in keyof typeof contentRegistry]: {
        component: (typeof contentRegistry)[K]['component'];
        props: (typeof contentRegistry)[K]['props'] & { 
            trigger?: string 
        };
    };
}
export type ContentList = Array<string | ContentDesc>
export type ContentDesc = RegistryTypes<ContentRegistry, ContentList>
// Container Types
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
