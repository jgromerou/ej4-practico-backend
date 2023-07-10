import { Row } from 'react-bootstrap';
import CardColor from './CardColor/CardColor';

const ListColor = ({ listaColores, handleEditClick, setListaColores }) => {
  return (
    <>
      <Row className="my-4">
        {listaColores.map((color) => (
          <CardColor
            key={color._id}
            color={color}
            handleEditClick={handleEditClick}
            setListaColores={setListaColores}
          />
        ))}
      </Row>
    </>
  );
};

export default ListColor;
