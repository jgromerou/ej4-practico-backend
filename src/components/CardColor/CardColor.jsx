import { Col, Card, Button } from 'react-bootstrap';
import './card-color.css';
import React from 'react';

const CardColor = ({ color, borrarColor }) => {
  const colorDiv = { background: color };
  return (
    <Col md={6} lg={4} xl={3} className="mb-3">
      <Card>
        <div className="colorBox w-100" style={colorDiv}></div>
        <Card.Body className="d-flex justify-content-between px-4">
          <Card.Title className="fw-bold text-uppercase">{color}</Card.Title>
          <Button variant="danger" onClick={() => borrarColor(color)}>
            Borrar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardColor;
