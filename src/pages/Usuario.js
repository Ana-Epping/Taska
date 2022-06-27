import { Form, Input, Button, Alert, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cadastroImg from './../images/cadastro.svg';

const Usuario = () => {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const errorAlert = error ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Falha ao criar usuário!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const login = success ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Sucesso ao criar usuário!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const criaUsuario = () => {
    window.api.send("toMain", { funcao: "createUsuario", usuario: usuario, senha: senha });
    window.api.receive("fromMain", (resposta) => {
      console.log('usuario response', resposta);
      if (resposta) {
        setSuccess(true);
        setError(false);
        localStorage.setItem("idUsuario", resposta['id']);
        navigate('/');


      } else {
        setSuccess(false);
        setError(true);
      }
    });
  };

  const navigateLogin = () => {
    navigate('/login');
  }
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

  return (
    <div className='login'>
      <div className='login-wrapper'>

        <h1>Cadastre-se</h1>
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={criaUsuario}>
              Cadastrar
            </Button>
            <p id='p-login' onClick={navigateLogin}>voltar para o Login</p>
          </Form.Item>
        </Form>
      </div>
      <div className='image-wrapper'>
        <img alt='' src={cadastroImg} ></img>
      </div>
    </div>
  );
};

export default () => <Usuario />;