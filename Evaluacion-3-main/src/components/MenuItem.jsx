export default function MenuItem({ item }) {
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
        
        {/* Requisito de la rúbrica: Indica disponibilidad de platos */}
        <div style={{ marginTop: '0.5rem' }}>
          {item.disponible ? (
            <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✅ Disponible</span>
          ) : (
            <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>❌ Agotado</span>
          )}
        </div>
      </div>
    </article>
  );
}