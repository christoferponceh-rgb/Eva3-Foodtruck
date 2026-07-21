import { useState, useEffect } from 'react';
import OrderForm from '../components/OrderForm';

export default function PedidosCRUD() {
  // 1. Estado de los pedidos (Lectura desde LocalStorage)
  const [pedidos, setPedidos] = useState(() => {
    // Usamos una nueva clave para no mezclar con el carro viejo
    const saved = localStorage.getItem('pedidos_admin_foodtruck');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Estado para el menú (Para el <select> del formulario)
  const [menuItems, setMenuItems] = useState([]);

  // 3. Estado para controlar qué pedido se está editando
  const [pedidoEditando, setPedidoEditando] = useState(null);

  // Persistencia en LocalStorage
  useEffect(() => {
    localStorage.setItem('pedidos_admin_foodtruck', JSON.stringify(pedidos));
  }, [pedidos]);

  // Cargar menú desde la API Python
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.menu))
      .catch((err) => console.error("Error al cargar menú:", err));
  }, []);

  // DELETE: Eliminar con confirmación de seguridad
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.")) {
      setPedidos(pedidos.filter(p => p.id !== id));
      // Si estábamos editando el que acabamos de borrar, limpiamos el form
      if (pedidoEditando && pedidoEditando.id === id) {
        setPedidoEditando(null);
      }
    }
  };

  // Preparar estado para UPDATE
  const handleEdit = (pedido) => {
    setPedidoEditando(pedido);
  };

  // CREATE / UPDATE desde el formulario
  const handleGuardarPedido = (formData) => {
    // Buscar los datos del plato para calcular el total
    const plato = menuItems.find(item => item.id === formData.platoId);
    if (!plato) return;

    if (pedidoEditando) {
      // UPDATE (Actualizar existente)
      const pedidosActualizados = pedidos.map(p => 
        p.id === pedidoEditando.id 
          ? { 
              ...p, 
              cliente: formData.cliente, 
              platoId: formData.platoId, 
              platoNombre: plato.nombre,
              precio: plato.precio,
              cantidad: formData.cantidad,
              total: plato.precio * formData.cantidad
            }
          : p
      );
      setPedidos(pedidosActualizados);
      setPedidoEditando(null); // Salir de modo edición
      alert("Pedido actualizado correctamente.");
    } else {
      // CREATE (Crear nuevo)
      const nuevoPedido = {
        id: Date.now(),
        cliente: formData.cliente,
        platoId: formData.platoId,
        platoNombre: plato.nombre,
        precio: plato.precio,
        cantidad: formData.cantidad,
        total: plato.precio * formData.cantidad
      };
      setPedidos([...pedidos, nuevoPedido]);
      alert("Pedido registrado exitosamente.");
    }
  };

  return (
    <div className="cart-page">
      
      {/* ===== LADO IZQUIERDO: Tabla (READ) ===== */}
      <section>
        <h2>Gestión Administrativa de Pedidos</h2>
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Cliente</th>
                <th>Plato</th>
                <th>Cant.</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => (
                <tr key={p.id} style={pedidoEditando?.id === p.id ? {backgroundColor: '#fdf8e7'} : {}}>
                  <td style={{ fontSize: '0.85rem', color: '#666' }}>#{p.id.toString().slice(-4)}</td>
                  <td><strong>{p.cliente}</strong></td>
                  <td style={{color: '#e24a29'}}>{p.platoNombre}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.total.toLocaleString()}</td>
                  <td>
                    <button 
                      className="btn-update" 
                      style={{ padding: '0.4rem 0.8rem', marginRight: '0.5rem', fontSize: '0.85rem' }}
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(p.id)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
              {pedidos.length === 0 && (
                <tr>
                  <td colSpan="6" style={{textAlign:'center', padding: '2rem'}}>No hay pedidos registrados en el sistema.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== LADO DERECHO: Formulario (CREATE / UPDATE) ===== */}
      <aside>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E0E0E0' }}>
          <OrderForm 
            onSubmit={handleGuardarPedido} 
            menuItems={menuItems} 
            initialData={pedidoEditando}
            onCancel={() => setPedidoEditando(null)} 
          />
        </div>
      </aside>

    </div>
  );
}