import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormItemCard from '../../components/FormItemCard';
import { useForceUpdate } from '../../helpers/helperFunctions';
import FirstAttend from './FirstAttend';

function Home() {
  const forceUpdate = useForceUpdate();
  const isFirstAttend = localStorage.getItem('isFirstAttend') !== 'false';
  const navigate = useNavigate();

  if (isFirstAttend) return <FirstAttend />;

  const onCreateFormClick = () => {
    navigate('/createForm');
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
        <h2 className="w-auto">List of Your Forms</h2>
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
                formKey={key}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
