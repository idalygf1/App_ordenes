import React from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Radio, message } from 'antd';
import type { FormProps } from 'antd';
import type { Dayjs } from 'dayjs';

interface UserFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthdate: Dayjs;
  gender: string;
  terms: boolean;
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm<UserFormData>();

  const onFinish: FormProps<UserFormData>['onFinish'] = (values) => {
    message.success('Formulario enviado correctamente');
    console.log('Datos en JSON:', JSON.stringify(values, null, 2));
  };

  const onFinishFailed: FormProps<UserFormData>['onFinishFailed'] = (errorInfo) => {
    message.error('Revisa los campos del formulario');
    console.log('Errores:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="advanced_user_form"
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre completo"
        name="fullname"
        rules={[{ required: true, message: 'Por favor ingresa tu nombre completo' }]}
      >
        <Input placeholder="Ej. María Pérez" />
      </Form.Item>

      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: 'Por favor ingresa tu correo' },
          { type: 'email', message: 'El correo no es válido' },
        ]}
      >
        <Input placeholder="Ej. maria@email.com" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Por favor ingresa una contraseña' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar contraseña"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Confirma tu contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Las contraseñas no coinciden');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Teléfono"
        name="phone"
        rules={[
          { required: true, message: 'Por favor ingresa tu teléfono' },
          { pattern: /^[0-9]{10}$/, message: 'Debe tener 10 dígitos' },
        ]}
      >
        <Input placeholder="Ej. 5551234567" />
      </Form.Item>

      <Form.Item
        label="Fecha de nacimiento"
        name="birthdate"
        rules={[{ required: true, message: 'Selecciona tu fecha de nacimiento' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Género"
        name="gender"
        rules={[{ required: true, message: 'Selecciona tu género' }]}
      >
        <Radio.Group>
          <Radio value="femenino">Femenino</Radio>
          <Radio value="masculino">Masculino</Radio>
          <Radio value="otro">Otro</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Debes aceptar los términos') }]}
      >
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Enviar formulario
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
