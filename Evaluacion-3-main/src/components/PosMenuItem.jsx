import { useState } from 'react';

export default function PosMenuItem({ item, onAdd }) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <article className="pos-item">
      <img 
        src={item.imagen} 
        alt={item.nombre} 
        className="pos-img" 
        onError={(e) => { e.target.src = 'https://placehold.co/150x150?text=Comida'; }}
      />
      <div className="pos-details">
        <h3>{item.nombre}</h3>
        <p className="pos-desc">{item.descripcion}</p>
        <div className="pos-price-box">${item.precio.toLocaleString()}</div>
        
        <div className="pos-actions">
          <label>Cantidad</label>
          <input 
            type="number" 
            min="1" 
            value={cantidad} 
            onChange={(e) => setCantidad(Number(e.target.value))} 
          />
          <button className="btn-agregar" onClick={() => onAdd(item, cantidad)}>
            AGREGAR
          </button>
        </div>
      </div>
    </article>
  );
}