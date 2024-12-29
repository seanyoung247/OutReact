

import { triggers } from '~/utilities/triggers';
import './actionbutton.css'

type ActionButtonProps = {
    trigger: string;
}

export const ActionButton = ({trigger}:ActionButtonProps) => {
    const action = triggers.get(trigger)

    return (
        <button onClick={action}>Test</button>
    )
}