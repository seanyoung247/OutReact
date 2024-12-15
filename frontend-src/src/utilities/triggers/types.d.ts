
export type TriggerDesc = {
    type: string;
    target: string;
}

export type TriggerRegistry = Record<string, TriggerDesc>

export type TriggerFunction = ()=>void
export type TriggerManager = (id:string)=>TriggerFunction