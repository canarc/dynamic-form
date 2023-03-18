import { memo } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import Toast from 'react-bootstrap/Toast';

type MyToastProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  message: string;
  title?: string;
  position?: ToastPosition;
  duration?: number;
};

function MyToast({ isVisible, setIsVisible, message, title, position, duration }: MyToastProps) {
  const toggleShowA = () => setIsVisible(!isVisible);

  if (duration) setTimeout(() => setIsVisible(false), duration);

  return (
    <ToastContainer className="p-3" position={position || 'bottom-center'}>
      <Toast onClose={toggleShowA} show={isVisible} animation>
        {title && (
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
        )}
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default memo(MyToast);
