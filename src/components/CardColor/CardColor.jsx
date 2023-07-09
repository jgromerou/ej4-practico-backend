import { Col, Card, Button } from 'react-bootstrap';
import './card-color.css';

const CardColor = ({ color, handleEditClick }) => {
  const { nombreColor, _id } = color;
  const colorDiv = { background: color.nombreColor };

  return (
    <Col md={6} lg={4} xl={3} className="mb-3">
      <Card>
        <div className="colorBox w-100" style={colorDiv}></div>
        <Card.Body className="d-flex justify-content-between px-4">
          <Card.Title className="fw-bold text-uppercase">
            {nombreColor}
          </Card.Title>
          <Button variant="warning" onClick={() => handleEditClick(_id)}>
            Editar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardColor;
