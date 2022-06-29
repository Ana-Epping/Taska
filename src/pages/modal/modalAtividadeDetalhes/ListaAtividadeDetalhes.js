import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ListaAtividadeDetalhes = props => {
  const { idAtividade, closeDropdownAtividadeDetalhes, toggleDropdownEditarSituacao } = props;
  const [atividadeDetalhes, setAtividadeDetalhes] = useState({});

  useEffect(() => {
    buscaAtividade();
  }, []);


  const buscaAtividade = () => {

    let idUsuario = localStorage.getItem("idUsuario");
    console.log(idUsuario, idAtividade);
    window.api.send("toMain", { funcao: "getAtividade", usuario: idUsuario, idAtividade: idAtividade });
    window.api.receive("fromMainAtividadeDetalhes", (resposta) => {
      if (resposta) {
        salvarAtividadeDetalhes(resposta);
      }
    });
  }

  const salvarAtividadeDetalhes = (value) => {
    setAtividadeDetalhes(value);
  }
  const deleteAtividade = () => {
    let idUsuario = localStorage.getItem("idUsuario");

    window.api.send("toMain", { funcao: "deleteAtividade", usuario: idUsuario, idAtividade: idAtividade });
    window.api.receive("fromMainDeleteAtividade", (resposta) => {
      if (resposta) {
        closeDropdownAtividadeDetalhes();
      }
    });
}

const editarAtividade = () => {
  console.log('EDITAR RETORNO  CRIA CAO ', atividadeDetalhes);
  closeDropdownAtividadeDetalhes(true);
}

  return (
    <div className='atividade-detalhes'>
      <button id="button-close-modal-detalhes" onClick={editarAtividade}><EditOutlined /></button>
                <button id="button-close-modal-detalhes" onClick={deleteAtividade}><DeleteOutlined /></button>
                
      <h2>Atividade</h2>
      {atividadeDetalhes && atividadeDetalhes['id'] &&
        <>

          <p className='rotulo' style={{ backgroundColor: atividadeDetalhes.rotulo.color }}>
            {atividadeDetalhes.rotulo.descricao}
          </p>

          <div>
            <p className='title-list'>Título</p>
            <p className='campo-list'>{atividadeDetalhes.titulo}</p>
          </div>
          <div>
            <p className='title-list'>Descrição</p>
            <p className='campo-list'>{atividadeDetalhes.descricao}</p>
          </div>
          <div className='data-situacao-list'>
            <div className='data'>
              <p className='title-list'>Data</p>
              <p className='campo-list'><span>{atividadeDetalhes.data_inicio && new Date(atividadeDetalhes.data_inicio).toLocaleDateString('pt-BR')}</span>
                <span>{atividadeDetalhes.data_fim && - new Date(atividadeDetalhes.data_fim).toLocaleDateString('pt-BR')}</span>
              </p></div>
            <div className='situacao'>
              <p className='title-list'>Situação</p>
              <p className='campo-list'>{atividadeDetalhes.situacao.descricao}</p></div>
          </div>
        </>
      }
    </div>
  );
};

export default ListaAtividadeDetalhes;