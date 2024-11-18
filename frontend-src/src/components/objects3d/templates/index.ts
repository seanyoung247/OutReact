
import { ObjectTemplates } from './templates'

// Import template components here:
import { Sign } from './sign'

// Register templates
ObjectTemplates.register('sign', Sign)


// Export types
export { ObjectTemplates }
export type { ObjectProps } from './templates'
