import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import FormItemCard from '../../components/FormItemCard';
import { useForceUpdate } from '../../helpers/helperFunctions';
import CreateForm from '../CreateForm';
import FirstAttend from './FirstAttend';

function Home() {
  const forceUpdate = useForceUpdate();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isCreateFormModalEnabled, setIsCreateFormModalEnabled] = useState(false);
  const isFirstAttend = localStorage.getItem('isFirstAttend') !== 'false';

  if (isFirstAttend) return <FirstAttend />;

  const onCreateFormClick = () => {
    setIsCreateFormModalEnabled(true);
  };

  const onDeleteFormClick = (key: string) => {
    localStorage.removeItem(key);
    forceUpdate();
  };

  const onViewFormClick = (key: string) => {
    navigate('viewForm/' + key);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center pb-3">
        <Col className="d-flex flex-column align-items-start w-min">
          <h2>List of Your Forms</h2>
          <Form.Control className="w-auto" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
        </Col>
        <Button className="w-auto ms-auto" onClick={onCreateFormClick}>
          Create New Form
        </Button>
      </Row>
      <Row>
        <Col className="d-flex flex-column p-0 m-0">
          {Object.keys(localStorage)
            ?.filter((key) => key !== 'isFirstAttend')
            .map((key: string) => (
              <FormItemCard
                key={'formItem' + key}
                onDeleteClick={(e) => {
                  e.stopPropagation();
                  onDeleteFormClick(key);
                }}
                onClick={(e) => {
                  onViewFormClick(key);
                }}
                searchValue={search}
                formKey={key}
              />
            ))}
        </Col>
      </Row>
      {createPortal(
        <CreateForm
          isOpen={isCreateFormModalEnabled}
          onClose={() => {
            setIsCreateFormModalEnabled(false);
          }}
        />,
        document.body
      )}
    </Container>
  );
}
export default Home;
