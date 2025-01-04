

import { triggers } from '~/utilities/triggers'
import Styles from './triggerbutton.module.css'
import { cl } from '~/utilities/css';

type ActionButtonProps = {
    context?: string;
    trigger: string;
    text: string;
}

export const TriggerButton = ({trigger, text, context="default"}:ActionButtonProps) => {
    const action = triggers.get(trigger)

    return (
        <button className={cl(
                Styles['trigger-button'],
                Styles[context],
            )}
            onClick={ action }
            data-text={text}
        >
            <span>{ text }</span>
        </button>
    )
}