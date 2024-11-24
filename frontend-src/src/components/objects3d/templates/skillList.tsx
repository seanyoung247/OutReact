
type SkillItemList = {
    skill: string,      // The skill name
    value: number,      // Skill level, also used as display if display not given
    grade?: string,      // Skill grade level (Expert, intermediate etc)
    display?: string,   // Skill level to display
}[]

export type SkillListProps = {
    items: SkillItemList,
}

export const SkillList = ({items}:SkillListProps) => (
    (items.length > 0) ? (
        <ul>{
            items.map((item, i) => (
                <li key={i}>
                    <span className="skill">{item.skill}</span>
                    <span className="value">{item.display ?? item.value}</span>
                </li>
            ))
        }</ul>
    ) : (null)
)
