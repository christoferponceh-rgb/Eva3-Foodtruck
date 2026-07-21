import { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem'; // <-- Ahora usamos MenuItem
import StatusMessage from '../components/StatusMessage';

export default function MenuAPI() {
  const [menu, setMenu] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null, data: false });

  // Cargar datos de la API Python
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMenu(data.menu);
        setStatus({ loading: false, error: null, data: true });
      })
      .catch((err) => {
        setStatus({ loading: false, error: err.message, data: false });
      });
  }, []);

  return (
    <section>
      <h1 style={{marginBottom: '1rem'}}>Menú del BurgerTruck</h1>
      <p style={{marginBottom: '2rem'}}>Revisa nuestro catálogo completo y la disponibilidad de los productos desde nuestra base de datos.</p>

      {status.loading && <StatusMessage type="loading" text="⏳ Cargando menú..." />}
      {status.error && <StatusMessage type="error" text={`❌ Error al cargar: ${status.error}`} />}
      
      {status.data && (
        <div className="pos-menu-grid">
          {menu.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}