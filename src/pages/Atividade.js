import { Form, Input, Button, Checkbox, Alert, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { db } from '../db';


const Atividade = () => {

    function quit() {
        window.api.send("toMain", { funcao: "quit" });
    }

    function getAtividades() {
        db.getAtividades();
    }

    return (
        <div className='login'>
            <Form>
            <Form.Item>
                    <Button className='exit-button' style={{ margin: 'auto 0 auto auto' }} onClick={getAtividades}>
                        
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button className='exit-button' style={{ margin: 'auto 0 auto auto' }} onClick={quit}>
                        Sair
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default () => <Atividade />;