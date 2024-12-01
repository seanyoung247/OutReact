
import { useEffect } from "react"

const SVGLibrary = (() => {

    const svgNamespace = 'http://www.w3.org/2000/svg'
    const rootSVG = document.createElementNS(svgNamespace, 'svg')
    const defs = document.createElementNS(svgNamespace, 'defs')

    rootSVG.appendChild(defs)
    document.body.prepend(rootSVG)

    const definitions = new Map<string, Element>();

    const insertSVGDef = (id:string, content: string) => {
        const group = document.createElementNS(svgNamespace, 'g')
        group.innerHTML = content
        defs.appendChild(group)
        definitions.set(id, group)
    }

    return {
        addDef: (id:string, content: string) => {
            if (!definitions.has(id)) {
                insertSVGDef(id, content)
            }
        },
        updateDef: (id: string, content: string) => {
            if (definitions.has(id)) {
                const existing = definitions.get(id)!
                existing.innerHTML = content
            } else {
                insertSVGDef(id, content)
            }
        }
    }
})()

export const useSVGDef = (id:string, content:string) => {
    useEffect(() => {
        SVGLibrary.addDef(id, content)
    }, [id,content])
}

export const useUpdateSVGDef = (id:string, content:string) => {
    useEffect(() => {
        SVGLibrary.updateDef(id, content)
    }, [id,content])
}