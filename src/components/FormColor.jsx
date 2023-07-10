import { Card, Form, Button, Alert } from 'react-bootstrap';
import ListColor from './ListColor';
import { useState, useEffect } from 'react';
import {
  agregarColor,
  consultaColor,
  editarColor,
  obtenerListaColores,
} from './helpers/queries';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormColor = () => {
  const [listaColores, setListaColores] = useState([]);
  const [agregarDisabled, setAgregarDisabled] = useState(false);
  const [idColor, setIdColor] = useState(0);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setFocus,
  } = useForm();

  useEffect(() => {
    setMostrarSpinner(true);
    obtenerListaColores().then((respuesta) => {
      setListaColores(respuesta);
      setMostrarSpinner(false);
    });
  }, []);

  const onSubmit = (color) => {
    setMostrarSpinner(true);
    !agregarDisabled
      ? agregarColor(color)
          .then((respuestaCreado) => {
            if (respuestaCreado && respuestaCreado.status === 201) {
              Swal.fire(
                'Color creado',
                `El color ${color.nombreColor} fue creado correctamente`,
                'success'
              );
              obtenerListaColores().then((respuesta) =>
                setListaColores(respuesta)
              );
              reset();
              setMostrarSpinner(false);
            } else {
              if (respuestaCreado.status === 400) {
                setMostrarSpinner(false);
                Swal.fire(
                  'Ocurrio un error',
                  `El color ${color.nombreColor} ya existe, intente con otro nuevo`,
                  'error'
                );
                return;
              }

              Swal.fire(
                'Ocurrio un error',
                `El color ${color.nombreColor} no fue creado, intentelo mas tarde`,
                'error'
              );
            }
          })
          .catch((error) => {
            console.log(error);
            setMostrarSpinner(false);
          })
      : editarColor(color, idColor)
          .then((respuestaEditado) => {
            if (respuestaEditado && respuestaEditado.status === 200) {
              Swal.fire(
                'Color editado',
                `El color ${color.nombreColor} fue editado correctamente`,
                'success'
              );
              obtenerListaColores().then((respuesta) =>
                setListaColores(respuesta)
              );

              reset();
              setMostrarSpinner(false);
            } else {
              if (respuestaEditado.status === 400) {
                respuestaEditado.json().then((respuesta) => {
                  Swal.fire(
                    'Ocurrio un error',
                    `${respuesta.mensaje}`,
                    'error'
                  );
                });
                return;
              }
              Swal.fire(
                'Ocurrio un error',
                `El color ${color.nombreColor} no fue editado, intentelo mas tarde`,
                'error'
              );
            }
          })
          .catch((error) => {
            console.log(error);
            setMostrarSpinner(false);
          });
  };

  const handleEditClick = (id) => {
    reset();
    setAgregarDisabled(true);

    consultaColor(id).then((respuesta) => {
      if (respuesta) {
        console.log('tengo que cargar el objeto en el formulario');
        console.log(respuesta);
        setIdColor(id);
        setFocus('nombreColor');
        setValue('nombreColor', respuesta.nombreColor);
        setValue('codigoHexadecimal', respuesta.codigoHexadecimal);
        setValue('codigoRGB', respuesta.codigoRGB);
      } else {
        Swal.fire(
          'Ocurrio un error',
          `No se puede editar el color, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  const handleCancel = () => {
    setAgregarDisabled(false);
    reset();
    setFocus('nombreColor');
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3 text-uppercase display-6 fw-bold">
            Administrar Colores
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Text
              className={`display-2 fw-bold ${agregarDisabled ? '' : 'd-none'}`}
            >
              ID: {idColor}
            </Form.Text>
            <Form.Group className="my-2">
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
                placeholder="Ingrese código Hexadecimal (opcional)"
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
                placeholder="Ingrese código RGB ó RGBA (opcional)"
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

            {agregarDisabled ? (
              <>
                <Button variant="success" type="submit" className="mb-1 me-2">
                  Agregar
                </Button>
                <Button
                  variant="secondary"
                  disabled={!agregarDisabled}
                  onClick={handleCancel}
                  className="mb-1"
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                variant="success"
                type="submit"
                disabled={agregarDisabled}
              >
                Agregar
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>

      {listaColores && listaColores.length > 0 ? (
        <ListColor
          listaColores={listaColores}
          handleEditClick={handleEditClick}
          setListaColores={setListaColores}
        />
      ) : mostrarSpinner ? (
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      ) : (
        <Alert variant="light" className="py-2 my-2">
          <p className="display-5">No hay colores disponibles</p>
        </Alert>
      )}
    </>
  );
};

export default FormColor;
