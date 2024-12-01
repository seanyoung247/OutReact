
// Components
import { RoadPosition } from './components/road3d/roadposition'
import { Scene } from './components/scene'
// Settings
import { Settings } from './utilities/settings'
import { config } from './config'
import { testRoad } from './testRoad'
// Styles
import './App.css'


const App = () => (
    <Settings config={config}>
        <RoadPosition road={testRoad}>
            <Scene road={testRoad} />
        </RoadPosition>
    </Settings>
)
export default App
