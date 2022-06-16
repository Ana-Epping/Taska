import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    console.log('idUsuario', idUsuario);
    if (!idUsuario || idUsuario == null) {
      navigate('./login');
    }
  });

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
      <button onClick={executeLogoff}>Fazer logoff</button>
      <FullCalendar defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        weekends={false}
        navLinks={true}
        navLinkDayClick={function (date, jsEvent) {
          createAtividade()
          console.log('day', date.toISOString());
          console.log('coords', jsEvent.pageX, jsEvent.pageY);
        }}
        // eventMouseEnter={function(info) {
        //   alert('Event: ' + info.event.title);
        //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        //   alert('View: ' + info.view.type);
        //   info.el.style.borderColor = 'red';
        // }}
        eventClick={function (info) {
          alert('Event: ' + info.event.title);
          alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
          alert('View: ' + info.view.type);
          info.el.style.borderColor = 'red';
        }}
        events={[
          { title: 'event 1', date: '2022-05-03' },
          { title: 'event 2', date: '2022-05-02' }
        ]} /></div>
  )
}

export default () => <Home />;