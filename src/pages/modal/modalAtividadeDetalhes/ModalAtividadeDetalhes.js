
import React from "react";
import "./../Modal.css";
import ListaAtividadeDetalhes from './ListaAtividadeDetalhes';


const ModalAtividadeDetalhes = props => {
    const { className, modalRef, idAtividade, closeDropdownAtividadeDetalhes } = props;

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content-detalhes">
            <button id="button-close-modal-detalhes" onClick={closeDropdownAtividadeDetalhes}>x</button>
                <ListaAtividadeDetalhes idAtividade={idAtividade} closeDropdownAtividadeDetalhes={closeDropdownAtividadeDetalhes} />
            </div>
        </div>
    )
}

export default ModalAtividadeDetalhes;