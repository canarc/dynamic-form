import { useEffect, useState } from 'react';
import { Button, Collapse, Form, Row } from 'react-bootstrap';
import { FormElementModel } from '../../models/form';

export type FormFieldProps = {
  field: FormElementModel;
  index: number;
  handleFormChange: (event: React.ChangeEvent<any>, index?: number) => void;
  onRemoveFieldClick: (index: number) => void;
};

function FormField({ field, index, handleFormChange, onRemoveFieldClick }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Collapse in={isOpen}>
      <div key={'formValue' + field.name}>
        <Row className="d-flex border rounded pt-3 justify-content-end">
          <Button onClick={() => onRemoveFieldClick(index)} variant="danger w-auto p-2 m-3">
            Delete Field
          </Button>
          <Form.Group className="d-flex gap-2 align-items-center mb-3">
            <Form.Label className="mb-0">Name</Form.Label>
            <Form.Control required name={`name-${index}`} type="text" placeholder="Enter field name" onChange={(event) => handleFormChange(event, index)} />
          </Form.Group>
          <Form.Group className="d-flex gap-2 align-items-center mb-3">
            <Form.Label className="mb-0">Required</Form.Label>
            <Form.Check name={`required-${index}`} onChange={(event) => handleFormChange(event, index)} />
          </Form.Group>
          <Form.Group className="d-flex gap-2 align-items-center mb-3">
            <Form.Label className="mb-0">Data Type</Form.Label>
            <Form.Select required name={`dataType-${index}`} onChange={(event) => handleFormChange(event, index)}>
              <option value="STRING">String</option>
              <option value="NUMBER">Number</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <br />
      </div>
    </Collapse>
  );
}
export default FormField;
