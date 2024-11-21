
import { ObjectTemplates } from './templates'

// Import template components here:
import { Sign, SignProps } from './sign'

// Register template types
export type ObjectTypeMap = {
    sign: SignProps
}

// Register templates
ObjectTemplates.register('sign', Sign)
