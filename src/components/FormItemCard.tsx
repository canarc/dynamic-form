import { MouseEvent } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormModel } from '../models/form';

type formItemCardProps = {
  formKey: string;
  onDeleteClick: (e: MouseEvent<HTMLElement>) => void;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  searchValue: string;
};

function FormItemCard({ formKey, onDeleteClick, onClick, searchValue }: formItemCardProps) {
  const formData = JSON.parse(localStorage.getItem(formKey)!) as FormModel;

  if (formData.name.toLowerCase().indexOf(searchValue.toLowerCase()) === -1) return null;

  return (
    <Row role="button" onClick={onClick} className="d-flex border rounded mt-3 align-content-center w-100 m-0 pointer">
      <Col className="d-flex gap-2 align-items-center">
        <h5 className="text-start w-auto m-0 p-0">{formData.name}</h5>
        <p className="text-start w-auto m-0 p-0">{formData.description}</p>
      </Col>

      <Col className="d-flex justify-content-end align-items-center gap-2">
        <p className="m-3">{`Created ${new Date(+formKey).toLocaleDateString('tr-TR')}`}</p>
        <Button className="w-auto h-50 m-0 pt-0" variant="danger" onClick={onDeleteClick}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}
export default FormItemCard;
