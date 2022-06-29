import { Form, Input, Button, Alert, Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const FormAtividade = props => {
  const { date, closeDropdownAtividade, atividadeEditar } = props;
  const { Option } = Select;
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [id_situacao, setIdSituacao] = useState('');
  const [id_rotulo, setIdRotulo] = useState(1);
  const [rotulo, setRotulo] = useState([]);
  const [situacao, setSituacao] = useState([]);


  const [error, setError] = useState();
  // const [success, setSuccess] = useState();

  useEffect(() => {
    buscaRotulo();
    buscaSituacoes();
    if(atividadeEditar && atividadeEditar['id_atividade']){
      setTitulo(atividadeEditar['titulo']);
      setDescricao(atividadeEditar['descricao']);
      setIdRotulo(atividadeEditar['id_rotulo']);
      setIdSituacao(atividadeEditar['id_situacao']);
    }
  }, []);


  const buscaRotulo = () => {

    console.log('Entrou FUNCAO ROTULO');
    let idUsuario = localStorage.getItem("idUsuario");

    window.api.send("toMain", { funcao: "getRotulos", usuario: idUsuario });
    window.api.receive("fromMainRotulo", (resposta) => {
      console.log('rotulo response', resposta);
      if (resposta) {
        salvarRotulo(resposta);
      }
    });
  }

  const buscaSituacoes = () => {
    console.log('Entrou FUNCAO SITUACAO');
    window.api.send("toMain", { funcao: "getSituacoes" });
    window.api.receive("fromMainSituacao", (resposta) => {
      console.log('situacao response', resposta);
      if (resposta) {
        salvarSituacao(resposta);

      }
    });
  }

  const criaAtividade = () => {
    console.log('criar atividade');
    let idUsuario = localStorage.getItem("idUsuario");

    console.log('situaccao / rotulo ', id_situacao, id_rotulo);
    window.api.send("toMain", { funcao: "createAtividade", titulo: titulo, descricao: descricao, data_inicio: date, usuario: idUsuario, id_situacao: id_situacao, id_rotulo: id_rotulo });
    // window.api.receive("fromMain", (resposta) => { // NÃO ESTÁ SENDO USADO NO MOMENTO
    //   console.log('usuario response', resposta);
    //   if (resposta) {
    //     setSuccess(true);
    //     setError(false);
    //     console.log('Funcionou');
    //   } else {
    //     setSuccess(false);
    //     setError(true);
    //     console.log('Nao Funcionou');
    //   }
    // });
    closeDropdownAtividade();
  };

  const editarAtividade = () => {

    let idUsuario = localStorage.getItem("idUsuario");

    window.api.send("toMain", { funcao: "editarAtividade", atividade:{id: atividadeEditar['id_atividade'], titulo: titulo, descricao: descricao, data_inicio: date, usuario: idUsuario, id_situacao: id_situacao, id_rotulo: id_rotulo} });
  
    closeDropdownAtividade();
  }

  const errorAlert = error ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Falha ao criar atividade!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const salvarTitulo = (e) => {
    console.log('titulo ', e);
    setTitulo((e.target ? e.target.value : e));
  };

  const salvarDescricao = (e) => {
    console.log('desc ', e);
    setDescricao((e.target ? e.target.value : e));
  };

  const salvarSituacao = (value) => {
    setSituacao(value);
  }

  const salvarRotulo = (value) => {
    setRotulo(value);
  }

  const salvarIdSituacao = (value) => {
    console.log('sit ', value);

    setIdSituacao(value);
  };

  const salvarIdRotulo = (value) => {
    console.log('rot ', value);

    setIdRotulo(value);
  };

  return (
    <div className='atividade'>
      <h2>{atividadeEditar || atividadeEditar['id_atividade'] ? 'Editar atividade' : 'Nova atividade'}</h2>
      <Form onFinish={atividadeEditar || atividadeEditar['id_atividade'] ? editarAtividade : criaAtividade}>
        <Form.Item name="titulo"
          value={titulo}
          onChange={salvarTitulo}
          rules={[
            {
              required: true,
              message: 'Por favor, insira o título!',
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
            {situacao.map((s) =>
              <Option key={s.id} value={s.id}>{s.descricao}</Option>
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
            {rotulo.map((r) =>
              <Option key={r.id} value={r.id}>{r.descricao}</Option>
            )
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button id='atividade-form-button' type="primary" htmlType="submit" className="login-form-button">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAtividade;