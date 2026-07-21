import React from 'react';
import '../index.css'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Encabezado */}
      <div className="home-header">
        <h1>Bienvenido a BurgerTruck Aysén</h1>
        <h2>Sistema de gestión de pedidos y catálogo en línea</h2>
        <p>Plataforma administrativa para controlar el flujo de ventas, consultar el stock de productos y agilizar la atención de nuestro Food Truck.</p>
      </div>

      {/* Sección de Tarjetas */}
      <div className="home-cards">
        <div className="card card-blue">
          <h3>Gestión de Ventas</h3>
          <p>Registra, actualiza y elimina las órdenes de los clientes de manera eficiente.</p>
        </div>
        <div className="card card-yellow">
          <h3>Catálogo API</h3>
          <p>Sincronización en tiempo real con nuestro backend en Python para revisar la disponibilidad del menú.</p>
        </div>
        <div className="card card-green">
          <h3>Datos Seguros</h3>
          <p>El sistema utiliza el almacenamiento local del navegador para que nunca pierdas el registro de una venta.</p>
        </div>
      </div>

      {/* Cuadro de Información */}
      <div className="home-info-box">
        <p><strong>Desarrollador:</strong> Christofer Hernandez</p>
        <p><strong>Proyecto:</strong> SPA Food Truck (Evaluación 3)</p>
      </div>
    </div>
  );
};

export default Home;