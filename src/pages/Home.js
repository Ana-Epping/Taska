import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils'

export default class Home extends React.Component {

  // getAtividades = () => {

  //   fetch("http://localhost:3000/atividade/getAtividades",
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ idUsuario: 1 })
  //     }
  //   ).then((res) => res.json()).then((res) => {
  //     console.log(res);
  //   })
  // }

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='home-calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          navLinks={true}
          weekends={this.state.weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          locale={'pt-br'}
          select={this.handleDateSelect}
          eventContent={renderEventContent}
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents}
          navLinkDayClick={function (date, jsEvent) {
            console.log('day', date.toISOString());
            console.log('coords', jsEvent.pageX, jsEvent.pageY);
          }}
          // eventMouseEnter={function(info) {
          //   alert('Event: ' + info.event.title);
          //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
          //   alert('View: ' + info.view.type);
          //   info.el.style.borderColor = 'red';
          // }}
          events={[
            { title: 'event 1', date: '2022-05-03' },
            { title: 'event 2', date: '2022-05-02' }
          ]}
        /></div>
    )
  }

  dateClick = {
    function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'blue';
    }
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg)
    console.log(arg.dateStr)
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Por favor, insira um título para seu evento')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (console.log(`Tem certeza que quer deletar este evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  // handleEvents = (events) => {
  //   this.setState({
  //     currentEvents: events
  //   })
  // }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
