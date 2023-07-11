import { Col, Card, Button } from 'react-bootstrap';
import './card-color.css';
import { borrarTarea, obtenerListaColores } from '../helpers/queries';
import Swal from 'sweetalert2';

const CardColor = ({ color, handleEditClick, setListaColores }) => {
  const { nombreColor, _id } = color;
  const colorDiv = { background: color.nombreColor };

  const handleDeleteClick = () => {
    Swal.fire({
      title: `¿Estás seguro de borrar el color ${nombreColor}?`,
      text: 'No se puede revertir este paso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTarea(_id).then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            Swal.fire(
              'Color eliminado',
              `El color ${color.nombreColor} fue eliminado correctamente`,
              'success'
            );
            obtenerListaColores().then((respuesta) => {
              setListaColores(respuesta);
            });
          } else {
            Swal.fire(
              'Ocurrió un error',
              `Intente realizar esta operación nuevamente más tarde`,
              'error'
            );
          }
        });
      }
    });
  };

  return (
    <Col md={6} lg={4} xl={3} className="mb-3">
      <Card>
        <div className="colorBox w-100" style={colorDiv}></div>
        <Card.Body className="d-flex justify-content-between px-4">
          <Card.Title className="fw-bold text-uppercase ">
            {nombreColor}
          </Card.Title>
          <div className="d-flex justify-content-end gap-1">
            <Button variant="warning" onClick={() => handleEditClick(_id)}>
              Editar
            </Button>
            <Button variant="danger" onClick={() => handleDeleteClick(_id)}>
              Borrar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardColor;
