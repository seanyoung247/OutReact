
import { TargetDesc, TargetFunction, TargetManager, TargetRegistry } from "./types"

export const ManagerRegistry = <TData = void>() => {
    
    const managers = new Map<string, TargetManager>()
    const targets = new Map<string, TargetDesc<TData>>()

    return {
        registerManager(id: string, manager: TargetManager) {
            managers.set(id, manager)
        },

        registerTarget(id: string, target: TargetDesc<TData>) {
            targets.set(id, target)
        },

        registerTargets(registry: TargetRegistry<TData>) {
            for (const [key, value] of Object.entries(registry)) {
                this.registerTarget(key, value)
            }
        },

        ////

        get(id: string): TargetFunction {
            const target = targets.get(id)
            if (!target) {
                throw new Error(`Target definition ${id} not found`)
            }
            const manager = managers.get(target.type)
            if (!manager) {
                throw new Error(`Target Manager ${target.type} not registered!`)
            }
            return manager(target.target)
        }
    }

}