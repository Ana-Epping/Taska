import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';


export default class Home extends React.Component {
  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg)
    console.log(arg.dateStr)
  }  
  getAtividades = () => {

    fetch("http://localhost:3000/atividade/getAtividades",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUsuario: 1})
    }
  ).then((res) => res.json()).then((res) => {
console.log(res);
  })
  };

  render() {
    return (
      <div className='home-calendar'>
      <FullCalendar   defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      weekends={false}  
      navLinks={true}
      navLinkDayClick={function(date, jsEvent) {
        console.log('day', date.toISOString());
        console.log('coords', jsEvent.pageX, jsEvent.pageY);
      }}
      // eventMouseEnter={function(info) {
      //   alert('Event: ' + info.event.title);
      //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      //   alert('View: ' + info.view.type);
      //   info.el.style.borderColor = 'red';
      // }}
      eventClick={function(info) {
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

}
