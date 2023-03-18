import { useEffect, useState } from 'react';
import { Collapse, Form, Row } from 'react-bootstrap';
import { formTypeToHtmlType } from '../../helpers/helperFunctions';
import { FormElementModel } from '../../models/form';

function FormField({ field, index }: { field: FormElementModel; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, index * 1000);
  }, []);

  return (
    <Collapse in={isOpen}>
      <div key={'formValue' + field.name}>
        <Row className="d-flex border rounded pt-3 justify-content-end">
          <Form.Group className="d-flex gap-2 align-items-center mb-3">
            <Form.Label className="mb-0">{field.name}</Form.Label>
            <Form.Control required={field.required} name={field.name} type={formTypeToHtmlType(field.dataType)} />
          </Form.Group>
        </Row>
        <br />
      </div>
    </Collapse>
  );
}
export default FormField;
