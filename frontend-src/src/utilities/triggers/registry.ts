import { TriggerDesc, TriggerFunction, TriggerManager, TriggerRegistry } from "./types"


export const triggers = (()=>{
    const managers = new Map<string,TriggerManager>()
    const triggers = new Map<string,TriggerDesc>()


    return {

        registerManager(id: string, manager: TriggerManager) {
            managers.set(id, manager)
        },

        registerTrigger(id: string, trigger: TriggerDesc) {
            triggers.set(id, trigger)
        },

        registerTriggers(registry: TriggerRegistry) {
            for (const [key, value] of Object.entries(registry)) {
                this.registerTrigger(key, value)
            }
        },

        ////

        get(id: string): TriggerFunction {
            const trigger = triggers.get(id)
            if (!trigger) {
                throw new Error(`Trigger ${id} not found!`)
            }
            const manager = managers.get(trigger.type)
            if (!manager) {
                throw new Error(`Trigger Manager ${trigger.type} not registered!`)
            }
            return manager(trigger.target)
        },

    }
})() 
