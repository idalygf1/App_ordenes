import React from 'react';
import { Modal, Button } from 'antd';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DelUserModal({ visible, onClose, onConfirm }: Props) {
  return (
    <Modal
      title="¿Eliminar usuario?"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirm}>
          Eliminar
        </Button>,
      ]}
    >
      <p>¿Estás seguro de que deseas eliminar este usuario?</p>
    </Modal>
  );
}
