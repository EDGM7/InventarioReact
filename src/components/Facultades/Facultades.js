import React from 'react';

class Facultades extends React.Component {
  render() {
    return (
      
      <div>
        <br /><br />
        <div className="facultades-row">
          <div className="facultad-column">
            <div className="facultad-content">
              <img src="./imagenes/F1.jpg" alt="Facultad de Ingenieria" className="facultad-image" />
              <div className="facultad-text">
                <h1><b>Facultad de Ingenieria</b></h1>
                <p>Tiene como misión principal formar personas y profesionales en las áreas de Ingeniería de Computación e Ingeniería Industrial, a través de una excelente formación del talento humano permitiendo satisfacer las necesidades del entorno.</p>
              </div>
            </div>
          </div>

          <div className="facultad-column">
            <div className="facultad-content">
              <img src="./imagenes/F2.jpg" alt="Facultad 2" className="facultad-image" />
              <div className="facultad-text">
                <h1><b>Facultad de Ciencias Económicas, Administrativas y Gerenciales</b></h1>
                <p>Tiene como función preparar profesionales con alto nivel académico y formación  integral, en las áreas de las ciencias administrativas y contables</p>
              </div>
            </div>
          </div>
        
          <div className="facultad-column">
            <div className="facultad-content">
              <img src="./imagenes/F3.jpg" alt="Facultad 3" className="facultad-image" />
              <div className="facultad-text">
               <h1><b>Facultad de Ciencias Jurídicas, Políticas y Sociales</b></h1>
                <p>Está conformada por las carreras de Derecho y Ciencias Políticas y Administrativas; en la actualidad solo se encuentra activa la carrera de Derecho</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="text-center">
        <div className="text-center">
  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4" style={{ color: '#970808' }}>
    ---- RAZON DE SER ----
  </h1>
</div>

       </div>
        <div className="text-justify">        
        <p>La comunidad universitaria tiene como su fundamental compromiso «Lograr ser una comunidad solidaria, emprendedora y sustentable».

Los desafíos del mundo del conocimiento son diversos, pero en nuestra realidad nos interpela la pobreza y todas sus secuelas de ignorancia, desigualdad, corrupción. La superación de la pobreza exige mayor solidaridad, mayor prosperidad económica, mayor grado de inclusión social, políticas públicas acertadas y mayores grados de ciudadanía activa.</p>
        </div>
        
      </div>
    );
  }
}

export default Facultades;
