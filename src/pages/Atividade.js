import { Button, Modal } from 'antd';
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
};

export default Atividade;