
import Img from '../assets/testbackground.png'
import './background.css'

type Props = {
    horizon: number,
    xPos: number,
    children?: React.ReactNode
}

export const Background = ({horizon, xPos, children}:Props) => (
    <div
        className="background"
        style={{
            '--h': horizon,
            '--x': `${xPos/100}%`,
            '--img': `url(${Img})`,
        }}
    >
        { children }
    </div>
)