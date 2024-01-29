import React, { useState, useEffect } from 'react';
import axios from 'axios';
const cors = require('cors');

const Busqueda = () => {
    const [autorizado, setAutorizado] = useState(false);
    const [errorbus, setError] = useState('');
    const [mostrarPermiso, setMostrarPermiso] = useState(false);  
    const [ubicacion, setUbicacion] = useState('');
    const [tipoEquipo, setTipoEquipo] = useState('');
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('');
    const [resultados, setResultados] = useState([]);
    const [cantidadResultados, setCantidadResultados] = useState(0);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    

    useEffect(() => {
        const autorizado = localStorage.getItem('autorizado');
        if (autorizado) {
            setAutorizado(true);
        } else {
            setError('Acceso denegado. No tiene permisos para estar aquí');
            setAutorizado(false);
        }
    }, []);

    const salir = () => {
        setAutorizado(false);
        localStorage.removeItem('autorizado');
        
    };

    const buscar = async () => {
        try {
            let url = 'http://localhost:5000/api/equipos/busqueda?';
            
            // Construir la URL con los parámetros de búsqueda, estableciendo valores predeterminados
            url += `ubicacion=${encodeURIComponent(ubicacion || '')}&`;
            url += `tipoEquipo=${encodeURIComponent(tipoEquipo || '')}&`;
            url += `nombre=${encodeURIComponent(nombre || '')}&`;
            url += `estado=${encodeURIComponent(estado || '')}&`;
    
            url = url.slice(0, -1); // Eliminar el último '&'
            console.log(url);
            // Realizar la solicitud GET al servidor con la URL construida
            const response = await axios.get(url);
            
            // Actualizar los resultados con los datos recibidos del servidor
            setResultados(response.data);
            setCantidadResultados(response.data.length);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
            setError('Error al realizar la búsqueda');
        }
    };
    
    

    const limpiar = async () => {
        setUbicacion('');
        setNombre('');
        setTipoEquipo('');     
        setEstado('');
        setResultados('');
    };
    
    

    return (
        
        <div style={{ display: autorizado ? 'block' : 'none', textAlign: 'center', marginTop: '10px', margin: 'auto', backgroundColor: '#f2f2f2' }}>
            {autorizado ? (
                // Muestra el mensaje de bienvenida
                <div>
                    <h2 style={{ color: 'rgb(151, 8, 8)', fontSize: '36px', fontWeight: 'bold' }}>
                        ¡BIENVENIDO!    
                    </h2><br></br>
                    <h3 style={{ color: 'rgb(151, 8, 8)', fontSize: '18px', fontWeight: 'bold' }}>
                        ZONA  DE FILTROS    
                    </h3>

                    <button
                        onClick={salir}
                        style={{
                            backgroundColor: 'rgb(151, 8, 8)',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            marginTop: '20px',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                    >
                        Salir
                    </button>
                </div>
            ) : (
                // Muestra el mensaje de acceso denegado
                <div style={{ color: 'green', marginTop: '10px' }}>
                    {errorbus}
                </div>
            )}

     <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
            {/* Campos de filtro */}
            <select
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value="">Seleccione</option>
              <option value="Laboratorio1">Laboratorio 1</option>
              <option value="Laboratorio2">Laboratorio 2</option>
            </select>
            <select
              value={tipoEquipo}
              onChange={(e) => setTipoEquipo(e.target.value)}
          
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value="">Seleccione</option>
              <option value="Equipos de Computación">Equipos de Computación</option>
              <option value="Muebles">Muebles</option>
              <option value="Impresoras">Impresoras</option>
              <option value="Material de Oficina">Material de Oficina</option>
              <option value="Cableado">Cableado</option>
              <option value="Dispositivos de Red">Dispositivos de Red</option>
              <option value="Aire Acondicionado">Aire Acondicionado</option>
              <option value="Equipos Audiovisuales y de Presentación">Equipos Audiovisuales y de Presentación</option>
            </select>

            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
             style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value="">Seleccione</option>
              <option value="operativo">Operativo</option>
              <option value="en reparación">En reparación</option>
              <option value="desincorporado">Desincorporado</option>
            </select>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
       
           
            
        </div>
        <button 
            style={{
                backgroundColor: '#1d555b',
                color: 'white',
                padding: '5 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '50%',
                marginTop: '20px',
            }}
      onClick={buscar}>Buscar</button>

<button 
            style={{
                backgroundColor: '#970808',
                color: 'white',
                padding: '5 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '50%',
                marginTop: '20px',
            }}
      onClick={limpiar}>Limpiar</button>

        {resultados.length > 0 && (
    <div style={{ marginTop: '20px' }}>
        <h3>Resultados de la búsqueda ({cantidadResultados})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
                <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                    <th>Ubicación</th>                
                    <th>Nombre</th>
                    <th>tipo</th>
                    <th>Estado</th>
                    {/* Agrega más encabezados según tus necesidades */}
                </tr>
            </thead>
            <tbody>
                {resultados.map((equipo, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                        <td style={{ padding: '8px' }}>{equipo.ubicacion}</td>  
                        <td style={{ padding: '8px' }}>{equipo.tipo}</td>                     
                        <td style={{ padding: '8px' }}>{equipo.nombre}</td>
                        <td style={{ padding: '8px' }}>{equipo.estado}</td>                    
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

        </div>
    );
};

export default Busqueda;
