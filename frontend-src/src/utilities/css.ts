
export const CSSFeatures = {
    timeline: CSS.supports('animation-timeline: scroll()')
}

type cssDec = string | boolean | undefined | null
export const cl = (...classes:cssDec[]) => (
    classes.filter(v => v).join(' ')
);

export const clt = (strings:TemplateStringsArray, ...values:cssDec[]) => (
    strings.reduce((a,c,i) => a + c + (values[i] || ''), '')
)