
import { registerHandlers } from './triggers'

export type * from './types'

export { RoadObjects, Containers } from './objects'
export { getContainerHandler } from './containers'

registerHandlers()