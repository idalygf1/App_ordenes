import React from 'react';
import { Modal, Button } from 'antd';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DelProductModal({ visible, onClose, onConfirm }: Props) {
  return (
    <Modal
      title="¿Eliminar producto?"
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
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
    </Modal>
  );
}
