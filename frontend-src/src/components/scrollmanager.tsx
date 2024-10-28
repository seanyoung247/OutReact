
import { useScrollState } from '../hooks/scroll'

type Props = {
    scrollHeight: string,   // How long the scroll region should be
    length: number,         // Discrete animation length
    children?: React.ReactNode
}

export const ScrollManager = ({scrollHeight, length, children}:Props) => {

    const scroll = useScrollState()
    const position = (scroll.progress.y / 100) * length

    console.log(position)

    return (
        <>
            <div className="scroller"
                style={{
                    '--scroll-height': scrollHeight
                }}
            />

            { children }
        </>
    )
}