
import { objectsRegistry, ContentList, ObjectDesc} from "./templates/registry"

import { useSettings } from "../../config"

const renderContent = (content: ContentList, depth: number, maxDepth: number) => {
    if (depth >= maxDepth) {
        return null
    }

    return (
        content.map((item, i) => 
            typeof item === 'string' ? (
                <span key={i}>{item}</span>
            ) : (
                <DynamicObject key={i} obj={item} depth={depth+1}/>
            )
        )
    )
}

type Props = {
    obj: ObjectDesc;
    depth:number;
}

export const DynamicObject = ({ obj, depth }: Props) => {
    const {settings:{objects}} = useSettings()
    const Component = objectsRegistry(obj.type)

    return (
        <Component {...obj.props}>
            {obj.content && renderContent(obj.content, depth, objects.maxDepth)}
        </Component>
    )
}
