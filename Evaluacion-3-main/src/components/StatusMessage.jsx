export default function StatusMessage({ type, text }) {
  // 'type' debe ser 'loading', 'success' o 'error' para coincidir con tu CSS
  const className = `status-box ${type}`;
  
  return (
    <div className={className}>
      {text}
    </div>
  );
}