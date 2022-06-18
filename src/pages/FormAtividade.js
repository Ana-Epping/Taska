import { Form, Input, Button, Checkbox, Alert, Col, Row } from 'antd';
import React, { useState } from 'react';

const FormAtividade = props => {
  const { date } = props;
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const criaAtividade = () => {
console.log('criar atividae');
    let idUsuario = localStorage.getItem("idUsuario");
    window.api.send("toMain", { funcao: "createAtividade", titulo: titulo, descricao: descricao, data_inicio: date, usuario: idUsuario });
    window.api.receive("fromMain", (resposta) => {
      console.log('usuario response', resposta);
      if (resposta) {
        setSuccess(true);
        setError(false);

      } else {
        setSuccess(false);
        setError(true);
      }
    });
  };

  const errorAlert = error ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Falha ao criar atividade!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const salvarTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const salvarDescricao = (e) => {
    setDescricao(e.target.value);
  };

  return (
    <div className='atividade'>
      <Form>
        <Form.Item name="titulo"
          value={titulo}
          onChange={salvarTitulo}
          rules={[
            {
              required: true,
              message: 'Por favor, insira o titulo!',
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Título"
          />
        </Form.Item>
        <Form.Item name="descricao"
          value={descricao}
          onChange={salvarDescricao}
        >
          <Input
            type="text"
            placeholder="Descrição"
          />
        </Form.Item>
        {errorAlert}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={criaAtividade}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAtividade;