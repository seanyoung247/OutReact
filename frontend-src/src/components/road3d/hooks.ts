
import { useContext } from "react"
import { RoadPositionContext } from "./roadposition"

export const useRoadPosition = () => {
    const context = useContext(RoadPositionContext)
    if (!context) throw new Error('useRoadPosition must be used within a RoadPositionContext provider!')
    return context
} 