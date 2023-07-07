import { Card, Form, Button, Alert } from 'react-bootstrap';
import ListColor from './ListColor';
import { useState, useEffect } from 'react';

const FormColor = () => {
  let colorLocalStorage =
    JSON.parse(localStorage.getItem('listaColores')) || [];
  const [color, setColor] = useState('');
  const [isValidColor, setIsValidColor] = useState(true);
  const [listaColores, setListaColores] = useState(colorLocalStorage);
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    localStorage.setItem('listaColores', JSON.stringify(listaColores));
  }, [listaColores]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (hexColorRegex.test(color)) {
      setIsValidColor(true);
      agregarColor(color);
    } else {
      mostrarAlerta('Ingrese un código de color Hex válido.');
      setIsValidColor(false);
      setColor('');
      return;
    }
  };

  const agregarColor = (color) => {
    setListaColores([...listaColores, color]);
    setColor('');
  };

  const borrarColor = (nombreColor) => {
    let _listaColores = listaColores.filter((item) => item !== nombreColor);
    setListaColores(_listaColores);
  };

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta('');
      setIsValidColor(true);
    }, 2500);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3 text-uppercase display-6 fw-bold">
            Administrar Colores
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="inputColor">
              <Form.Label className="display-6">Ingrese un color:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese un color en Hexadecimal como por ej: #FF0000"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                style={{ borderColor: isValidColor ? '' : 'red' }}
              />
              {alerta && (
                <Alert
                  variant="danger"
                  className="my-2 text-center text-md-start"
                >
                  {alerta}
                </Alert>
              )}
            </Form.Group>

            <Button variant="success" type="submit">
              Agregar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ListColor listaColores={listaColores} borrarColor={borrarColor} />
    </>
  );
};

export default FormColor;
