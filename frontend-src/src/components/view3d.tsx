
import './view3d.css'

type Props = {
    width: string,
    height: string,
    horizon: number,
    perspective: number,
    children: React.ReactNode,
}

export const View3D = (props: Props) => (
    <div className="view3d"
        style={{
            '--w': props.width,
            '--h': props.height,
            '--horizon': props.horizon,
            '--perspective': props.perspective
        }}>
        { props.children }
    </div>
)