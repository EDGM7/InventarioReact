import React from 'react';

class Inicio extends React.Component {
  render() {
    return (
      <div>
        <br /><br />
        <div className="facultades-row">
          <div className="facultad-column">
            <div className="facultad-content relative inicio-content">
              <img
                src="./imagenes/historia.jpg"
                alt="Historia"
                className="facultad-image"
                style={{ width: '100%', height: 'auto' }}
              />
              <div
                className="facultad-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-justify"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', opacity: '1' }}
              >
                <h1 className="text-2xl mb-4"><b>Universidad Valle del Momboy</b></h1>
                <p>
                  Institución de Educación Universitaria de carácter comunitario, sin fines de lucro, de inspiración humanista – cristiana, fruto del esfuerzo de diversos sectores de la sociedad civil trujillana, que anhelaban una Universidad propia para el Estado Trujillo.
                  No fue sino hasta el 20 de noviembre de 1832, luego de separada Venezuela de Colombia y bajo el mandato del General José Antonio Páez, cuando el Vice-Presidente Diego Bautista Urbaneja, encargado del Poder Ejecutivo, decreta la creación del Colegio Nacional de Varones de Trujillo en el edificio del convento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
