
export const CSSFeatures = {
    timeline: CSS.supports('animation-timeline: scroll()')
}

type cssDec = string | boolean | undefined | null
export const classList = (...classes:cssDec[]) => (
    classes.filter(v => v).join(' ')
);