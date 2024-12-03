
import { RoadBadge } from "./roadbadge"

import "./skillbadges.css"

type SkillBadgesProps = {
    badges: {title:string, name:string, value:string}[];
}

export const SkillBadges = ({badges}:SkillBadgesProps) => {
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
