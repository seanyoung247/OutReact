
/*
 * Animation Manager types
 */


/* 
 * Web API Animation types
 */
interface AnimationKeyFrame {
    [key: string]: (string | CSSNumberish)[]
}

type AnimationEffectTimingFillMode = "none" | "forwards" | "backwards" | "both" | "auto";
type AnimationEffectTimingPlaybackDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";

interface AnimationPlaybackEvent {
    target: Animation;
    readonly currentTime: CSSNumberish | null;
    readonly timelineTime: CSSNumberish | null;
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: Animation;
    defaultPrevented: boolean;
    eventPhase: number;
    timeStamp: number;
}

interface AnimationPlaybackEventInit extends EventInit {
    currentTime?: CSSNumberish | null;
    timelineTime?: CSSNumberish | null;
}

declare const AnimationPlaybackEvent: {
    prototype: AnimationPlaybackEvent;
    new(type: string, eventInitDict?: AnimationPlaybackEventInit): AnimationPlaybackEvent;
};

interface AnimationTimeline {
    readonly currentTime: CSSNumberish | null;
    getAnimations(): Animation[];
    play(effect: KeyframeEffect): Animation;
}
interface AnimationEffectTiming {
    delay?: number | undefined;
    direction?: AnimationEffectTimingPlaybackDirection | undefined;
    duration?: number | undefined;
    easing?: string | undefined;
    endDelay?: number | undefined;
    fill?: AnimationEffectTimingFillMode | undefined;
    iterationStart?: number | undefined;
    iterations?: number | undefined;
    playbackRate?: number | undefined;
}

interface AnimationEffectReadOnly {
    readonly timing: number;
    getComputedTiming(): ComputedTimingProperties;
}

interface ComputedTimingProperties {
    endTime: number;
    activeDuration: number;
    localTime: number | null;
    progress: number | null;
    currentIteration: number | null;
}

type AnimationEventListener = ((this: Animation, evt: AnimationPlaybackEvent) => void) | null;

interface Animation extends EventTarget {
    currentTime: CSSNumberish | null;
    id: string;
    oncancel: AnimationEventListener;
    onfinish: AnimationEventListener;
    readonly playState: AnimationPlayState;
    playbackRate: number;
    startTime: CSSNumberish | null;
    cancel(): void;
    finish(): void;
    pause(): void;
    play(): void;
    reverse(): void;
    addEventListener(type: "finish" | "cancel", handler: EventListener): void;
    removeEventListener(type: "finish" | "cancel", handler: EventListener): void;
    effect: AnimationEffect | null;
    readonly finished: Promise<Animation>;
    readonly ready: Promise<Animation>;
    timeline: AnimationTimeline | null;
}

declare const Animation: {
    prototype: Animation;
    new(effect?: AnimationEffect | null, timeline?: AnimationTimeline | null): Animation;
};

declare class SequenceEffect extends KeyframeEffect {
    constructor(effects: KeyframeEffect[]);
}
declare class GroupEffect extends KeyframeEffect {
    constructor(effects: KeyframeEffect[]);
}
interface Element {
    animate(effect: AnimationKeyFrame | AnimationKeyFrame[] | null, timing: number | AnimationEffectTiming): Animation;
    getAnimations(): Animation[];
}
interface Document {
    readonly timeline: AnimationTimeline;
}