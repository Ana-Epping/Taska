
import React from "react";
import "./../Modal.css";
import ListaAtividadeDetalhes from './ListaAtividadeDetalhes';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const ModalAtividadeDetalhes = props => {
    const { className, modalRef, idAtividade, closeDropdownAtividadeDetalhes } = props;


const deleteAtividade = () => {
        let idUsuario = localStorage.getItem("idUsuario");
    
        window.api.send("toMain", { funcao: "deleteAtividade", usuario: idUsuario, idAtividade: idAtividade });
        window.api.receive("fromMainDeleteAtividade", (resposta) => {
          if (resposta) {
            closeDropdownAtividadeDetalhes();
          }
        });
}

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <div className="modal-content-detalhes">
                <button id="button-close-modal-detalhes" onClick={deleteAtividade}><DeleteOutlined /></button>
                <button id="button-close-modal-detalhes" onClick={closeDropdownAtividadeDetalhes}>x</button>
                <ListaAtividadeDetalhes idAtividade={idAtividade} />
            </div>
        </div>
    )
}

export default ModalAtividadeDetalhes;