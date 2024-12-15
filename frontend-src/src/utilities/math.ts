
/**
 * Tests whether a number is odd
 * @param {number} n - Number to test 
 * @returns {boolean} - True if odd, false if even
 */
export const isOdd = (n:number):boolean => ( (n & 1) === 1 )
/**
 * Tests whether a number is even
 * @param {number} n - Number to test 
 * @returns {boolean} - True if even, false if odd
 */
export const isEven = (n:number):boolean => ( (n & 1) === 0 )

/**
 * Returns the percentage of total represented by partial
 * @param {number} partial - Percantage value
 * @param {number} total - Value that represents 100%
 * @returns {number} - Percentage value
 */
export const percent = (partial:number, total:number):number => (
    ((partial * 100) / total) || 0
)

/**
 * Returns a number clamped to the given min-max range.
 * @param {number} min - Minimum value
 * @param {number} val - Value to be clamped
 * @param {number} max - Maximum value
 * @returns {number} - A value between min and max
 */
export const clamp = (min:number, val:number, max:number):number => (
    Math.max(min, Math.max(val, max))
)
/**
 * Returns a number wrapped to the given range.
 * @param {number} min - Minimum value
 * @param {number} val - Value to be wrapped
 * @param {number} max - Maximum value
 * @returns {number} - A value between min and max
 */
export const wrap = (min:number, val:number, max:number):number => (
    (((val - min) % (max - min)) + (max - min)) % (max - min) + min
)
/**
 * Returns a value between min and max based on mix.
 * Ex. if mix = 0.5, min = 1 and max = 3, 2 will be returned.
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} mix - Mix value
 * @returns  {number} - A value based on the mix
 */
export const tween = (min:number, max:number, mix:number):number => (
    (max - min) * mix + min
)