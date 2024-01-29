import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Inventario = () => {
  const navigate = useNavigate();
  const [claveAcceso, setClaveAcceso] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);  
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
  const [ubicacion, setUbicacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoEquipo, setTipoEquipo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [estado, setEstado] = useState('');
  const [tipoImpresora, setTipoImpresora] = useState('');
  const [tipoMueble, setTipoMueble] = useState('');
  const [tipoCable, setTipoCable] = useState('');
  const [error, setError] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [eliminarExito, setEliminarExito] = useState(false);
  const [equipoEditando, setEquipoEditando] = useState(null);

  const [mostrarFormularioRegistro, setMostrarFormularioRegistro] = useState(true);
  const [enModoEdicion, setEnModoEdicion] = useState(false);
  const [editable, setEditable] = useState(true); 
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const autorizado = localStorage.getItem('autorizado');
    if (autorizado) {
      setAutorizado(true);
      setMostrarBienvenida(true);
      setMostrarFormularioRegistro(true); 
    }
  }, []);

  const salir = () => {
    setMostrarBienvenida(false);  
    setMostrarAlerta(false);
    setMostrarFormularioRegistro(false); 
    setClaveAcceso('');
    localStorage.removeItem('autorizado');
    navigate('/');
    setAutorizado(false);
  };

  const validarClaveAcceso = () => {
    if (claveAcceso === 'apiuvm24') {
      localStorage.setItem('autorizado', 'true');
      setMostrarBienvenida(true);
      setMostrarFormularioRegistro(true); 
      setAutorizado(true);
    } else {
      setMostrarAlerta(true);
      setMostrarFormularioRegistro(false); 
      setAutorizado(false);
    }

  };

 
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipos');
        setEquipos(response.data);
      } catch (error) {
        console.error('Error al obtener datos de equipos:', error);
      }
    };

    fetchData();

    

    // Establecer intervalo para actualizar los datos cada 5 segundos
    const interval = setInterval(fetchData, 5000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') setNombre(value);
    else if (name === 'ubicacion') setUbicacion(value);
    else if (name === 'tipoEquipo') setTipoEquipo(value);
    else if (name === 'codigo') setCodigo(value);
    else if (name === 'marca') setMarca(value);
    else if (name === 'modelo') setModelo(value);
    else if (name === 'numeroSerie') setNumeroSerie(value);
    else if (name === 'cantidad') setCantidad(value);
    else if (name === 'estado') setEstado(value);
    else if (name === 'tipoImpresora') setTipoImpresora(value);
    else if (name === 'tipoMueble') setTipoMueble(value);
    else if (name === 'tipoCable') setTipoCable(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validar campos
    if (!ubicacion || !nombre || !tipoEquipo || !codigo || !marca || !modelo || !numeroSerie || !cantidad || !estado) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (codigo.length !== 6 || !/^[a-zA-Z0-9]+$/.test(codigo)) {
      setError('El campo Código debe tener una longitud de 6 y contener solo letras y números');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(marca)) {
      setError('El campo Marca solo puede contener letras y números');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(modelo)) {
      setError('El campo Modelo solo puede contener letras y números');
      return;
    }

    const resetearEstadosFormulario = () => {
      setUbicacion('');
      setNombre('');
      setTipoEquipo('');
      setCodigo('');
      setMarca('');
      setModelo('');
      setNumeroSerie('');
      setCantidad(1);
      setEstado('');
      setTipoImpresora('');
      setTipoMueble('');
      setTipoCable('');
    };
    

    // Si todos los campos son válidos, puedes enviar el formulario aquí
    console.log('Formulario enviado:', {
      ubicacion,
      nombre,
      tipoEquipo,
      codigo,
      marca,
      modelo,
      numeroSerie,
      cantidad,
      estado,
      tipoImpresora,
      tipoMueble,
      tipoCable
    });

    try {
      const response = await axios.post('http://localhost:5000/api/guardarInventario', {
        ubicacion,
        nombre,
        tipoEquipo,
        codigo,
        marca,
        modelo,
        numeroSerie,
        cantidad,
        estado,
        tipoImpresora,
        tipoMueble,
        tipoCable
      });

      resetearEstadosFormulario();
      setMostrarExito(true);
      console.log('Equipo guardado en la base de datos:', response.data);
     
    } catch (error) {
      console.error('Error al guardar el equipo:', error);
    }  
  };
  

  const eliminarEquipo = async (id) => {
             
              try {
                await axios.delete(`http://localhost:5000/api/equipos/${id}`);
                setEliminarExito(true);
              } catch (error) {
                console.error('Error al eliminar el equipo:', error);
              }
   };

   const handleEditar = (equipo) => {
    if (equipo) {
      // Guardar los datos del equipo que se está editando en el estado
      setEquipoEditando(equipo);
      // Cambiar al modo de edición
      setEnModoEdicion(true);
      // Ocultar el formulario de registro principal
      setMostrarFormularioRegistro(false);
    } else {
      console.error(`No se encontraron datos del equipo`);
    }
  };
  
  

  const handleGuardar = async () => {
    console.log('Modificado con exito');
    window.location.reload(); 
  
    /*try {
        const response = await axios.put(`http://localhost:5000/api/equipos/${equipoEditando.id}`, {
        ubicacion,
        nombre,
        tipoEquipo,
        codigo,
        marca,
        modelo,
        numeroSerie,
        cantidad,
        estado,
        tipoImpresora,
        tipoMueble,
        tipoCable
      });*/
  
      // Restablecer estados y mostrar mensaje de éxito
      //setMostrarFormularioRegistro(true); // Muestra el formulario de registro nuevamente
      //setMostrarExito(true);
      //setEquipoEditando(null); // Limpiar el equipo en modo edición
      //console.log('Equipo editado en la base de datos:', response.data);
    /*} catch (error) {
      console.error('Error al guardar los cambios:', error);
    }*/
  };
  
  return (
    <div id="todo" style={{  textAlign: 'center', marginTop: '10px', margin: 'auto', backgroundColor: '#f2f2f2' }}>
       
   {mostrarBienvenida ? (
        // Muestra el mensaje de bienvenida
        <div>
          <h1 style={{ color: 'rgb(151, 8, 8)', fontSize: '36px', fontWeight: 'bold' }}>
            ¡BIENVENIDO!
          </h1>
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
        // Muestra el formulario de acceso si aún no está autorizado
        <div
          style={{
            maxWidth: '300px',
            margin: 'auto',
            backgroundColor: '#8bc52d',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Clave de acceso:
            <input
              type="password"
              value={claveAcceso}
              onChange={(e) => setClaveAcceso(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                borderRadius: '5px',
                border: 'none',
                marginBottom: '10px',
              }}
            />
          </label>
          <button
            onClick={validarClaveAcceso}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Ingresar
          </button>

          {mostrarAlerta && (
            <div style={{ color: 'red', marginTop: '10px' }}>Clave incorrecta. Acceso denegado.</div>
          )}
        </div>
      )}


{enModoEdicion && (
  <div style={{ display: autorizado ? 'block' : 'none' }}>
    {/* Aquí renderiza un formulario de edición con los detalles del equipo que se está editando */}
    <h2>Editar Registro</h2>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Ubicación:</label>
            <select
              value={equipoEditando.ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              disabled={!editable} // Hacer el campo de ubicación editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value="">Seleccione</option>
              <option value="Laboratorio1">Laboratorio 1</option>
              <option value="Laboratorio2">Laboratorio 2</option>
            </select>
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={equipoEditando.nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={!editable} // Hacer el campo de nombre editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Equipo:</label>
            <select
              value={equipoEditando.tipoEquipo}
              onChange={(e) => setTipoEquipo(e.target.value)}
              disabled={!editable} // Hacer el campo de tipo de equipo editable dependiendo de la variable "editable"
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
          </td>
        </tr>
        <tr>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Código:</label>
            <input
              type="text"
              value={equipoEditando.codigo}
              onChange={(e) => setCodigo(e.target.value)}
              disabled={!editable} // Hacer el campo de código editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Marca:</label>
            <input
              type="text"
              value={equipoEditando.marca}
              onChange={(e) => setMarca(e.target.value)}
              disabled={!editable} // Hacer el campo de marca editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Modelo:</label>
            <input
              type="text"
              value={equipoEditando.modelo}
              onChange={(e) => setModelo(e.target.value)}
              disabled={!editable} // Hacer el campo de modelo editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Número de Serie:</label>
            <input
              type="text"
              value={equipoEditando.numeroSerie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              disabled={!editable} // Hacer el campo de número de serie editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Cantidad:</label>
            <input
              type="number"
              value={equipoEditando.cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              disabled={!editable} // Hacer el campo de cantidad editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
          </td>
          <td>
            <label style={{ display: 'block', marginBottom: '10px' }}>Estado:</label>
            <select
              value={equipoEditando.estado}
              onChange={(e) => setEquipoEditando({ ...equipoEditando, estado: e.target.value })}
              disabled={!editable} // Hacer el campo de estado editable dependiendo de la variable "editable"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value="">Seleccione</option>
              <option value="operativo">Operativo</option>
              <option value="en reparación">En reparación</option>
              <option value="desincorporado">Desincorporado</option>
            </select>
          </td>
        </tr>
        <tr>
          {tipoEquipo === "Impresoras" && (
            <td>
              <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Impresora:</label>
              <select
                value={equipoEditando.tipoImpresora}
                onChange={(e) => setTipoImpresora(e.target.value)}
                disabled={!editable} // Hacer el campo de tipo de impresora editable dependiendo de la variable "editable"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
              >
                <option value="">Seleccione</option>
                <option value="Laser">Laser</option>
                <option value="Inyeccion">Inyeccion</option>
                <option value="Otra">Otra</option>
              </select>
            </td>
          )}
          {tipoEquipo === "Muebles" && (
            <td>
              <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Mueble:</label>
              <select
                value={equipoEditando.tipoMueble}
                onChange={(e) => setTipoMueble(e.target.value)}
                disabled={!editable} // Hacer el campo de tipo de mueble editable dependiendo de la variable "editable"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
              >
                <option value="">Seleccione</option>
                <option value="Mesa">Mesa</option>
                <option value="Silla">Silla</option>
                <option value="Escritorio">Escritorio</option>
              </select>
            </td>
          )}
          {tipoEquipo === "Cableado" && (
            <td>
              <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Cables:</label>
              <select
                value={equipoEditando.tipoCable}
                onChange={(e) => setTipoCable(e.target.value)}
                disabled={!editable} // Hacer el campo de tipo de cables editable dependiendo de la variable "editable"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
              >
                <option value="">Seleccione</option>
                <option value="USB">USB</option>
                <option value="Ethernet">Ethernet</option>
                <option value="Otro">Otro</option>
              </select>
            </td>
          )}
        </tr>
      </tbody>
    </table>
    <button
      onClick={handleGuardar}
      style={{
        backgroundColor: '#970808',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '20px',
      }}
    >
      Guardar
    </button>
  </div>
)}


      {/* Formulario para ingresar datos */}
  
      {!enModoEdicion && mostrarFormularioRegistro && (
        <form onSubmit={handleSubmit} style={{ display: autorizado ? 'block' : 'none', maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%' }}>
           <tbody>
             <tr>
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Ubicación:</label>
                 <select
                   value={ubicacion}
                   onChange={(e) => setUbicacion(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 >
                   <option value="">Seleccione</option>
                   <option value="Laboratorio1">Laboratorio 1</option>
                   <option value="Laboratorio2">Laboratorio 2</option>
                 </select>
               </td>
               <td> <label style={{ display: 'block', marginBottom: '10px' }}>Nombre:</label>
               
                <input type="text" name="nombre" value={nombre} onChange={handleInputChange} />
              </td>
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Equipo:</label>
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
               </td>
               </tr>
             <tr>

               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Código:</label>
                 <input
                   type="text"
                   value={codigo}
                   onChange={(e) => setCodigo(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 />
               </td>
             
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Marca:</label>
                 <input
                   type="text"
                   value={marca}
                   onChange={(e) => setMarca(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 />
               </td>
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Modelo:</label>
                 <input
                   type="text"
                   value={modelo}
                   onChange={(e) => setModelo(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 />
               </td>
               </tr>
             <tr>
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Número de Serie:</label>
                 <input
                   type="text"
                   value={numeroSerie}
                   onChange={(e) => setNumeroSerie(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 />
               </td>
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Cantidad:</label>
                 <input
                   type="number"
                   value={cantidad}
                   onChange={(e) => setCantidad(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 />
               </td>
          
               <td>
                 <label style={{ display: 'block', marginBottom: '10px' }}>Estado:</label>
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
               </td>
               </tr>
             <tr>
               {tipoEquipo === "Impresoras" && (
                 <td>
                  
                <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Impresora:</label>
                 <select
                   value={tipoImpresora}
                   onChange={(e) => setTipoImpresora(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 >
                   <option value="">Seleccione</option>
                   <option value="Laser">Laser</option>
                   <option value="Inyeccion">Inyeccion</option>
                   <option value="Otra">Otra</option>
                 </select>
                 </td>
               )}
               {tipoEquipo === "Muebles" && (
                 <td>
                  
              <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Mueble:</label>
                 <select
                   value={tipoMueble}
                   onChange={(e) => setTipoMueble(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 >
                   <option value="">Seleccione</option>
                   <option value="Mesa">Mesa</option>
                   <option value="Silla">Silla</option>
                   <option value="Escritorio">Escritorio</option>
                 </select>
                 </td>
               )}
               {tipoEquipo === "Cableado" && (
                 <td>                  

              <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Cables:</label>
                 <select
                   value={tipoCable}
                   onChange={(e) => setTipoCable(e.target.value)}
                   style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
                 >
                   <option value="">Seleccione</option>
                   <option value="USB">USB</option>
                   <option value="Ethernet">Ethernet</option>
                   <option value="Otro">Otro</option>
                 </select>
                 </td>
               )}
             </tr>
           </tbody>
         </table>
         <button
           type="submit"
           style={{
             backgroundColor: '#970808',
             color: 'white',
             padding: '10px 15px',
             border: 'none',
             borderRadius: '5px',
             cursor: 'pointer',
             width: '100%',
             marginTop: '20px',
           }}
         >
           Enviar
         </button>
        
         {mostrarExito && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          ¡El equipo ha sido guardado satisfactoriamente!
        </div>
      )}

    
<br></br><br></br>

<div style={{ display: autorizado ? 'block' : 'none'}}>
      {/* Otras partes del componente */}
      
      {/* Botón para ir a la página de búsqueda */}
      <Link to="/busqueda" style={{ textDecoration: 'none' }}>
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
          Buscar por filtros
        </button>
      </Link>
</div>

<br></br><br></br>  
<div>

{eliminarExito && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          ¡Registro Eliminado con exito!
        </div>
)}


      
<br></br><br></br>  
<table style={{ display: autorizado ? 'block' : 'none', width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
   <thead>
        <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            
            <th>#</th>
            <th>Ubicación</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Estado</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => (

              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
              
              <td>{equipo.id}</td>
              <td style={{ padding: '8px' }}>{equipo.ubicacion}</td>
              <td style={{ padding: '8px', textAlign: 'left' }}>{equipo.nombre}</td>
              <td style={{ padding: '8px' }}>{equipo.stock}</td>
              <td style={{ padding: '8px' }}>{equipo.estado}</td>
          <td style={{ padding: '8px' }}>
              <button onClick={() => handleEditar(equipo)} style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', padding: '5px 10px', marginRight: '5px' }}>Editar</button>
          </td>
          
          <td style={{ padding: '8px' }}>
              <button
            onClick={() => {
              const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este equipo?');
              if (confirmacion) {
                eliminarEquipo(equipo.id);
              }
            }}
            style={{ backgroundColor: '#dc3545', color: 'white', borderRadius: '5px', padding: '5px 10px' }}
          >
            Eliminar
          </button>

        
          


             </td>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

       </form>
      )}

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      
      
    </div>
  );
};

export default Inventario;
