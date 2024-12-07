
import { useEffect } from "react"


const SVGElementID = "SVGLibrary-def-store"
const SVGLibrary = (() => {

    const svgNamespace = 'http://www.w3.org/2000/svg'
    const rootSVG = document.createElementNS(svgNamespace, 'svg')
    const defs = document.createElementNS(svgNamespace, 'defs')

    const oldEl = document.getElementById(SVGElementID)
    if (oldEl) document.removeChild(oldEl)

    rootSVG.appendChild(defs)
    rootSVG.id = SVGElementID
    rootSVG.ariaHidden = "true"
    rootSVG.style.cssText = `
        position: absolute;
        height: 0;
        width: 0;
    `
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

/**
 * Inserts a new definition into the SVG library
 * @param id - String name for the def
 * @param content - String of SVG tags
 */
export const useSVGDef = (id:string, content:string) => {
    useEffect(() => {
        SVGLibrary.addDef(id, content)
    }, [id,content])
}

/**
 * Inserts or updates an existing definition in the SVG library
 * @param id - String name for the def 
 * @param content - String of SVG tags
 */
export const useUpdateSVGDef = (id:string, content:string) => {
    useEffect(() => {
        SVGLibrary.updateDef(id, content)
    }, [id,content])
}