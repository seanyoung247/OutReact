
import './background.css'

type Props = {
    horizon: number,
    children?: React.ReactNode
}

export const Background = ({horizon, children}:Props) => (
    <div
        className="background"
        style={{'--h': horizon}}
    >
        { children ?? children }
    </div>
)