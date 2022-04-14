import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  function quit() {
    window.api.send("toMain", {funcao:"quit"});
  }

  return (
    <>
      <LoginPage />
      <button style={{margin:'auto 0 auto auto'}} onClick={quit}>Sair</button>
    </>
  );
}

export default App;
