import { useEffect, useState } from 'react';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import { delay } from '../../helpers/helperFunctions';
import { useNavigate } from 'react-router-dom';

const WELCOME_MESSAGE = 'Welcome to my demo form generator, you can create your first dynamic form by';

function FirstAttend() {
  const navigate = useNavigate();
  const [firstAttendMessage, setFirstAttendMessage] = useState('');
  const isAnimationEnded = firstAttendMessage === WELCOME_MESSAGE;

  useEffect(() => {
    localStorage.setItem('isFirstAttend', 'false');
    runFirstAttendAnimation();
  }, []);

  const runFirstAttendAnimation = async () => {
    for (const letter of WELCOME_MESSAGE.split('')) {
      if (letter === ' ') await delay(40);
      await delay(40);
      setFirstAttendMessage((prevState) => prevState + letter);
    }
  };

  const onCreateFormClick = () => {
    navigate('/createForm');
  };

  return (
    <Container className="mt-5" fluid="md">
      <Col>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <h4>{firstAttendMessage}</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <Collapse in={isAnimationEnded}>
              <Button size="lg" className="w-100 mt-3" onClick={onCreateFormClick}>
                Clicking Here
              </Button>
            </Collapse>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
export default FirstAttend;
