import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Atividade from './pages/Atividade';

// const { confirm } = Modal;

function App() {

  return (
  <Router>
  {/* <div className='App'>
    <Link to='/'>Home</Link>
    <Link to='/atividade'>About</Link>
  </div> */}
  <Routes>
    <Route exact path='/' element={<LoginPage />} />
    <Route path='/atividade' element={<Atividade />} />
  </Routes>
</Router>
  );
}

export default App;
