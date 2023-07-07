import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import FormColor from './components/FormColor';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Container className="paginaPrincipal my-5">
        <FormColor />
      </Container>
      <Footer />
    </>
  );
}

export default App;
