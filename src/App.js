import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Usuario from './pages/Usuario';
import { Footer, Header } from 'antd/lib/layout/layout';

function App() {

  function quit() {
    window.api.send("toMain", { funcao: "quit" });
  }

  return (
    <>
      <Header className='navbar'>
        <p>Taska</p>
        <ul>
          <button className='exit-button' onClick={quit}>Sair</button>
        </ul>
      </Header>

      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro-usuario' element={<Usuario />} />
        </Routes>
      </Router>

      {/* <Footer>
        2022 - Unoesc <br />
        Desenvolvedoras: Ana Luiza Epping e Bruna Zimmermann Tregnago
      </Footer> */}
    </>
  );
}

export default App;
