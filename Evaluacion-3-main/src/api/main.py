"""
API: Menú del food truck
Alumno: Christofer Gabriel Hernandez Ponce  ·  Sección: C1  ·  Tema 18: Food truck
Proyecto EV3 (UA3) — API asignada por el docente.

Ejecutar:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000

Endpoint principal:  GET /api/menu
Documentación:       http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Menú del food truck")

# CORS abierto para que el frontend (React/Vite) pueda consumir la API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "Base de datos" en memoria (arreglo de objetos).
DATOS = [
    {
        'id': 1,
        'nombre': 'Hamburguesa clásica',
        'descripcion': 'Doble queso',
        'categoria': 'Hamburguesas',
        'precio': 6990,
        'disponible': True,
        'imagen': '/hamburguesa.jfif'
    },
    {
        'id': 2,
        'nombre': 'Papas rústicas',
        'descripcion': 'Con salsa de la casa',
        'categoria': 'Acompañamientos',
        'precio': 3990,
        'disponible': True,
        'imagen': '/papas.jpg'
    },
    {
        'id': 3,
        'nombre': 'Completo italiano',
        'descripcion': 'Palta, tomate, mayo',
        'categoria': 'Completos',
        'precio': 3490,
        'disponible': True,
        'imagen': '/completo.jfif'
    },
    {
        'id': 4,
        'nombre': 'Alitas BBQ',
        'descripcion': '6 unidades',
        'categoria': 'Pollo',
        'precio': 5990,
        'disponible': True,
        'imagen': '/alitas.jpg'
    },
    {
        'id': 5,
        'nombre': 'Malteada',
        'descripcion': 'Chocolate o vainilla',
        'categoria': 'Bebidas',
        'precio': 3990,
        'disponible': False,
        'imagen': '/malteada.jpg'
    }
]


@app.get("/")
def inicio():
    return {
        "mensaje": "API Menú del food truck",
        "endpoint": "GET /api/menu",
        "docs": "/docs",
    }


@app.get("/api/menu")
def listar():
    """Devuelve el JSON con todos los registros."""
    return {"total": len(DATOS), "menu": DATOS}


@app.get("/api/menu/{item_id}")
def obtener(item_id: int):
    """Devuelve un registro por su id (404 si no existe)."""
    for item in DATOS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="No encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
