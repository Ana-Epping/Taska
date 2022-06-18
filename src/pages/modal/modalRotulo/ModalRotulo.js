
import React from "react";
import "./../Modal.css";
import FormRotulo from './FormRotulo';

const ModalRotulo = props => {
    const { className, modalRef } = props;

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content">
                <button id="button-close-modal-rotulo">x</button>
                <FormRotulo />
            </div>
        </div>
    )
}

export default ModalRotulo;