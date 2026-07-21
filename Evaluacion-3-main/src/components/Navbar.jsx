import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <div className="logo">
        <h2>🍔 BurgerTruck</h2>
      </div>
      <nav>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Inicio</NavLink>
        <NavLink to="/menu" className={({isActive}) => isActive ? "active" : ""}>Menú (API)</NavLink>
        <NavLink to="/pedidos" className={({isActive}) => isActive ? "active" : ""}>Pedidos (CRUD)</NavLink>
      </nav>
    </header>
  );
}
