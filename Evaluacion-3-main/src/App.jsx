import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Importamos el nuevo Footer
import Home from './pages/Home';
import MenuAPI from './pages/MenuAPI';
import PedidosCRUD from './pages/PedidosCRUD';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuAPI />} />
          <Route path="/pedidos" element={<PedidosCRUD />} />
        </Routes>
      </main>
      <Footer /> {/* <-- Usamos el componente aquí */}
    </>
  );
}

export default App;


