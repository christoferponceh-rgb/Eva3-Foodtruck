import { useState, useEffect } from 'react';
import Button from './Button';

export default function OrderForm({ onSubmit, initialData, menuItems = [], onCancel }) {
  const [formData, setFormData] = useState({ cliente: '', platoId: '', cantidad: 1 });
  const [error, setError] = useState('');

  // Sincronizar el estado cuando cambia initialData (para modo Edición)
  useEffect(() => {
    if (initialData) {
      setFormData({
        cliente: initialData.cliente,
        platoId: initialData.platoId,
        cantidad: initialData.cantidad
      });
      setError('');
    } else {
      setFormData({ cliente: '', platoId: '', cantidad: 1 });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.cliente.trim() || !formData.platoId || formData.cantidad < 1) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validación de seguridad: Verificar si el plato está disponible
    const platoSeleccionado = menuItems.find(p => p.id === Number(formData.platoId));
    if (platoSeleccionado && !platoSeleccionado.disponible) {
      setError('No puedes registrar un pedido de un producto agotado.');
      return;
    }

    setError('');
    onSubmit({ ...formData, platoId: Number(formData.platoId) });
    
    // Si estamos creando uno nuevo, limpiamos el formulario
    if (!initialData) {
      setFormData({ cliente: '', platoId: '', cantidad: 1 });
    }
  };

  return (
    <section className="form-container">
      <h2>{initialData ? '✏️ Editar Pedido' : '📝 Nuevo Pedido'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Cliente</label>
          <input 
            type="text" 
            value={formData.cliente}
            onChange={(e) => setFormData({...formData, cliente: e.target.value})}
            placeholder="Ej. Juan Pérez"
          />
        </div>
        
        <div className="form-group">
          <label>Plato Seleccionado</label>
          <select 
            value={formData.platoId}
            onChange={(e) => setFormData({...formData, platoId: e.target.value})}
          >
            <option value="">-- Selecciona un plato --</option>
            {menuItems.map((plato) => (
              <option 
                key={plato.id} 
                value={plato.id} 
                disabled={!plato.disponible} /* <-- Bloquea los productos agotados */
              >
                {plato.nombre} - ${plato.precio.toLocaleString()} {!plato.disponible ? ' (❌ Agotado)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad</label>
          <input 
            type="number" 
            min="1"
            value={formData.cantidad}
            onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value)})}
          />
        </div>
        
        {error && <p className="error-text">❌ {error}</p>}
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button type="submit" variant="primary">
            {initialData ? 'Actualizar' : 'Guardar'}
          </Button>
          {initialData && (
            <Button type="button" variant="danger" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
  
