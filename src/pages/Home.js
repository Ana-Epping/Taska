import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import ModalAtividade from './modal/modalAtividade/ModalAtividade';
import ModalRotulo from './modal/modalRotulo/ModalRotulo';
import ModalAtividadeDetalhes from './modal/modalAtividadeDetalhes/ModalAtividadeDetalhes';
import timeGridPlugin from '@fullcalendar/timegrid';

const Home = () => {

  const idUsuario = localStorage.getItem("idUsuario");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('idUsuario', idUsuario);
    if (!idUsuario || idUsuario == 'null' || idUsuario == 'undefined') {
      console.log('resirect ');
      navigate('login');
    }
    getAtividadesUsuario();
  }, []);

  const [dropdownAtividade, setDropdownAtividade] = useState("");
  const [dropdownRotulo, setDropdownRotulo] = useState("");
  const [dropdownAtividadeDetalhes, setDropdownAtividadeDetatalhes] = useState("");
  const [date, setData] = useState("");
  const [idAtividade, setIdAtividade] = useState("");
  const [atividadeEditar, setAtividadeEditar] = useState("");
  const [atividades, setAtividades] = useState([]);
  const modalRef = useRef(null);

  const toggleDropdownRotulo = () => {
    setDropdownRotulo("show");
    // setData(date);
  }

  const closeDropdownRotulo = (event) => {
    //console.log(event);
    event && event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
    setDropdownRotulo("");
    setData('');
    // }
  };

  const toggleDropdownAtividade = (date) => {
    setDropdownAtividade("show");
    setData(date);
  }

  const closeDropdownAtividade = (event) => {
    console.log('close at');
    //console.log(event);
    event && event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");s
    setDropdownAtividade("");
    setData('');
    setAtividadeEditar('');
    getAtividadesUsuario();
    // }
  };

  const toggleDropdownAtividadeDetalhes = (idAtividade, atividade) => {
    console.log('ABRE ATIVIDADE DETALHES ID E ATI ', idAtividade, atividade);
    setDropdownAtividadeDetatalhes("show");
    setIdAtividade(idAtividade);
    setAtividadeEditar(atividade);
    setData(atividade['data_inicio']);
  }

  const closeDropdownAtividadeDetalhes = (atividadeIsEditar = false, event) => {
    event && event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
    setDropdownAtividadeDetatalhes("");
    setIdAtividade('');
    console.log('passou aqui')
    getAtividadesUsuario();

    console.log("Atividade Is Editar" + atividadeEditar.values);
    if (atividadeIsEditar == true) {
      toggleDropdownAtividade(date);
    } else {
      setAtividadeEditar('');
    }
    // }
  };

  const updateDataAtividade = (atividadeId, atividadeInfo, data) => {
    let idUsuario = localStorage.getItem("idUsuario");

    window.api.send("toMain", {
      funcao: "updateDataAtividade",
      atividade: {
        id: atividadeId,
        titulo: atividadeInfo.titulo,
        descricao: atividadeInfo.descricao,
        data_inicio: data,
        usuario: idUsuario,
        id_situacao: atividadeInfo.id_situacao,
        id_rotulo: atividadeInfo.id_rotulo
      }
    });

    getAtividadesUsuario();
    toggleDropdownAtividadeDetalhes(atividadeId, atividadeInfo);
    getAtividadesUsuario();
  }

  const salvarAtividades = (values) => {
    console.log('salvar atividades', values);
    setAtividades(values);
  }

  const getAtividadesUsuario = () => {
    console.log("Entrou na funcao");

    window.api.send("toMain", { funcao: "getAtividades", usuario: idUsuario });
    window.api.receive("fromMain", (resposta) => {
      console.log('RESP', resposta);
      setAtividades('');
      if (resposta) {
        salvarAtividades(resposta);
      }
    });
  };

  const executeLogoff = () => {
    localStorage.removeItem("idUsuario");
    navigate('./login');
  }

  return (
    <div>
      {dropdownAtividade && <ModalAtividade className={dropdownAtividade} modalRef={modalRef} date={date} closeDropdownAtividade={closeDropdownAtividade} atividadeEditar={atividadeEditar} toggleDropdownAtividadeDetalhes={toggleDropdownAtividadeDetalhes} />}
      {dropdownRotulo && <ModalRotulo className={dropdownRotulo} modalRef={modalRef} closeDropdownRotulo={closeDropdownRotulo} />}
      {dropdownAtividadeDetalhes && <ModalAtividadeDetalhes className={dropdownAtividadeDetalhes} modalRef={modalRef} idAtividade={idAtividade} closeDropdownAtividadeDetalhes={closeDropdownAtividadeDetalhes} />}

      <div className='menu'>
        {/* <ModalAtividade className={dropdownAtividade} modalRef={modalRef} date={date} />
      <ModalRotulo className={dropdownRotulo} modalRef={modalRef} /> */}
        {/* <div className='menu'> */}
        <button onClick={executeLogoff}>Fazer logoff</button>
        <button onClick={toggleDropdownRotulo}>Criar rótulo</button>
      </div>
      <div className='home-calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interaction]}
          weekends={true}
          editable={true}
          selectable={true}
          locale={'pt-br'}
          timeZone={'UTC'}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonText={{
            today: 'hoje',
            dayGridMonth: 'mês',
            timeGridWeek: 'semana',
            timeGridDay: 'dia'
          }}
          dateClick={function (info) {
            toggleDropdownAtividade(info.dateStr)
          }}
          eventClick={function (info) {
            console.log('ID ATIVIDADE', info.event.id);
            toggleDropdownAtividadeDetalhes(info.event.id, info.event.extendedProps);
          }}
          eventDrop={function (info) {
            updateDataAtividade(info.event.id, info.event.extendedProps, info.event.start);
          }}
          events={atividades} />
      </div>

    </div>
  )
}

export default () => <Home />;