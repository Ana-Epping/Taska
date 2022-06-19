import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import ModalAtividade from './modal/modalAtividade/ModalAtividade';
import ModalRotulo from './modal/modalRotulo/ModalRotulo';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Menu, Modal } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
]; // submenu keys of first level

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Home = () => {

  const idUsuario = localStorage.getItem("idUsuario");
  const navigate = useNavigate();
  useEffect(() => {
    console.log('idUsuario', idUsuario);
    if (!idUsuario || idUsuario == null) {
      navigate('./login');
    }
  });

  const [dropdownAtividade, setDropdownAtividade] = useState("");
  const [dropdownRotulo, setDropdownRotulo] = useState("");
  const [date, setData] = useState("");
  const modalRef = useRef(null);

  const toggleDropdownRotulo = () => {

    setDropdownRotulo("show");
    setData(date);

    document.getElementById('button-close-modal-rotulo').addEventListener("click", closeDropdownRotulo);

  }

  const closeDropdownRotulo = (event) => {
    //console.log(event);
    event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
    setDropdownRotulo("");
    setData('');
    document.getElementById('button-close-modal-rotulo').removeEventListener("click", closeDropdownRotulo);
    // }
  };

  const toggleDropdownAtividade = (date) => {
    console.log("show", document.getElementById('button-close-modal'), document.body);
    //se clicar no botão, modal aparece
    setDropdownAtividade("show");
    setData(date);

    document.getElementById('button-close-modal').addEventListener("click", closeDropdownAtividade);
  }

  const closeDropdownAtividade = (event) => {
    //console.log(event);
    event.stopPropagation(); //impede de executar listeners dos filhos
    // const contain = modalRef.current.contains(event.target);
    // console.log(contain);
    // if (!contain) { //se clicar fora do modal, ele DESaparece
    //   console.log("hidden");
    setDropdownAtividade("");
    setData('');
    document.getElementById('button-close-modal').removeEventListener("click", closeDropdownAtividade);
    // }
  };

  const getAtividadesUsuario = () => {
    console.log("ENtrou na funca");

    let a = window.api.send("toMain", { funcao: "getAtividades", usuario: idUsuario });
    console.log('a ', a);
    window.api.receive("fromMain", (resposta) => {
      console.log('RESP', resposta);
      if (resposta) {
      }
    });
  };

  getAtividadesUsuario();

  const executeLogoff = () => {
    localStorage.removeItem("idUsuario");
    navigate('./login');
  }

  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items}
      />
      <ModalAtividade className={dropdownAtividade} modalRef={modalRef} date={date} />
      <ModalRotulo className={dropdownRotulo} modalRef={modalRef} />
      <div className='menu'>
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
          events={[
            { title: 'event 1', date: '2022-05-03' },
            { title: 'event 2', date: '2022-05-02' }
          ]} /></div>
    </div>
  )
}

export default () => <Home />;