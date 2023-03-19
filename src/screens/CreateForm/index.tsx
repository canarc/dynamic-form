import { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import MyToast from '../../components/Toast';
import { FormModel } from '../../models/form';
import FormField, { FormFieldProps } from './FormField';

function CreateForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formValues, setFormValues] = useState<FormModel>({ name: '', description: '', createdAt: new Date().toLocaleDateString('tr-TR').replaceAll('.', '-'), fields: [] });
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const onAddNewFieldClick = () => {
    setFormValues({ ...formValues, fields: [...formValues.fields, { name: '', dataType: 'STRING', required: false }] });
  };

  const onRemoveFieldClick = (index: number) => {
    setFormValues({ ...formValues, fields: formValues.fields.filter((_, idx) => idx !== index) });
  };

  const handleFormChange = (event: React.ChangeEvent<any>, index?: number) => {
    if (typeof index === 'number') {
      console.log(event.target.name.split('-')[0]);
      setFormValues({ ...formValues, fields: formValues.fields.map((field, i) => (i === index ? { ...field, [event.target.name]: event.target.value } : field)) });
    } else {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
  };

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.fields.length) {
      setWarningMessage('Please add at least one form element.');
      setIsWarningVisible(true);
      return;
    }

    const parsedFormValue = {
      ...formValues,
      fields: formValues.fields.map((field) => {
        const _field: { [key: string]: string | boolean } = {};

        for (const [key, value] of Object.entries(field)) {
          _field[key.split('-')[0]] = value;
        }

        return _field;
      }),
    };

    localStorage.setItem(String(Date.now()), JSON.stringify(parsedFormValue));

    setFormValues({ name: '', description: '', createdAt: new Date().toLocaleDateString('tr-TR').replaceAll('.', '-'), fields: [] });
    onClose();
  };

  return (
    <Modal className="bg-transparent" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Your Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onCreate}>
          <h2 className="mb-4"></h2>
          <Container>
            <Col>
              <Form.Group className="d-flex gap-2 align-items-center mb-3">
                <Form.Label>Form Name</Form.Label>
                <Form.Control maxLength={20} name="name" required type="text" placeholder="Enter form name" onChange={(event) => handleFormChange(event)} />
              </Form.Group>

              <Form.Group className="d-flex gap-2 align-items-center mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control maxLength={35} name="description" required type="text" placeholder="Enter description" onChange={(event) => handleFormChange(event)} />
              </Form.Group>

              <div className="border-bottom w-100 h-1 mb-3"></div>

              {formValues.fields.map((field, index) => {
                return <FormField key={`formfield${index}`} field={field} index={index} handleFormChange={handleFormChange} onRemoveFieldClick={onRemoveFieldClick} />;
              })}
              <Button variant="secondary" onClick={onAddNewFieldClick}>
                Add New Form Field
              </Button>
              <br />
              <br />
              <Button className="w-auto" size="lg" variant="primary" type="submit">
                Create
              </Button>
            </Col>
          </Container>
        </Form>
      </Modal.Body>
      {createPortal(<MyToast title="Warning" message={warningMessage} isVisible={isWarningVisible} setIsVisible={setIsWarningVisible} duration={500000} />, document.body)}
    </Modal>
  );
}
export default CreateForm;
