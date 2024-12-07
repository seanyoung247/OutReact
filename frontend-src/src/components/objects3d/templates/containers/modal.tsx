
import Styles from './modal.module.css'

type ModalProps = {
    header: string;
    close?: ()=>void;
    children?: React.ReactNode
}

export const Modal = ({header, close, children}:ModalProps) => (
    <div className={ Styles.backdrop }>
        <div className={ Styles.modal }>

            <h3>{ header }</h3>
            <button className={ Styles.closeBtn } onClick={close}>
                &times;
            </button>

            <div className={ Styles.content }>
               { children }
            </div>

        </div>
    </div>
)
