import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import ModalAtividade from './ModalAtividade';


const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    console.log('idUsuario', idUsuario);
    if (!idUsuario || idUsuario == null) {
      navigate('./login');
    }
  });

  const [dropdown, setDropdown] = useState("");
  const [date, setData] = useState("");
  const modalRef = useRef(null);

  const toggleDropdown = (date) => {
    console.log("show", document.getElementById('button-close-modal'),document.body);
    //se clicar no botão, modal aparece
    setDropdown("show");
    setData(date);

    document.getElementById('button-close-modal').addEventListener("click", closeDropdown);
  }

  const closeDropdown = event => {
    console.log(event);
    event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
      setDropdown("");
      setData('');
      document.getElementById('button-close-modal').removeEventListener("click", closeDropdown);
    // }
  };

  const getAtividadesUsuario = () => {
    console.log("ENtrou na funca");

    let a = window.api.send("toMain", { funcao: "getAtividades", usuario: '' });
    console.log('a ', a);
    window.api.receive("fromMain", (resposta) => {
      console.log('RESP', resposta);
      if (resposta) {
      }
    });
  };

  getAtividadesUsuario();

  function createAtividade() {

  }

  const executeLogoff = () => {
    localStorage.removeItem("idUsuario");
    navigate('./login');
  }

  return (
    <div className='home-calendar'>
    <ModalAtividade className={dropdown} modalRef={modalRef} date={date} />
      <button onClick={executeLogoff}>Fazer logoff</button>
      <FullCalendar
        plugins={[dayGridPlugin, interaction]}
        weekends={true}
        dateClick={function (info) {
          toggleDropdown(info.dateStr)
        }}
        events={[
          { title: 'event 1', date: '2022-05-03' },
          { title: 'event 2', date: '2022-05-02' }
        ]} /></div>
  )
}

export default () => <Home />;