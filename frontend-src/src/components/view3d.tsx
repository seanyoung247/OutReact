
import { Config } from '../config'
import { useSettings } from '../utilities/settings'
import './view3d.css'

type Props = {
    children: React.ReactNode,
}

export const View3D = (props: Props) => {
    const {settings:{view}} = useSettings<Config>()
    return (
        <div className="view3d"
            style={{
                '--w': view.width,
                '--h': view.height,
                '--horizon': view.horizon,
                '--perspective': view.perspective
            }}>
            { props.children }
        </div>
    )
}