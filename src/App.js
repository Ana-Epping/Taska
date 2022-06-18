import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Rotulo from './pages/Rotulo';
import Usuario from './pages/Usuario';
// const { confirm } = Modal;

function App() {
  
  function quit() {
    window.api.send("toMain", { funcao: "quit" });
  }

  return (
    <>
      <div className='navbar'>
        <ul>
          <button className='exit-button' onClick={quit}>Sair</button>
        </ul>
      </div>
      <Router>
        {/* <div className='App'>
    <Link to='/'>Home</Link>
    <Link to='/atividade'>About</Link>
  </div> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/rotulo' element={<Rotulo />} />
          <Route path='/cadastro-usuario' element={<Usuario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
