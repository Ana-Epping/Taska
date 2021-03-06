import { Form, Input, Button, Checkbox, Alert, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../images/login.png';

const Login = () => {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const errorAlert = error ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Falha no Login!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const login = success ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Sucesso no Login!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const processaLogin = () => {
    window.api.send("toMain", { funcao: "login", usuario: usuario, senha: senha });
    window.api.receive("fromMain", (resposta) => {
      if (resposta && resposta['id']) {
        localStorage.setItem("idUsuario", resposta['id']);

        setSuccess(true);
        setError(false);

        navigate('/');

      } else {
        setSuccess(false);
        setError(true);
      }
    });
  };

  const salvaUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const salvaSenha = (e) => {
    setSenha(e.target.value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const abrirCadastro = () => {
    console.log('abrir cadastro');
    navigate('/cadastro-usuario');
  }

  const cadastro = {
    color: '#71a2cf',
    cursor: 'pointer'
  };

  return (
    <div className='login'>
      <div className='image-wrapper'>
        <img alt='' src={loginImg} ></img>
      </div>
      <div className='login-wrapper'>

        <h1>Login</h1>
        <br />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            value={usuario}
            onChange={salvaUsuario}
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            value={senha}
            onChange={salvaSenha}
            rules={[
              {
                required: true,
                message: 'Por favor, insira sua senha!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          {errorAlert}
          {login}

          {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar-se</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Esqueci minha senha
          </a>
        </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={processaLogin}>
              Entrar
            </Button>
            <div onClick={abrirCadastro} style={cadastro}>cadastre-se</div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default () => <Login />;