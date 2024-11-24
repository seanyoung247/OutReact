
import { useState } from "react";
import { SettingsContextType } from "./types";
import { getSettingsContext } from "./hooks";

type Props<T> = {
    config: T;
    children: React.ReactNode
}

export const Settings = <T,>({config, children}: Props<T>) => {
    const [settings, setSettings] = useState<T>(config)

    const resetSettings = () => {
        setSettings(config)
    }

    const SettingsContext = getSettingsContext<T>()
    const value: SettingsContextType<T> = {
        settings, setSettings, resetSettings
    }

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    )
}