import { Card, Form, Button } from 'react-bootstrap';
import ListColor from './ListColor';
import { useState, useEffect } from 'react';
import { obtenerListaColores } from './helpers/queries';
import { useForm } from 'react-hook-form';

const FormColor = () => {
  const [listaColores, setListaColores] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerListaColores().then((respuesta) => {
      setListaColores(respuesta);
    });
  }, []);

  const onSubmit = (datos) => {
    console.log('colores', datos);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3 text-uppercase display-6 fw-bold">
            Administrar Colores
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Control
                className="col-sm-9"
                type="text"
                placeholder="Ingrese nombre del color"
                {...register('nombreColor', {
                  required: 'El Nombre del color es un dato obligatorio.',
                  minLength: {
                    value: 2,
                    message:
                      'La cantidad minima de caracteres es de 2 caracteres',
                  },
                  maxLength: {
                    value: 100,
                    message:
                      'La cantidad máxima de caracteres es de 100 caracteres',
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Por favor, ingrese solo letras.',
                  },
                })}
              />
              <Form.Text className="text-danger my-2 py-3">
                {errors.nombreColor?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="success" type="submit">
              Agregar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ListColor listaColores={listaColores} />
    </>
  );
};

export default FormColor;
