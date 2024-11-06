
import { createContext } from 'react'
import { useScrollState } from '../hooks/scroll'


type Props = {
    children?: React.ReactNode
}

export type SegmentPosition = {
    '--z': number,
    '--bX': number,
    '--tX': number,
    '--bC': number,
}

export type ScrollStatus = {
    camZ: number,
    camX: number,
}
const defaultScrollStatus:ScrollStatus = {
    camZ:0, camX:0,
}
export const ScrollContext = createContext(defaultScrollStatus)

export const ScrollManager = ({children}:Props) => {

    const scroll = useScrollState()
    const position: ScrollStatus = {
        camZ: (scroll.progress.y / 100) * 120,
        camX: 0
    }

    return (
        <ScrollContext.Provider value={position}>
            <div style={{height:'10000px'}}/>
            { children }
        </ScrollContext.Provider>
    )
}