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
  const [atividades, setAtividades] = useState([]);
  const modalRef = useRef(null);

  const toggleDropdownRotulo = () => {
    setDropdownRotulo("show");
    setData(date);
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
    //   console.log("hidden");
    setDropdownAtividade("");
    setData('');
    getAtividadesUsuario();
    // }
  };

  const toggleDropdownAtividadeDetalhes = (idAtividade) => {
    console.log('at id ', idAtividade);
    setDropdownAtividadeDetatalhes("show");
    setIdAtividade(idAtividade);
  }

  const closeDropdownAtividadeDetalhes = (event) => {
    console.log('close detalhes');
    event && event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
    setDropdownAtividadeDetatalhes("");
    setIdAtividade('');
    getAtividadesUsuario();
    // }
  };

  const salvarAtividades = (values) => {
    console.log('ser arividade', values);
    setAtividades(values);
  }

  const updateAtividade = (event) => {
    // TALVEZ A SER FEITO
    // ATUALIZAR A HORA DA ATIVIDADE AO ARRASTÁ-LA.

    // const idUsuario = localStorage.getItem("idUsuario");
    // console.log('update atividade');
    // window.api.send("toMain", {
    //   funcao: "updateAtividade",
    //   usuario: idUsuario, 
    //   id: event.id, 
    //   data_inicial: event.startStr, 
    //   data_final: event.endStr, 
    //   title: event.title 
    // })
  }

  const getAtividadesUsuario = () => {
    console.log("ENtrou na funca");

    window.api.send("toMain", { funcao: "getAtividades", usuario: idUsuario });
    window.api.receive("fromMain", (resposta) => {
      console.log('RESP', resposta);
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
      {dropdownAtividade && <ModalAtividade className={dropdownAtividade} modalRef={modalRef} date={date} closeDropdownAtividade={closeDropdownAtividade} />}
      {dropdownRotulo && <ModalRotulo className={dropdownRotulo} modalRef={modalRef} closeDropdownRotulo={closeDropdownRotulo} />}
      {dropdownAtividadeDetalhes && <ModalAtividadeDetalhes className={dropdownAtividadeDetalhes} modalRef={modalRef} idAtividade={idAtividade} closeDropdownAtividadeDetalhes={closeDropdownAtividadeDetalhes}  />}

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
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          dateClick={function (info) {
            toggleDropdownAtividade(info.dateStr)
          }}
          eventDrop={({ event }) => {
            updateAtividade(event);
          }}
          eventClick={function (info) {
            console.log('ID ATIVIDADE', info.event.id);
            toggleDropdownAtividadeDetalhes(info.event.id);
          }
          }
          events={atividades} />
      </div>

    </div>
  )
}

export default () => <Home />;