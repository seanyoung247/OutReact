
import { registerComponent, createRegistry, RegistryTypes } from '../../../utilities/registry'
// Objects to be registered:
import { Sign } from './sign'
// Content Components to be registered:
import { SkillList } from './skillsList'

// Object registration:
const objectRegistry = {
    // Road Objects:
    sign: registerComponent(Sign),
    // Content Components:
    "skill-list": registerComponent(SkillList),
}
export const objectsRegistry = createRegistry(objectRegistry)

// Object Registry types: 
export type RoadObjectsDescriptor = RegistryTypes<typeof objectRegistry>
export type ObjectProps = {
    z: number,
    y?: number,
    x?: number,
    children?: React.ReactNode
}

// const renderContent = (content: Array<string | ObjectsType>, depth:number) => {
//     return (
//         depth < settings.maxDepth ? content.map((item, index) =>
//             typeof item === "string" ? (
//                 <span key={index}>{item}</span>
//             ) : (
//                 <DynamicComponent key={index} obj={item} depth={depth+1}/>
//             )
//         ) : <></>
//     )
// }

// const DynamicComponent = ({ obj, depth }: { obj: ObjectsType, depth:number }) => {
//     const Component = objectRegistry[obj.type].component;
//     return (
//         <Component {...obj.props}>
//             {obj.content && renderContent(obj.content, depth)}
//         </Component>
//     )
// }