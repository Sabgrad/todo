import React from 'react';
import './Modal.css';

type Props = {
    children?:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
    active: boolean;
    setActive: (active: boolean) => void;
}

const Modal = ({ children, active, setActive}: Props) => {

    const handleCloseModal = () => {
        setActive(false)
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => handleCloseModal()}>
            <div className={active ? 'modal__content active' : 'modal_content active'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
