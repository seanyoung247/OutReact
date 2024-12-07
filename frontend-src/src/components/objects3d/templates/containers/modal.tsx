
import './modal.css'


type ModalProps = {
    header: string;
    close?: ()=>void;
    children?: React.ReactNode
}

export const Modal = ({header, close, children}:ModalProps) => {

    return (
        <div className="modal-backdrop" onClick={close}>
            <div className="modal" onClick={e=>e.stopPropagation()}>

                <h3>{ header }</h3>
                <button className="closeBtn" onClick={close}>
                    &times;
                </button>

                <div className="content">
                    { children }
                </div>

            </div>
        </div>
    )
}