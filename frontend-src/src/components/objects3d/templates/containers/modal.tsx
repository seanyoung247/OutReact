
import './modal.css'


type ModalProps = {
    header: string;
    close?: ()=>void;
    children?: React.ReactNode;
    className?: string;
}

export const Modal = ({header, close, className="", children}:ModalProps) => (

    <div className={`modal-backdrop ${className}`} onClick={close}>
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
