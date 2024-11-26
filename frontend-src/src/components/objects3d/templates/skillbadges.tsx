
import { RoadBadge } from "./roadbadge"

import "./skillbadges.css"

type Props = {
    badges: {title:string, name:string, value:string}[];
}

export const SkillBadges = ({badges}:Props) => {
    return (
        <div className="skill-badges">
            { badges.map((item, i) => (
                <div className="skill-badge" key={i}>
                    {item.title}
                    <RoadBadge name={item.name} value={item.value} />
                </div>
            )) }
        </div>
    )
}
