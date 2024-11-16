
import { useContext } from 'react'
import { PositionContext } from './road3d/roadposition'

import Img from '../assets/testbackground.png'
import './background.css'

type Props = {
    horizon: number,
    children?: React.ReactNode
}

export const Background = ({horizon, children}:Props) => {
    const camX = -(useContext(PositionContext).camX)

    return (
        <div
            className="background"
            style={{
                '--h': horizon,
                '--x': `${camX}px`,
                '--img': `url(${Img})`,
            }}
        >
            { children }
        </div>
    )
}