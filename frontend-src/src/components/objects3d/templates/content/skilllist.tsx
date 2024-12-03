
import './skilllist.css'

type SkillItemList = {
    skill: string,      // The skill name
    value: number,      // Skill level, also used as display if display not given
    grade?: string,      // Skill grade level (Expert, intermediate etc)
    display?: string,   // Skill level to display
}[]

type SkillListProps = {
    items: SkillItemList,
}

export const SkillList = ({items}:SkillListProps) => (
    (items.length > 0) ? (
        <ul className="skill-list">{
            items.map((item, i) => (
                <li key={i}>
                    <span className="skill">{item.skill}</span>
                    {item.grade && <span className="grade">{item.grade}</span>}
                    <span className="value">{item.display ?? item.value}</span>
                </li>
            ))
        }</ul>
    ) : (null)
)
