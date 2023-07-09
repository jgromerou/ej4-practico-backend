import { Row } from 'react-bootstrap';
import CardColor from './CardColor/CardColor';

const ListColor = ({ listaColores, handleEditClick }) => {
  return (
    <>
      <Row className="my-4">
        {listaColores.map((color) => (
          <CardColor
            key={color._id}
            color={color}
            handleEditClick={handleEditClick}
          />
        ))}
      </Row>
    </>
  );
};

export default ListColor;
