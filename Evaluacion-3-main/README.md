# BurgerTruck SPA - Evaluación 3

SPA desarrollada para la gestión de menú y pedidos de un Food Truck.

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── api/                    # 🐍 API Backend (Python/FastAPI)
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   └── README.md
│   ├── components/             # ⚛️  Componentes React
│   │   ├── Navbar.jsx
│   │   ├── MenuItem.jsx
│   │   └── OrderForm.jsx
│   ├── pages/                  # 📄 Páginas (React Router)
│   │   ├── Home.jsx
│   │   ├── MenuAPI.jsx
│   │   └── PedidosCRUD.jsx
│   ├── App.jsx
│   ├── main.jsx
│   │   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Instrucciones de ejecución

### 1. Instalar dependencias del Frontend
```bash
npm install
```

### 2. Ejecutar la API (Python Backend)
```bash
cd src/api
# Crear y activar un entorno virtual (venv) recomendado
# En macOS / Linux:
python3 -m venv venv
source venv/bin/activate

# En Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# Instalar dependencias dentro del venv
pip install -r requirements.txt

# Ejecutar la API
uvicorn main:app --host 0.0.0.0 --port 8000
```

La API estará disponible en: `http://127.0.0.1:8000`  
Documentación: `http://127.0.0.1:8000/docs`

### 3. Ejecutar el Frontend (React)
En otra terminal, desde la raíz del proyecto:
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 4. Construir para producción
```bash
npm run build
```

## 📋 Funcionalidades

### 🏠 Inicio
Página de bienvenida con información del proyecto.

### 🍔 Menú (API)
- Consume datos desde la API del backend en `http://127.0.0.1:8000/api/menu`
- Muestra los platos en un grid responsivo
- Indica disponibilidad de platos
- Estados de carga y manejo de errores

### 📋 Pedidos (CRUD)
- Crear nuevos pedidos
- Editar pedidos existentes
- Eliminar pedidos
- Persistencia en LocalStorage
- Validación de formularios

## 🎓 Uso de IA

**Herramienta utilizada:** Asistente de IA (LLM)

**Qué aprendí:**
- Estructuración de separación de componentes en React
- Optimización de lógica de persistencia con `useEffect` en combinación con `localStorage`
- Aplicación de buenas prácticas de semántica HTML5 y CSS Grid en tarjetas del menú

## 👤 Alumno

Christofer Gabriel Hernandez Ponce - Sección: C1
