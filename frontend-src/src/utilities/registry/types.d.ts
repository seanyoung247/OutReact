
/*
 * Component Registry types
 */
export type Templates = Record<string, {component: unknown, props: unknown}>

// Maps allowable prop types to component names
export type TypeMap<T extends Templates> = {
    [K in keyof T]: T[K]['props']
}

// Generates a type that enforces prop and component types for a component registry
type RegistryProps<T> = Omit<T, 'children'>
export type RegistryTypes<T extends Templates, C = never> = {

    [K in keyof T]: {
        type: K;
        props: RegistryProps<T[K]['props']> extends Record<string, never>
            ? Partial<RegistryProps<T[K]['props']>>
            : RegistryProps<T[K]['props']>;

    } & (
        T[K]['props'] extends { children: React.ReactNode }     // Requires children
            ? { content: C }                                    //   content is required
        : T[K]['props'] extends { children?: React.ReactNode }  // Optionally supports children
            ? { content?: C }                                   //   content is optional
        : { content?: never}                                    // Does not support children/content
    )

}[keyof T]

/*
 * Manager Registry types
 */
export type TargetDesc = {
    type: string;
    target: string;
}
export type TargetFunction = ()=>void
export type TargetManager = (id:string)=>TargetFunction

export type TargetRegistry = Record<string, TargetDesc>
