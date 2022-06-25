import { Form, Input, Button, Alert, Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const FormAtividade = props => {
  const { date } = props;
  const { Option } = Select;
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [id_situacao, setIdSituacao] = useState();
  const [id_rotulo, setIdRotulo] = useState();
  const [rotulo, setRotulo] = useState([]);
  const [situacao, setSituacao] = useState([]);


  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    buscaRotulo();
    buscaSituacoes();
  },[]);


  const buscaRotulo = () => {

    console.log('Entrou FUNCAO ROTULO');
    let idUsuario = localStorage.getItem("idUsuario");

    window.api.send("toMain", { funcao: "getRotulos", usuario: idUsuario});
    window.api.receive("fromMainRotulo", (resposta) => {
      console.log('rotulo response', resposta);
      if (resposta) {
        salvarRotulo(resposta);
      }
    });
  }

  const buscaSituacoes = () => {
console.log('Entrou FUNCAO SITUACAO');
    window.api.send("toMain", { funcao: "getSituacoes"});
    window.api.receive("fromMainSituacao", (resposta) => {
      console.log('situacao response', resposta);
      if (resposta) {
        salvarSituacao(resposta);

      }
    });
  }

  const criaAtividade = () => {
console.log('criar atividae');
    let idUsuario = localStorage.getItem("idUsuario");
    window.api.send("toMain", { funcao: "createAtividade", titulo: titulo, descricao: descricao, data_inicio: date, usuario: idUsuario, 'id_situacao': id_situacao, 'id_rotulo': id_rotulo });
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


  const salvarSituacao = (value) => {
    setSituacao(value);
  }

  const salvarRotulo= (value) => {
    setRotulo(value);
  }

  const salvarIdSituacao = (value) => {
    console.log('cor ', value);
    
    setIdSituacao(value);
};

const salvarIdRotulo = (value) => {
    console.log('cor ', value);
    
    setIdRotulo(value);
};

  return (
    <div className='atividade'>
      <h2>Criar nova atividade</h2>
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


        <Form.Item name="situacao"
                    value={id_situacao}
                    onChange={salvarIdSituacao}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira a situação!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Situação"

                        style={{
                            width: 120,
                        }}
                        onChange={salvarIdSituacao}>
                    {situacao.map((s, index) => 
                        <Option key={index} value={s.value}>{s.descricao}</Option>
                    )
                    }
                    </Select>
                </Form.Item>

                <Form.Item name="rotulo"
                    value={id_rotulo}
                    onChange={salvarIdRotulo}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira o rótulo!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Rótulo"

                        style={{
                            width: 120,
                        }}
                        onChange={salvarIdRotulo}>
                    {rotulo.map((r, index) => 
                        <Option key={index} value={r.value}>{r.descricao}</Option>
                    )
                    }
                    </Select>
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