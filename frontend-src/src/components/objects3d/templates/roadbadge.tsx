
import "./roadbadge.css"

type Props = {
    name: string;
    value: string;
}

export const RoadBadge = ({name, value}:Props) => (
    <svg version="1.0" viewBox="0 0 165 165">

        <use href="#shield" className="badge-base"/>
        <rect className="badge-red" clipPath="url(#shield-mask)" 
            x="0" y="0" width="165" height="20%"
        />
        <rect className="badge-blue" clipPath="url(#shield-mask)" 
            x="0" y="22%" width="165" height="130"
        />

        <text className="top text" x="50%" y="16%">
            <tspan>{name}</tspan>
        </text>
    
        <text className="number text" x="50%" y="70%">
            <tspan>{value}</tspan>
        </text>
    </svg>
)
