
import React from "react";
import "./../Modal.css";
import FormAtividade from './FormAtividade';


const ModalAtividade = props => {
    const { className, modalRef, date, closeDropdownAtividade } = props;

    console.log('sTE ',date);

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content">
                <button id="button-close-modal" onClick={closeDropdownAtividade}>x</button>
                <FormAtividade date={date} closeDropdownAtividade={closeDropdownAtividade}/>
            </div>
        </div>
    )
}

export default ModalAtividade;