import { Form, Button, Modal } from 'antd';
import React, { useState } from 'react';

const Atividade = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModal2Visible(true)}>
        +
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );

    function quit() {
        window.api.send("toMain", { funcao: "quit" });
    }

    const getAtividadesUsuario = (usuario) => {
        window.api.send("toMain", { funcao: "getAtividades", usuario: usuario });
        window.api.receive("fromMain", (resposta) => {
            console.log(resposta);
          if (resposta) {
          }
        });
      };

    return (
        <div className='atividade'>
            <Form>
            <Form.Item>
                    <Button className='exit-button' style={{ margin: 'auto 0 auto auto' }} onClick={getAtividadesUsuario}>
                        
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

export default Atividade;