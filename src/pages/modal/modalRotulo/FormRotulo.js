import { Form, Input, Button, Alert, Col, Row, Select} from 'antd';
import {  PhoneOutlined, MailOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const FormRotulo = props => {
    const { Option } = Select;
    const [descricao, setDescricao] = useState();
    const [color, setColor] = useState();
    const [icon, setIcon] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const criarRotulo = () => {
        console.log('criar rotulo');
        let idUsuario = localStorage.getItem("idUsuario");
        window.api.send("toMain", { funcao: "createRotulo", 'descricao': descricao, 'color': color, 'icon': icon, 'usuario': idUsuario });
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
            <Alert message="Falha ao criar rótulo!" type="warning"></Alert>
        </Col>
    </Row> : ''

    const salvarDescricao = (e) => {
        setDescricao(e.target.value);
    };

    const salvarColor = (e) => {
        console.log('cor ', e.target.value);
        setColor(e.target.value);
    };

    const salvarIcon = (value) => {
        console.log('cor ', value);
        
        setIcon(value);
    };

    return (
        <div className='atividade'>
            <Form>
                <Form.Item name="descricao"
                    value={descricao}
                    onChange={salvarDescricao}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira o titulo!',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Descrição"
                    />
                </Form.Item>

                <Form.Item name="icon"
                    value={icon}
                    onChange={salvarIcon}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira o icone!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Ícone"

                        style={{
                            width: 120,
                        }}
                        onChange={salvarIcon}>
                        <Option value="phone"><PhoneOutlined /></Option>
                        <Option value="email"><MailOutlined /></Option>
                        <Option value="message"><MessageOutlined /></Option>
                        <Option value="whatsapp"><WhatsAppOutlined /></Option>
                    </Select>
                </Form.Item>
                <Form.Item name="color"
                    value={color}
                    onChange={salvarColor}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira a cor!',
                        },
                    ]}
                >
                    <Input
                        type="color"
                        placeholder="Cor"
                    />
                </Form.Item>


                {errorAlert}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={criarRotulo}>
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormRotulo;