
export const CSSFeatures = {
    timeline: CSS.supports('animation-timeline: scroll()')
}

type cssDec = string | boolean | undefined | null
/**
 * Takes a list of CSS declarations and concatenates them into a single string
 * for use by the className tag.
 * 
 * @returns string class list
 */
export const cl = (...classes:cssDec[]) => (
    classes.filter(v => v).join(' ')
)

/**
 * Template tag for filtering CSS Declarations into a single string for use
 * by the className tag.
 * 
 * @returns string class list
 */
export const clt = (strings:TemplateStringsArray, ...values:cssDec[]) => (
    strings.reduce((a,c,i) => a + c + (values[i] || ''), '')
)
