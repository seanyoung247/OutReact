
import { Context, createContext, useContext } from "react"
import { SettingsContextType } from "./types"


const SettingsContext = createContext<SettingsContextType<unknown> | null>(null)

export const getSettingsContext = <T>() => {
    const settingsContext = SettingsContext as unknown as Context<SettingsContextType<T>>
    return settingsContext
}

export const useSettings = <T>() => {
    const context = useContext(SettingsContext) as SettingsContextType<T>
    if (!context) throw new Error('useSettings must be used within a Settings provider!')
    return context
}
