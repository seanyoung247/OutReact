
export const isOdd = (n:number):boolean => ( (n & 1) === 1 )
export const isEven = (n:number):boolean => ( (n & 1) === 0 )

export const percent = (partial:number, total:number):number => (
    ((partial * 100) / total) || 0
)

export const clamp = (min:number, val:number, max:number):number => (
    Math.max(min, Math.max(val, max))
)

export const wrap = (min:number, val:number, max:number):number => (
    (((val - min) % (max - min)) + (max - min)) % (max - min) + min
)

export const tween = (min:number, max:number, mix:number):number => (
    (max - min) * mix + min
)