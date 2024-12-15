
import { /*AnimationKeyframe,*/
     AnimationDesc, AnimationFunction, AnimationManager, AnimationRegistry
} from "./types";


export const animations = (() => {

    const managers = new Map<string, AnimationManager>()
    const animations = new Map<string, AnimationDesc>()

    return {

        registerManager(id: string, manager: AnimationManager) {
            managers.set(id, manager)
        },

        registerTrigger(id: string, trigger: AnimationDesc) {
            animations.set(id, trigger)
        },

        registerTriggers(registry: AnimationRegistry) {
            for (const [key, value] of Object.entries(registry)) {
                this.registerTrigger(key, value)
            }
        },

        ////
        
        get(id: string): AnimationFunction {
            const animation = animations.get(id)
            if (!animation) {
                throw new Error(`Trigger ${id} not found!`)
            }
            const manager = managers.get(animation.type)
            if (!manager) {
                throw new Error(`Trigger Manager ${animation.type} not registered!`)
            }
            return manager(animation.target)
        },

    }

})()
