
// export type KeySetter<T> = <K extends keyof T>(key: K, value: T[K]) => void

export type SettingsContextType<T> = {
    settings: T,
    setSettings: (setting:T)=>void,
    resetSettings: () => void,
}
