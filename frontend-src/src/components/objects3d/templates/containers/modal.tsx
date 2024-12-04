
import Styles from './modal.module.css'

type ModalProps = {
    header: string;
    closeFn?: ()=>void
    children?: React.ReactNode
}

export const Modal = ({header, children}:ModalProps) => (
    <div className={ Styles.backdrop }>
        <div className={ Styles.modal }>

            <h3>{ header }</h3>
            <button className={ Styles.closeBtn }>&times;</button>

            <div className={ Styles.content }>
               { children }
            </div>

        </div>
    </div>
)
