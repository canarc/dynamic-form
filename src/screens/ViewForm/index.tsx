import { Fragment, useEffect, useState } from 'react';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { formTypeToHtmlType } from '../../helpers/helperFunctions';
import { FormModel } from '../../models/form';
import FormField from './FormField';

function ViewForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem(location.pathname.split('/')[2])!) as FormModel;

  useEffect(() => {
    console.log(formData);
    if (!formData) {
      console.log(formData);
      navigate('/');
    }
  }, []);

  const [formValues, setFormValues] = useState<FormModel>({ name: '', description: '', createdAt: new Date().toLocaleDateString('tr-TR').replaceAll('.', '-'), fields: [] });
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  return (
    <div>
      <h1>Here's your form</h1>
      <h3 className="text-start ms-3">{formData.name}</h3>
      <h4 className="text-start ms-3">{formData.description}</h4>
      <div className="border-bottom w-100 h-1 mb-3"></div>

      <Container>
        <Col>
          {formData.fields.map((field, index) => {
            return <FormField field={field} index={index} />;
          })}
        </Col>
      </Container>
    </div>
  );
}

export default ViewForm;
