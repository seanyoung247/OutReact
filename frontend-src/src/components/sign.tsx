
import { useContext } from 'react'
import { ScrollContext } from './scrollmanager'
import './sign.css'


type Props = {
    z: number,      //Z position of the billboard
}

export const Sign = ({z}:Props) => {
    const {camZ} = useContext(ScrollContext)

    return (
        <div className='road-sign'
            style={{
                '--z': z,
                '--camZ': camZ,
            }}
        >
            <div className='sign-content'>
                <span className="sign-header">Skills</span>
                <ul className='skills-list'>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>Python</li>
                    <li>HTML/CSS</li>
                </ul>
            </div>
            
        </div>
    )
}