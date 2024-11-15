
import { useContext } from 'react'
import { ScrollContext } from './scrollmanager'
import './sign.css'


type Props = {
    header: string, // Value for sign header
    z: number,      // Z position of the billboard
    children?: React.ReactNode
}

export const Sign = ({z, header, children}:Props) => {
    const {camZ} = useContext(ScrollContext)

    return (
        <div className='road-sign'
            style={{
                '--z': z,
                '--camZ': camZ,
            }}
        >
            <div className='sign-content'>
                <span className="sign-header">{ header }</span>
                { children }
            </div>
            
        </div>
    )
}