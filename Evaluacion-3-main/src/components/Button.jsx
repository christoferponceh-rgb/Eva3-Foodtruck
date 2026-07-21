export default function Button({ onClick, type = "button", variant = "primary", children }) {
  // Utilizamos la prop 'variant' para aplicar las clases de tu index.css (btn-primary, btn-danger, btn-edit)
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}