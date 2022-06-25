
import React from "react";
import "./../Modal.css";
import FormRotulo from './FormRotulo';

const ModalRotulo = props => {
    const { className, modalRef, closeDropdownRotulo } = props;

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content">
                <button id="button-close-modal-rotulo" onClick={closeDropdownRotulo}>x</button>
                <FormRotulo closeDropdownRotulo={closeDropdownRotulo}/>
            </div>
        </div>
    )
}

export default ModalRotulo;