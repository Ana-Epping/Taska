
import React from "react";
import "./Modal.css";
import FormAtividade from './FormAtividade';


const ModalAtividade = props => {
    const { className, modalRef, date } = props;
console.log('sTE ',date);
    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content">
                <button id="button-close-modal">x</button>
                <FormAtividade date={date} />
            </div>
        </div>
    )
}

export default ModalAtividade;