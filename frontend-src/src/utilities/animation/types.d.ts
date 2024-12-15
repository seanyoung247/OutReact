
export type AnimationKeyframe = Record<string, string | number>
export type AnimationDesc = {
    type: string;
    target: string;
    keyframes: AnimationKeyframe[];
    duration: number;
    easing?: string;
}
export type AnimationRegistry = Record<string, AnimationDesc>

export type AnimationFunction = ()=>void
export type AnimationManager = (id:string)=>AnimationFunction
