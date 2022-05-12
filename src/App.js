import './App.css';
import LoginPage from './pages/LoginPage';

function App() {
  function quit() {
    window.api.send("toMain", {funcao:"quit"});
  }

  return (
    <>
      <LoginPage />
      <button className='sair-button' style={{margin:'auto 0 auto auto'}} onClick={quit}>Sair</button>
    </>
  );
}

export default App;
