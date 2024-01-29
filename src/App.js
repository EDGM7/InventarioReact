import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import Inicio from './components/Inicio/Inicio';
import Facultades from './components/Facultades/Facultades';
import Historia from './components/Historia/Historia';
import Inventario from './components/Inventario/Inventario'; // Ruta de inventario
import Contacto from './components/Contacto/Contacto';
import Busqueda from './components/Busqueda/Busqueda';

function App() {
  const [seccionActual, setSeccionActual] = useState('Inicio');

  return (
    <Router>
      <div>
        <nav className="bg-custom-color p-4 flex items-center flex-wrap"> {/* Añadimos la clase flex-wrap para que los elementos del menú se envuelvan en pantallas pequeñas */}
          <img src="/imagenes/logo.png" alt="Logo" style={{ width: '3rem', height: '3rem' }}/>

          <NavLink
            to="/"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/historia"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Historia
          </NavLink>
          <NavLink
            to="/facultades"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Facultades
          </NavLink>
          <NavLink
            to="/inventario"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Inventarios
          </NavLink>
          <NavLink
            to="/contacto"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Contacto
          </NavLink>
          <NavLink
            to="/busqueda"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block"
            activeclassname="border-b-2 border-white"
          >
            Busqueda
          </NavLink>
        </nav>

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/facultades" element={<Facultades />} />
            <Route path="/inventario" element={<Inventario />} /> {/* Ruta de inventario */}
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/busqueda" element={<Busqueda />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
