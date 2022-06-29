
import React from "react";
import "./../Modal.css";
import FormAtividade from './FormAtividade';


const ModalAtividade = props => {
    const { className, modalRef, date, closeDropdownAtividade, atividadeEditar, toggleDropdownAtividadeDetalhes } = props;

    console.log('sTE ',date,atividadeEditar);

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content">
                <button id="button-close-modal" onClick={closeDropdownAtividade}>x</button>
                <FormAtividade date={date} closeDropdownAtividade={closeDropdownAtividade} atividadeEditar={atividadeEditar} toggleDropdownAtividadeDetalhes={toggleDropdownAtividadeDetalhes}/>
            </div>
        </div>
    )
}

export default ModalAtividade;