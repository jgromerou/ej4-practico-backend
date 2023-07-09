import { Card, Form, Button } from 'react-bootstrap';
import ListColor from './ListColor';
import { useState, useEffect } from 'react';
import { agregarColor, obtenerListaColores } from './helpers/queries';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

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

  const onSubmit = (colorNuevo) => {
    console.log('colores', colorNuevo);
    agregarColor(colorNuevo).then((respuestaCreado) => {
      if (respuestaCreado && respuestaCreado.status === 201) {
        Swal.fire(
          'Color creado',
          `El color ${colorNuevo.nombreColor} fue creado correctamente`,
          'success'
        );
        obtenerListaColores().then((respuesta) => setListaColores(respuesta));
        reset();
      } else {
        Swal.fire(
          'Ocurrio un error',
          `El color ${colorNuevo.nombreColor} no fue creado, intentelo mas tarde`,
          'error'
        );
      }
    });
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

            <Form.Group className="mb-2">
              <Form.Control
                className="col-sm-9"
                type="text"
                placeholder="Ingrese código Hexadecimal"
                {...register('codigoHexadecimal', {
                  maxLength: {
                    value: 7,
                    message:
                      'El código Hexadecimal del color no puede superar los 7 caracteres.',
                  },
                  pattern: {
                    value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                    message:
                      'El código Hexadecimal debe tener un formato como #FF0000.',
                  },
                })}
              />
              <Form.Text className="text-danger my-2 py-3">
                {errors.codigoHexadecimal?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                className="col-sm-9"
                type="text"
                placeholder="Ingrese código RGB ó RGBA"
                {...register('codigoRGB', {
                  maxLength: {
                    value: 16,
                    message:
                      'El código RGB del color no puede superar los 16 caracteres.',
                  },
                  pattern: {
                    value: /^rgb\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/,
                    message:
                      'El código RGB ó RGBA debe tener un formato como rgb(255,0,0).',
                  },
                })}
              />
              <Form.Text className="text-danger my-2 py-3">
                {errors.codigoRGB?.message}
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
