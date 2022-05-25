import './App.css';
import LoginPage from './pages/LoginPage';
//import Atividade from './pages/Atividade';

// const { confirm } = Modal;

function App() {

  // function showExitConfirm() {
  //   confirm({
  //     title: 'Sair',
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'Deseja realmente sair?',
  //     onOk() {
  //       window.api.send("toMain", { funcao: "quit" });
  //     },
  //     onCancel() { },
  //   });
  // }

  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;
